const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session")
// const cookieParser = require("cookie-parser")

const passport = require("passport");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const categorieRouter = require("./routes/categorieRoutes")
const genderRouter = require("./routes/genderRoutes")
const languageRouter = require("./routes/languageRoutes")
const filtersRouter = require("./routes/filtersRoutes")
const loginGoogleRouter = require("./routes/google-authRoutes")
const loginLocalRouter = require("./routes/local-authRoutes")
const paymentRouter= require("./routes/paymentRoutes")
const stripe = require("stripe")


require("./db");
require("./passport/local-auth")
require("./passport/google-auth")


const server = express();
server.use(cors({ origin: "http://localhost:3000" }));
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(session({
  secret: 'mysecretsession',
  resave: true,
  saveUninitialized: true
}))
server.use(passport.initialize());
server.use(passport.session());
server.use(cors())
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// server.use(cookieParser("mysecretsession"))

server.use("/users", userRouter);
server.use("/products", productRouter);
server.use("/categories", categorieRouter);
server.use("/genders", genderRouter);
server.use("/languages", languageRouter);
server.use("/filters", filtersRouter);
server.use("/google", loginGoogleRouter);
server.use("/local", loginLocalRouter);

// server.use("/",passport.authenticate("sign-up-google",{
//   scope:[
//     "https://www.googleapis.com/auth/userinfo.profile",
//     "https://www.googleapis.com/auth/userinfo.email"
//   ]
// }), google_authRoutes)

server.use("/filters", filtersRouter)
server.use("/api/checkout",paymentRouter)



module.exports = server;
