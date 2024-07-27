const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwtToken;

    // check if jwt exist and verify is it correct
    if (token) {
        jwt.verify(token, 'this is my secret key', (error, decodedToken) => {
            if (error) {
                console.log('token verification error: ', error.message);
                res.redirect('/login');
            } else {
                console.log('token verified: ', decodedToken)
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (token) {
        jwt.verify(token, 'this is my secret key', async (error, decodedToken) => {
            if (error) {
                console.log('token verification error: ', error.message);
                res.locals.user = null;
                next();
            } else {
                console.log('token verified: ', decodedToken)
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = { requireAuth, checkUser };