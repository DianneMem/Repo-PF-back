const passport = require("passport")
const User = require("../models/User")
const LocalStrategy = require("passport-local").Strategy;
const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51MEajtLJTt31yzzaW3muurRnhU5ue2XgeiO86okSHdofdTkCvCme0d0dcfSm47w26VZrnXxNHBe6awOg1CGqworX00CZhOt5FX"
);

// const createUserOnStripe = async(email,username)=>{
//   var param = {};
//   param.email = email;
//   param.name = username;
//   param.description = "New stripe User";

//   let newCustomer = await stripe.customers.create(
//     param,
//     function (err, customer) {
//       if (err) {
//         throw new Error(err)
//       }
//       if (customer) {
//         return customer.id

//       }
//     }
//   );
// }



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
    //BUSCAR EN STRIPE UN ID ASOCIADO AL REQ.BODY.USERNAME
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
