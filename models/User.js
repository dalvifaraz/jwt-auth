const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 12
    },
});

const User = mongoose.model('user', userSchema);

module.exports = User;