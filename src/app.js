const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const userRouter = require("./routes/userRoutes")
require("./db")

const server = express()

server.use(morgan("dev"))
server.use(bodyParser.json())

server.use("/users", userRouter)


module.exports = server

