const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
        // validate: [(email) => {
        //     //try performing valid email
        // }, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter the password'],
        minlength: [5, 'Password length should be between 5 - 12 character'],
        maxlength: [12, 'Password length should be between 5 - 12 character'],
    },
});

const User = mongoose.model('user', userSchema);

module.exports = User;