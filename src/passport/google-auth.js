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
    clientID:"277731779597-d80i1kmlhh0tu5kkmqo6538mempht702.apps.googleusercontent.com",
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
    clientID:"277731779597-d80i1kmlhh0tu5kkmqo6538mempht702.apps.googleusercontent.com",
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

