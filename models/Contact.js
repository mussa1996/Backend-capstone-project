const mongoose = require('mongoose');
const {default: validator} = require('validator');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    subject: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 1000
    },
    date: {
        type: Date,
        default: Date.now
    }

});
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
