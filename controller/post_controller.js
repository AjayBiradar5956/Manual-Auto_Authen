const Post = require('../model/post');
const Comment = require('../model/comments');
module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(() => {
        return res.redirect('/');
    }).catch((err) => {
        return console.log("error while create a post", err);
    })
};
module.exports.destroy = function (req, res) {
    Post.findById(req.params.id)
        .then((post) => {
            //.id means converting the object id into string - this is done by mongoose
            if (post.user == req.user.id) {
                post.deleteOne();
                Comment.deleteMany({ post: req.params.id })
                    .then(() => {
                        return res.redirect('/');
                    })

            } else {
                return res.redirect('/');
            }
        })
}