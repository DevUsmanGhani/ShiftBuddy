const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Manager = mongoose.model('Manager');
const keys = require('./keys');

const opts = {
  jwtFromRequest: ExctractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Manager.findById(jwt_payload.id)
        .then(manager => {
          if (manager) {
            return done(null, manager);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};