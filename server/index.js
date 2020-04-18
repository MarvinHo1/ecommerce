if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const express = require('express')
const app = express()
const port = 3000
const db = require('../database/postgres')
const morgan = require('morgan')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const path = require('path');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport.js')
initializePassport( 
  passport, 
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id),
)

//proxy database for now
const users = [];

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(flash());
app.use(session({
  secret: process.env.SESSION_KEY,
  //should we resave our session variables if nothing is changed
  resave: false,
  //do you want to save an empty value
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', checkAuthenticated, (req, res) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.post('/login', passport.authenticate('local', {
  // on success send us back to the homepage
  successRedirect: '/',
  // on fail send us back to out login page
  failureRedirect: '/login',
  // allow messages to be send back to view layer
  failureFlash: true
}))

app.post('/register', async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPass)
    users.push({
      //id will be provided to
      id: Date.now().toString(),
      email: req.body.email,
      password: hashedPass
    })
    res.sendStatus(200);
  } catch (err) {
    console.log(err)
    res.sendStatus(404);
  }
})

//use axios axios.delete onclick to logout of session
app.delete('/logout', (req, res) => {
  req.logOut()
  req.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))