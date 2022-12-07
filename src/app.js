const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const categorieRouter = require("./routes/categorieRoutes")
const genderRouter = require("./routes/genderRoutes")
const languageRouter = require("./routes/languageRoutes")


require("./db");

const server = express();

server.use(morgan("dev"));
server.use(bodyParser.json());

server.use("/users", userRouter);
server.use("/products", productRouter);
server.use("/categories", categorieRouter);
server.use("/genders", genderRouter);
server.use("/languages", languageRouter);




module.exports = server;
