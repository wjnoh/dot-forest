const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersCtrl = require('./usersCtrl');

router.post('/signup', usersCtrl.signup);
router.post('/sendVerifyEmail', passport.authenticate('jwt', { session: false }), usersCtrl.sendVerifyEmail);
router.get('/verifyEmail/:user_id/:user_verifyCode', usersCtrl.verifyEmail);
router.post('/signin', usersCtrl.signin);
router.get('/current', passport.authenticate('jwt', { session: false }), usersCtrl.current);

module.exports = router;