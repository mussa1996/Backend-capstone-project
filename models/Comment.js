const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    
    comment: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 1000
    },
    Article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;