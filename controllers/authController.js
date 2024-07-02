const User = require('../models/User');
const jwt = require('jsonwebtoken');

//handle errors
const handleError = (err) => {
  let errors = { email: '', password: '' };

  //duplicate email validator
  if (err.code === 11000) {
    errors.email = 'Email already exist in db, please try different email.'
    return errors
  }

  //validator error
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 60 * 5 //60sec * 5 = 5mins
const createToken = (id) => {
  return jwt.sign({id}, 'this is my secret key', {
    expiresIn: maxAge,//time in second
  });
}

module.exports.signup_get = (req, res) => {
  res.render('signup');
};

module.exports.login_get = (req, res) => {
  res.render('login');
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    console.log('hello', token);
    res.cookie('jwt-token', token, { httpOnly: true, maxAge: maxAge * 1000 });//maxage in milisecond
    res.status(201).json({ user: user._id});
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = (req, res) => {
  console.log(req.body, 'request body');
  res.send('user login');
};

module.exports.logout = (req, res) => {
  res.send('user logout');
};