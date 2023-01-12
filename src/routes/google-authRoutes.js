const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const loginGoogleRouter = Router()
const User = require("../models/User");

//rutas para Google

//ruta para Registrarse

loginGoogleRouter.get("/signup",passport.authenticate("sign-up-google", {scope: ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], session: false }),
  async function (req, res) {
    console.log("ruta",req.user)
    const userData = await User.findById(req.user.id)
    if (req.user) {
      const token = jwt.sign({id: req.user.id, username: req.user.displayName, email: req.user.emails[0].value, role: userData.role}, 'top_secret', {
        expiresIn: 60 * 60 * 24 // equivalente a 24 horas
      })
      console.log("token 1:",token) 
      res.cookie("jwt",token).redirect("https://flybooks.vercel.app/login")
    } else {
      res.redirect("https://flybooks.vercel.app/login")
    }
  }
);



//ruta para ingresar


loginGoogleRouter.get(
  "/signin",
  passport.authenticate("sign-in-google", {scope: ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], session: false }),
 async function (req, res) {
    if (req.user) { 
      const token = jwt.sign({id: req.user.id, username: req.user.username, email: req.user.email, role: req.user.role}, 'top_secret', {
        expiresIn: 60 * 60 * 24 // equivalente a 24 horas
      })
      console.log("token 2:",token) 
      // console.log("aaaaa",req.user)
      res.cookie("jwt",token).redirect("https://flybooks.vercel.app/")
  
      // res.redirect('http://localhost:3000/')
    } else {
      res.redirect("https://flybooks.vercel.app/")
    } 
  }
);

module.exports = loginGoogleRouter;
