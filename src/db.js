const mongoose = require("mongoose")
const express = require("express")
const server = express()
const config = require("../src/configuration/config")



mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);
mongoose.connect(`${config.DB_HOST}://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_NAME}.${config.DB_PORT}.mongodb.net/test`, {
  useNewUrlParser: true
}).then(() => {
  console.log("database connected")
}).catch(err => {
  console.error(err)
});





