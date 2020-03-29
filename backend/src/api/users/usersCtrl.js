const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { JWT_SECRET_KEY: jwtKey } = process.env;

// 회원가입
exports.signup = (req, res) => {
  const { email, password, nickName } = req.body;

  User.findOne({ '$or': [{ email }, { nickName }] }, (error, user) => {
    if (user) return res.status(400).send({ error, message: '이메일 또는 닉네임이 이미 사용 중입니다.' });

    const newUser = new User({
      email,
      password,
      nickName,
    });

    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(newUser.password, salt, (error, hash) => {
        if (error) return res.status(500).send({ error, message: '패스워드 암호화에 문제가 있습니다.' });
        newUser.password = hash;
        newUser.save((error, user) => {
          if (error) return res.status(500).send({ error, message: '새로운 유저를 저장하지 못했습니다.' });
          res.json(user);
        });
      });
    });
  });
};

// 로그인
exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (error, user) => {
    if (!user) return res.status(400).send({ error, message: '가입된 이메일이 아닙니다.' });

    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if(!isMatch) return res.status(400).send({ error, message: '패스워드가 일치하지 않습니다.' });

        const payload = {
          email: user.email,
          nickName: user.nickName,
        };

        jwt.sign(payload, jwtKey, { expiresIn: 3600 }, (error, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token,
          });
        });
      });
  });
};

// 현재유저
exports.current = (req, res) => {
  const { email, password, nickName } = req.body;
  
  res.json({
    email,
    password,
    nickName,
  });
};