const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const categorieRouter = require("./routes/categorieRoutes")
const genderRouter = require("./routes/genderRoutes")
const languageRouter = require("./routes/languageRoutes")
const filtersRouter = require("./routes/filtersRoutes")


require("./db");

const server = express();

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

server.use("/users", userRouter);
server.use("/products", productRouter);
server.use("/categories", categorieRouter);
server.use("/genders", genderRouter);
server.use("/languages", languageRouter);
server.use("/filters", filtersRouter)




module.exports = server;
