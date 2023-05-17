const user = require('../model/user');

module.exports.user = function (req, res) {
    return res.render('user', {
        title: "User Page",
    })
}

module.exports.profile = function (req, res) {
    user.findById(req.params.id)
        .then((user) => {
            return res.render('profile', {
                title: 'user Profile',
                profile_user: user,
            })
        })
}

module.exports.update = function (req, res) {
    if (req.user.id == req.params.id) {
        user.findByIdAndUpdate(req.params.id, req.body)
            .then((user) => {
                return res.redirect('back');
            })
    } else {
        return res.status(401).send('Unauthorised');
    }
}

//render the signin page - Manual Auth
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('user_signin', {
        title: "Sign In Page",
    });
}

// render the singup page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('user_signup', {
        title: "Sign Up Page"
    });
}

//get the signup data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirmpassword) {
        return res.redirect('back');
    }
    const emailgot = req.body.email;

    user.findOne({ email: emailgot })
        .then((docs) => {
            if (!docs) {
                user.create(
                    {
                        name: req.body.name,
                        password: req.body.password,
                        email: req.body.email,
                    }).then(() => {
                        return res.redirect('/user/sign-in');
                    })
            } else {
                return res.redirect('back');
            }
        })
}

//get the signin data - Manual Auth
// module.exports.createSession = function (req, res) {
//     //steps to authenticate
//     //find the user
//     user.findOne({ email: req.body.email })
//         .then((user) => {
//             if (user) {
//                 if (user.password != req.body.password) {
//                     return res.direct('back');
//                 }
//                 res.cookie('user_id', user.id);
//                 return res.redirect('/user/profile');
//             } else {
//                 return res.redirect('back');
//             }
//         }).catch((err) => {
//             console.log("user not found: ", err);
//             return;
//         })
// }


// module.exports.signOut = function (req, res) {
//     if (req.cookies.user_id) {
//         user.findById()
//             .then(() => {
//                 res.clearCookie('user_id');
//                 return res.redirect('/user/sign-in');
//             })
//     }
// }

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    return res.redirect('/');
}

//Passport Auth
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}