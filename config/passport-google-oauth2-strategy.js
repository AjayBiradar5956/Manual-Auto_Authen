const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const user = require('../model/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "
    clientSecret: "
    callbackURL: 
},
    function (accessToken, RefreshToken, profile, done) {
        console.log(profile);
        // Find the user
        user.findOne({ email: profile.emails[0].value })
            .then((docs) => {
                if (docs) {
                    // if user found, set this user as req.user;
                    return done(null, docs);
                } else {
                    // if not found in  our db, then set it as req.user
                    user.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex'),
                    }).then((doc) => {
                        return done(null, doc);
                    }).catch((err) => {
                        return console.log(err);
                    })
                }
            })

            .catch((err) => {
                console.log('error in google strategy-passport', err);
            })
    }
))
