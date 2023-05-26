const Comment = require('../model/comments');
const Post = require('../model/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);

        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });
        comment = await Comment.findOne(comment).populate('user', 'name email').exec();
        // commentsMailer.newComment(comment);
        let job = queue.create('emails', comment).save(function (err) {
            if (err) {
                return console.log('error in create a queue', err);
            }
            console.log(job.id);
        })

        if (req.xhr) {

            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: "Post Created!"
            });
        }

        post.comments.push(comment);
        post.save();

        res.redirect('/');

    } catch (err) {
        console.log('Error', err);
    }
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


