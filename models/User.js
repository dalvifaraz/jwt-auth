const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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

//mongoose midleware / mongoose hook
//fire function after doc saved to db
userSchema.post('save', (doc, next) => {
    console.log('new user saved to db', doc);
    next();
});

//fire a function before doc is saved to db
userSchema.pre('save', async function(next) {
    console.log('user about to be created and stored in db', this)
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;