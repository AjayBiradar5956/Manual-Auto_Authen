const Post = require('../model/post');
const Comment = require('../model/comments');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        })

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'post created',
            })
        }
        return res.redirect('/');
    }
    catch (err) {
        return console.log("error while create a post", err);
    }
};
module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        //.id means converting the object id into string - this is done by mongoose
        if (post.user == req.user.id) {
            post.deleteOne();
            await Comment.deleteMany({ post: req.params.id })

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id,
                    },
                    message: 'post deleted',
                })
            }
            return res.redirect('/');

        } else {
            return res.redirect('/');
        }
    } catch (err) {
        return console.log("error in destroying", err);
    }

}