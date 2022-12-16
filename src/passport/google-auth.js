const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});


passport.use("sign-up-google",new GoogleStrategy(
  {
    clientID:"277731779597-q1t46bft9uir7s2ttpg6altgrv41lk0m.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3001/google/signup",
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findById(profile.id); // si el usuario no existe 
    console.log("prueba1",profile)
                                                  //lo creamos
    if (user) {
      done("ya estas registrado");
    } else {
      let newUser = new User();
          newUser._id = profile.id
          newUser.email = profile.emails[0].value
          newUser.username = profile.displayName
          newUser.password = ""
         await newUser.save() //guardamos en la base de datos
      done(null, profile); //guardamos en la base de datos
    }
  }
)
);

passport.use("sign-in-google",new GoogleStrategy(
  {
    clientID:"277731779597-q1t46bft9uir7s2ttpg6altgrv41lk0m.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3001/google/signin",
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findById(profile.id);// si existe en la base de datos
                                                 //  puede iniciar sesion
    if (user) {
      done(null, user)
    } else {
      done("usuario no registrado")
    }
    
  }
)
);
