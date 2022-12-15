const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const loginGoogleRouter = Router()
const User = require("../models/User");

//rutas para Google

//ruta para Registrarse

loginGoogleRouter.get("/signup",passport.authenticate("google", {scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], session: false }),
  function (req, res) {
    if (req.user) {
      const token = jwt.sign({id: req.user._id}, 'top_secret', {
        expiresIn: 60 * 60 * 24 // equivalente a 24 horas
      })
      res.cookie('token', token)        
      res.redirect('http://localhost:3000/')

    } else {
      res.redirect('http://localhost:3000/login')
    }
  }
);

loginGoogleRouter.get("/google", (req, res) => {
  // console.log(req.user)
  res.send(req.user)
})

loginGoogleRouter.get("/profile", (req,res,next) => {
   res.redirect("http://localhost:3000/login")
})


loginGoogleRouter.get(
  "/callback",
  passport.authenticate("sign-up-google", {scope: ['https://www.googleapis.com/auth/plus.login'], session: false }),
  function (req, res) {
    if (req.user) { 
      const token = jwt.sign({id: req.user._id}, 'top_secret', {
        expiresIn: 60 * 60 * 24 // equivalente a 24 horas
      })
      res.cookie('token', token)        
      res.redirect('http://localhost:3000/login')
    } else {
      res.redirect('http://localhost:3000/login')
    } 
  }
);

module.exports = loginGoogleRouter;
