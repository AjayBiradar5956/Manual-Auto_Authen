const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const user = require('../model/user');


// Authentication using passport
passport.use(new LocalStratergy({
    usernameField: 'email',
    passReqToCallback: true,
},
    function (email, password, done) {
        user.findOne({ email: email })
            .then((docs) => {
                if (!docs || docs.password != password) {
                    console.log('invalid password/username')
                    return done(null, false);
                }
                else {
                    done(null, docs);
                }
            }).catch((err) => {
                console.log('error while passport auth');
                return done(err);
            })
    }));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    user.findById(id)
        .then((docs) => {
            done(null, docs);
        }).catch((err) => {
            console.log("deserialize error");
            return done(err);
        })
});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    //if the user is signed in, then pass on the request to the next function(controller's a ction)
    if (req.isAuthenticated()) {
        return next();
    }
    //if not signed in then redirect to signin
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user containes the current signed in user from cookies session and we are just sending this to the locals fro the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;