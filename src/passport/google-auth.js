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
    clientID:"1013303705922-c8gu83o6csnp29bi6t0sequ4hm6hd177.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://fly-books.up.railway.app/auth/google/callback",
  },
  // {
  //   clientID:"277731779597-q1t46bft9uir7s2ttpg6altgrv41lk0m.apps.googleusercontent.com",
  //   clientSecret: "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",
  //   callbackURL: "http://localhost:3001/google/signup",
  // },
  // {
  //   clientID:"557885841390-orieri1na32f9lvv5idij1j92fnbuuqv.apps.googleusercontent.com",
  //   clientSecret: "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",
  //   callbackURL: "https://fly-books.up.railway.app/google/signup",
  // },
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findById(profile.id); // si el usuario no existe 
                                                  //lo creamos
    if (user) {
      done("you are already registered");
    } else {
      let newUser = new User();
          newUser._id = profile.id
          newUser.email = profile.emails[0].value
          newUser.username = profile.displayName
          newUser.password = ""
          newUser.confirm = true
         await newUser.save() //guardamos en la base de datos
      console.log('Usuario Nuevo', newUser)
      done(null, profile); //guardamos en la base de datos
    }
  }
)
);

passport.use("sign-in-google",new GoogleStrategy(
  {
    clientID:"1013303705922-c8gu83o6csnp29bi6t0sequ4hm6hd177.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://fly-books.up.railway.app/auth/google/signup",
  },
  // {
  //   clientID:"277731779597-q1t46bft9uir7s2ttpg6altgrv41lk0m.apps.googleusercontent.com",
  //   clientSecret: "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",
  //   callbackURL: "http://localhost:3001/google/signin",
  // },
  // {
  //   clientID:"557885841390-orieri1na32f9lvv5idij1j92fnbuuqv.apps.googleusercontent.com",
  //   clientSecret: "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",
  //   callbackURL: "https://fly-books.up.railway.app/google/signin",
  // },
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findById(profile.id);// si existe en la base de datos
                                            //  puede iniciar sesion
    if (user) {
      done(null, user)
    } else {
      done("user is not registered")  
    }
    
  }
)
);
