const passport = require("passport")
const User = require("../models/User")
const LocalStrategy = require("passport-local").Strategy;


passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password,done)=>{
  const user = await User.find({email: req.body.email});// si existe en la base de datos
  if(user.length !== 0){
    done("user exist")
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.username = req.body.username;
    await newUser.save();
    done(null,newUser);
  }
  
}))

passport.use("local-signin", new LocalStrategy(async (username, password, done) =>{
  const user = await User.findOne({username: username, password: password});
  console.log(user)
  // if(username === "usuario" && password === "123456")
  // return done(null, {id: 1, name: "totoelcrack"});
  if(user){
    return done(null, { id: user._id, username: user.username});
  }else {
    done(null,false)
  }

}))



passport.serializeUser(function(user, done){
  done(null, user.id);
});


passport.deserializeUser(async function (id, done){
  const user = await User.findById(id);
  done(null, user)
});
