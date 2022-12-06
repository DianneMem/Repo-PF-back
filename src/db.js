const mongoose = require("mongoose")
const express = require("express")
const server = express()




mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://totovalv:3479@cluster0.dzobm4a.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true
}).then(() => {
  console.log("database connected")
}).catch(err => {
  console.error(err)
});





