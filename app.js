const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRouthes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/auth');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://dalvifaraz:jwt-auth-admin@cluster0.s1e15zv.mongodb.net/jwt-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.use(authRoutes);


//cookies - Learning!!
//maxAge - expire time,
//secure - only for https,
//httpOnly - wont be able to use in frontend js i.e. document.cookies
// app.get('/set-cookies', (req, res) => {

//   res.cookie('newUser', false);
//   res.cookie('newEmpy', false, { maxAge: 5000 });
//   res.send('cookies registered');

// });
// app.get('/read-cookies', (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.send(cookies);
// });