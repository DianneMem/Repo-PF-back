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
    clientID:"524525531156-alilid82kitoujkcqbpbg89a35olqkj9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://flybooks.up.railway.app/google/signup",
  },
  // {
  //   clientID:"524525531156-05s7nkt42tg6for0jto328g8bahki9em.apps.googleusercontent.com",
  //   clientSecret: "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",
  //   callbackURL: "http://localhost:3001/google/signup",
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
          newUser.google = true
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
    clientID:"524525531156-alilid82kitoujkcqbpbg89a35olqkj9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://flybooks.up.railway.app/google/signin",
  },
  // {
  //   clientID:"524525531156-05s7nkt42tg6for0jto328g8bahki9em.apps.googleusercontent.com",
  //   clientSecret: "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",
  //   callbackURL: "http://localhost:3001/google/signin",
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

