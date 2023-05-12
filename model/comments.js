const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',//FOR ALL REFS USE THE COLLECTION NAME WHICH IS IN YOUR DB(ROBO3T)
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
    }
}, {
    timestamps: true,
});

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;