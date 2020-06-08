const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


function initialize (passport, getUserByEmail, getUserbyId, req, res) {
  const authenticateUser = async (email, password, done) => {

    const user = getUserByEmail(email)
    // console.log(user, req)
    if (user == null) {
      //done(err, no user, message)
      // var flash = req.flash('error')
      // console.log('1', req.session,'heeee', req.session.flash.error[0])
      // res.send(req.session.flash.error[0])
      return done(null, false, {message: req.flash('message', 'No user with that email')})
    }

    //compare if password given match out password
    try {
      //compare(pass in database, pass given by user)
      if ( await bcrypt.compare(password, user.password)) {
        // console.log('2')
        //password is correct
        // done(no err so null, return user)
        // req.flash('message', 'Welcome to the site')
        console.log('we have the user')
        return done(null, user, {message: req.flash('message', 'Welcome to the site')})

      } else {
        console.log('3')
        //if compare function did not return true
        return done(null, false, {message: req.flash('message', 'Password incorrect')})
      }
    } catch (err) {
      //return the err
      return done(err)
    }
  }

  passport.use(new LocalStrategy({usernameField: 'email'}, 
  authenticateUser))
          // console.log('1', req.session,'heeee', req.session)
          // console.log(user.id)
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => done(null, getUserbyId))
}

module.exports = initialize;
