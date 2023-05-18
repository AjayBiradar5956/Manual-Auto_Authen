const Post = require('../../../model/post');
const Comment = require('../../../model/comments');

const maskPassword = (post) => {
    if (post.user.password) {
        post.user.password = '***';
    }
    return post;
}
module.exports.index = async function (req, res) {
    let fetchedPosts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })

    fetchedPosts = fetchedPosts.map((post) => maskPassword(post));

    return res.status(200).json({
        message: "List of posts",
        posts: fetchedPosts,
    })
};

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        //.id means converting the object id into string - this is done by mongoose
        if (post.user == req.user.id) {
            post.deleteOne();
            await Comment.deleteMany({ post: req.params.id })
            return res.status(200).json({
                message: "Post and Comment both deleted",
            });
        } else {
            return res.status(401).json({
                message: "you can't delete the post", s
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Error",
        })
    }
}
