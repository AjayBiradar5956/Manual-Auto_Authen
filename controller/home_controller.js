const Post = require('../model/post');
const user = require('../model/user');

module.exports.home = function (req, res) {
    // Post.find({})
    //     .then((docs) => {
    //         return res.render('home', {
    //             title: "Home Page",
    //             post: docs,
    //         })
    //     })

    //Populate the user who create the post
    let fetchedPosts;
    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec()
        .then((posts) => {
            fetchedPosts = posts;
            return user.find({}).exec();
        })
        .then((users) => {
            return res.render('home', {
                title: 'Codial | Home',
                posts: fetchedPosts,
                all_users: users,
            });
        })


}
