const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

module.exports = (passport, jwtKey) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtKey,
      },
      (payload, done) => {
        User.findOne({ email: payload.email })
          .then(user => {
            if(user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(error => console.log(error));
      },
    ),
  );
};