const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../../models/user');
const { JWT_SECRET_KEY: jwtKey, GMAIL_ID: gmailId, GMAIL_PASSWORD: gmailPassword } = process.env;

// 회원가입
exports.signup = async (req, res) => {
  const { email, password, nickName } = req.body;

  try {
    const user = await User.findOne({ '$or': [{ email }, { nickName }] });

    // 해당 정보를 가진 유저가 이미 존재할 경우
    if (user) return res.status(400).send({ message: '이메일 또는 닉네임이 이미 사용 중입니다.' });

    // 새로운 유저 정보
    const newUser = new User({
      email,
      password,
      nickName,
      verifyCode: Math.floor(Math.random() * 1000000) + 1,  // 인증을 위한 난수 생성
    });

    // salt와 hash 생성 후 저장
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    const savedUser = await newUser.save();

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
      to: savedUser.email,
      subject: '도트의 숲에서 보낸 회원가입 인증 메일입니다.',
      html: `
              <h1>도트의 숲에서 보낸 회원가입 인증 메일입니다.</h1>
              <a href="http://localhost:4000/api/users/verifyEmail/${savedUser._id}/${savedUser.verifyCode}">
                이메일 인증을 완료하려면 클릭하세요.
              </a>
            `,
    };

    // 이메일 전송
    await transporter.sendMail(mailOptions);
    res.json({ savedUser, message: '회원가입 인증 메일이 전송되었습니다.' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// 회원가입 인증 메일 재전송
exports.sendVerifyEmail = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const { isEmailVerified, emailedDate } = user;

  if (!user) return res.status(400).send({ message: '가입된 이메일이 아닙니다.' });
  if (isEmailVerified) return res.status(400).send({ message: '이미 인증이 완료된 이메일입니다.' });

  // 패스워드 비교
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send({ message: '패스워드가 일치하지 않습니다.' });

  console.log(user);

  // 인증 메일 재전송 시간 체크
  const currentDate = new Date();
  if (((currentDate - emailedDate) / 1000) / 60 < 10) {
    return res.status(400).send({ message: '인증 메일 재전송은 10분에 한 번만 가능합니다.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: '가입된 이메일이 아닙니다.' });

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
    await user.save();

    // 이메일 전송
    await transporter.sendMail(mailOptions);
    res.json({ message: '회원가입 인증 메일이 다시 전송되었습니다.' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// 이메일 인증 확인
exports.verifyEmail = async (req, res) => {
  const { user_id, user_verifyCode } = req.params;

  try {
    const user = await User.findOne({ _id: user_id });
    if (!user) return res.status(400).send({ message: '가입된 이메일이 아닙니다.' });

    // 이미 인증이 완료되었다면
    if (user.isEmailVerified) {
      return res.status(400).send({ message: '이미 이메일 인증이 완료된 계정입니다.' });
    }

    // 이메일 인증코드가 틀리다면
    if (user.verifyCode !== user_verifyCode) {
      return res.status(400).send({ message: '인증을 완료할 수 없습니다. 이메일을 다시 확인하세요.' });
    }

    user.isEmailVerified = true;
    await user.save();
    res.json({ message: '이메일 인증이 완료되었습니다.' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// 로그인
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: '가입된 이메일이 아닙니다.' });

    // 패스워드 비교
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ message: '패스워드가 일치하지 않습니다.' });

    const payload = {
      email: user.email,
      nickName: user.nickName,
    };

    // JWT토큰 생성
    const jwtToken = jwt.sign(payload, jwtKey, { expiresIn: 3600 });
    res.json({ jwtToken: 'Bearer ' + jwtToken, user });
  } catch (error) {
    return res.status(500).send(error);
  }
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