const Post = require('../model/post')
module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(() => {
        return res.redirect('/');
    }).catch((err) => {
        return console.log("error while create a post", err);
    })
}