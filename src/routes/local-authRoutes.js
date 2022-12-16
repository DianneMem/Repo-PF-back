const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const loginLocalRouter = Router()
const User = require("../models/User");


loginLocalRouter.post("/signup", passport.authenticate('local-signup'),(req,res)=>{
  res.send(req.body)
  // res.redirect('http://localhost:3000/')
})

// loginLocalRouter.post("/signin", passport.authenticate("local-signin"), (req, res) => {

//   res.send("hola");
// })

// loginRouter.get("/singin", (req,res,next) => {

// })


// loginRouter.post("/singin", (req,res,next) => {
  
// })

module.exports = loginLocalRouter;
