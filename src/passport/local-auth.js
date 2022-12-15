const passport = require("passport")
const User = require("../models/User")
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done)=> {
  done(null, user.id);
});

passport.deserializeUser(async (id, done)=> {
  const user = await User.findById(id);
  done(null, user)
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password,username, done)=>{
  const user = new User();
  user.email = email;
  user.password = password;
  user.username = username
  await user.save();
  done(null,user);

}))
