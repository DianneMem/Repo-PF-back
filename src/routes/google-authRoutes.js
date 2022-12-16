const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const loginGoogleRouter = Router()
const User = require("../models/User");
const { profile } = require("console");

//rutas para Google

//ruta para Registrarse

loginGoogleRouter.get("/signup",passport.authenticate("sign-up-google", {scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], session: false }),
  function (req, res) {
    if (req.user) {
      const token = jwt.sign({id: req.user._id}, 'top_secret', {
        expiresIn: 60 * 60 * 24 
      })
      res.cookie('token', token)
      res.send(req.user)
      // res.redirect('http://localhost:3000/')
    } else {
      res.redirect('http://localhost:3000/login')
    }
  }
);

//ruta para ingresar


loginGoogleRouter.get(
  "/signin",
  passport.authenticate("sign-in-google", {scope: ['https://www.googleapis.com/auth/plus.login'], session: false }),
  function (req, res) {
    if (req.user) { 
      const token = jwt.sign({id: req.user._id}, 'top_secret', {
        expiresIn: 60 * 60 * 24 
      })
      res.cookie('token', token)
      res.send(req.user)
      // res.redirect('http://localhost:3000/')
    } else {
      res.redirect('http://localhost:3000/register')
    } 
  }
);

module.exports = loginGoogleRouter;
