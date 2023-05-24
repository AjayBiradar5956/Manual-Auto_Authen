const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const user = require('../model/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial',
}

passport.use(new JWTStrategy(opts, function (jwtPayload, done) {
    user.findById(jwtPayload._id)
        .then((docs) => {
            if (docs) {
                return done(null, docs);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {
            console.log("error in finding user from jwt", err);
            return;
        })
}));

module.exports = passport;

