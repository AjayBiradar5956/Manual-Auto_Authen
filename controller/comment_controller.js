const Comment = require('../model/comments');
const Post = require('../model/post');

module.exports.create = function (req, res) {
    Post.findById(req.body.post)
        .then(function (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
                .then(function (comment) {
                    post.comments.push(comment);
                    post.save();
                    res.redirect('/');
                })
        })
        .catch((err) => {
            return console.log("caught:", err);
        })

}

