const Post = require('../model/post');
module.exports.home = function (req, res) {
    // Post.find({})
    //     .then((docs) => {
    //         return res.render('home', {
    //             title: "Home Page",
    //             post: docs,
    //         })
    //     })

    //Populate the user who create the post
    Post.find({}).populate('user').exec().then((docs) => {
        return res.render('home', {
            title: "Home Page",
            post: docs,
        })
    });

}
