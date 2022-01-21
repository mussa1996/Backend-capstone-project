const mongoose = require('mongoose');
const articlesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    summary: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 1000
    },
    picture: {
        type: String,
        required: false,
        maxlength: 1000

    },
    contents: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 1000
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Article = mongoose.model('Article', articlesSchema);
module.exports = Article;