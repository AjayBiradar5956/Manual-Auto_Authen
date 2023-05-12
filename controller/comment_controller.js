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

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id)
        .then((comment) => {
            if (comment.user == req.user.id) {
                let post_id = comment.post;
                comment.deleteOne();

                Post.findByIdAndUpdate(post_id, { $pull: { comments: req.params.id } })
                    .then((post) => {
                        return res.redirect('/');
                    })
            } else {
                return res.redirect('/');
            }
        })
}


//MAKE CHECK WHEN USERS POST HAS OTHER USERS COMMENTS AND YOU CAN DELETE OTHERS COMMENTS AS WELL


