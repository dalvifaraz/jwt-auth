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
  if (err.message === 'incorrect email') {
    errors.email = 'this email is not registered';
  }

  if (err.message === 'incorrect password') {
    errors.password = 'this password is incorrect';
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
    res.cookie('jwtToken', token, { httpOnly: true, maxAge: maxAge * 1000 });//maxage in milisecond
    res.status(201).json({ user: user._id});
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    //create a token and store it in cookie
    const token = createToken(user._id);
    res.cookie('jwtToken', token, { httpOnly: true, maxAge: maxAge * 1000 });//maxage in milisecond
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie('jwtToken', '', { maxAge: 1 });
  res.redirect('/');
};