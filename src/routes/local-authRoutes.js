const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const loginLocalRouter = Router()
const User = require("../models/User");



loginLocalRouter.post("/signup", passport.authenticate('local-signup'),(req,res)=>{
  res.send(req.body)
  // res.redirect('http://localhost:3000/')
})

loginLocalRouter.post("/signin", passport.authenticate("local-signin"), (req, res) => {
  try {
    if (req.user) {
      const token = jwt.sign({id: req.user.id, username: req.user.username}, 'top_secret', {
        expiresIn: 60 * 60 * 24 // equivalente a 24 horas
      })
      console.log(token)
      // var cookie = document.cookie
      // res.cookie('token', token)  
      res.cookie("jwt",token,{
        expires:new Date(Date.now()+5000),
        httpOnly:true
      }).send(token)      
    // res.send(token);
     res.redirect('http://localhost:3000/')
  }} catch (error) {
    res.send("datossjsj")
  }
})


// loginRouter.get("/singin", (req,res,next) => {

// })


// loginRouter.post("/singin", (req,res,next) => {
  
// })

module.exports = loginLocalRouter;
