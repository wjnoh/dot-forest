const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../../models/user');
const { JWT_SECRET_KEY: jwtKey, GMAIL_ID: gmailId, GMAIL_PASSWORD: gmailPassword } = process.env;

// 회원가입
exports.signup = (req, res) => {
  const { email, password, nickName } = req.body;

  User.findOne({ '$or': [{ email }, { nickName }] }, (error, user) => {
    if (user) return res.status(400).send({ error, message: '이메일 또는 닉네임이 이미 사용 중입니다.' });

    const newUser = new User({
      email,
      password,
      nickName,
      // 인증을 위한 난수 생성
      verifyCode: Math.floor(Math.random() * 1000000) + 1,
    });

    // 패스워드 암호화
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(newUser.password, salt, (error, hash) => {
        if (error) return res.status(500).send({ error, message: '패스워드 암호화에 문제가 있습니다.' });
        newUser.password = hash;
        newUser.save((error, user) => {
          if (error) return res.status(500).send({ error, message: '새로운 유저를 저장하지 못했습니다.' });

          // 이메일 전송 정보
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: gmailId,
              pass: gmailPassword,
            },
          });
          const mailOptions= {
            from: gmailId,
            to: user.email,
            subject: '도트의 숲에서 보낸 회원가입 인증 메일입니다.',
            html: `
                    <h1>도트의 숲에서 보낸 회원가입 인증 메일입니다.</h1>
                    <a href="http://localhost:4000/api/users/verifyEmail/${user._id}/${user.verifyCode}">
                      이메일 인증을 완료하려면 클릭하세요.
                    </a>
                  `,
          };
          
          transporter.sendMail(mailOptions, (error) => {
            if (error) return res.status(500).send({ error, message: '이메일 전송에 실패했습니다.' });
            res.json({ user, message: '회원가입 인증 메일이 전송되었습니다.' });
          });
        });
      });
    });
  });
};

// 회원가입 인증 메일 재전송
exports.sendVerifyEmail = (req, res) => {
  const { email, emailedDate } = req.user;

  // 인증 메일 재전송 시간 체크
  const currentDate = new Date();
  if(((currentDate - emailedDate) / 1000) / 60 < 10) {
    return res.status(400).send({ message: '인증 메일 재전송은 10분에 한 번만 가능합니다.' });
  }

  User.findOne({ email }, (error, user) => {
    if (error) return res.status(500).send(error);
    if (!user) return res.status(400).send(error);

    // 이메일 전송 정보
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailId,
        pass: gmailPassword,
      },
    });
    const mailOptions= {
      from: gmailId,
      to: email,
      subject: '도트의 숲에서 보낸 회원가입 인증 메일입니다.',
      text: '도트의 숲에서 보낸 회원가입 인증 메일입니다.',
    };

    // 이메일 보낸 일시 갱신
    user.emailedDate = new Date();

    user.save((error) => {
      if (error) return res.status(500).send(error);
      transporter.sendMail(mailOptions, (error) => {
        if (error) return res.status(500).send({ error, message: '이메일 전송에 실패했습니다.' });
        res.json({ message: '회원가입 인증 메일이 다시 전송되었습니다.' });
      });
    });
  });
};

exports.verifyEmail = (req, res) => {
  const { user_id, user_verifyCode } = req.params;

  User.findOne({ _id: user_id }, (error, user) => {
    if (error) return res.status(500).send(error);
    if (!user) return res.status(400).send(error);

    // 이미 인증이 완료되었다면
    if(user.isEmailVerified) {
      return res.status(400).send({ message: '이미 이메일 인증이 완료된 계정입니다.' });
    }

    // 이메일 인증코드가 틀리다면
    if(user.verifyCode !== user_verifyCode) {
      return res.status(400).send({ message: '인증을 완료할 수 없습니다. 이메일을 다시 확인하세요.' });
    }

    user.isEmailVerified = true;
    user.save((error) => {
      if (error) return res.status(500).send(error);
      res.json({ message: '이메일 인증이 완료되었습니다.' });
    });
  });
};

// 로그인
exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (error, user) => {
    if (!user) return res.status(400).send({ error, message: '가입된 이메일이 아닙니다.' });

    // 패스워드 비교
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if(!isMatch) return res.status(400).send({ error, message: '패스워드가 일치하지 않습니다.' });

        const payload = {
          email: user.email,
          nickName: user.nickName,
        };

        // JWT토큰 생성
        jwt.sign(payload, jwtKey, { expiresIn: 3600 }, (error, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token,
          });
        });
      });
  });
};

// 현재 유저 확인
exports.current = (req, res) => {
  const { email, password, nickName } = req.user;
  
  res.json({
    email,
    password,
    nickName,
  });
};