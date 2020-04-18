const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


function initialize (passport, getUserByEmail, getUserbyId) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      //done(err, no user, message)
      return done(null, false, {message: 'No user with that email'})
    }

    //compare if password given match out password
    try {
      //compare(pass in database, pass given by user)
      if ( await bcrypt.compare(password, user.password)) {
        //password is correct
        // done(no err so null, return user)
        console.log('we have the user')
        return done(null, user, {message: 'it works!'})

      } else {
        //if compare function did not return true
        return done(null, false, {message: 'Password incorrect'})
      }
    } catch (err) {
      //return the err
      return done(err)
    }
  }

  passport.use(new LocalStrategy({usernameField: 'email'},
  authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => done(null, getUserbyId))
}

module.exports = initialize;
