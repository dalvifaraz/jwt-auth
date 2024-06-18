module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = (req, res) => {
    console.log(req.body, 'request body');
    res.send('singnew up', req);
}

module.exports.login_post = (req, res) => {
    console.log(req.body, 'request body');
    res.send('user login');
}

module.exports.logout = (req, res) => {
    res.send('user logout');
}