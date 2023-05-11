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
    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec()
        .then(function (posts) {
            return res.render('home', {
                title: 'Codial | Home',
                posts: posts
            });
        })

}
