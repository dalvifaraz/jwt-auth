const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth };