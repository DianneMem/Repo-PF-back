const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
require("./db");

const server = express();

server.use(morgan("dev"));
server.use(bodyParser.json());

server.use("/users", userRouter);
server.use("/products", productRouter);

module.exports = server;
