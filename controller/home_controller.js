const Post = require('../model/post');
const user = require('../model/user');

module.exports.home = async function (req, res) {
    // Post.find({})
    //     .then((docs) => {
    //         return res.render('home', {
    //             title: "Home Page",
    //             post: docs,
    //         })
    //     })

    //Populate the user who create the post

    // let fetchedPosts;
    // Post.find({})
    //     .populate('user')
    //     .populate({
    //         path: 'comments',
    //         populate: {
    //             path: 'user'
    //         }
    //     })
    //     .exec()
    //     .then((posts) => {
    //         fetchedPosts = posts;
    //         return user.find({}).exec();
    //     })
    //     .then((users) => {
    //         return res.render('home', {
    //             title: 'Codial | Home',
    //             posts: fetchedPosts,
    //             all_users: users,
    //         });
    //     })
    try {
        let fetchedPosts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })

        let users = await user.find({});
        return res.render('home', {
            title: 'Codial | Home',
            posts: fetchedPosts,
            all_users: users,
        });
    } catch (err) {
        return console.log("error", err)
    }



}
