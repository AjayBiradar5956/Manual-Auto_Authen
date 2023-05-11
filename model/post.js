const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },

    // Inclue the comments of this post in an array
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comments',
        }
    ]
}, {
    timestamps: true,
});

const Post = mongoose.model('posts', postSchema);
module.exports = Post;