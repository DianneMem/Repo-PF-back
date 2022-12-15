const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const loginLocalRouter = Router()
const User = require("../models/User");


loginLocalRouter.post("/signup", passport.authenticate('local-signup', {
  
  successRedirect: '/products',
  // successRedirect: '/user',

  failureRedirect: '/users',
  passReqToCallback: true

}))

// loginRouter.get("/singin", (req,res,next) => {

// })


// loginRouter.post("/singin", (req,res,next) => {
  
// })

module.exports = loginLocalRouter;
