const mongoose = require("mongoose")
const express = require("express")
const server = express()


// const password = "juan1998"

// const connection = `mongodb+srv://Juan:${password}@proyectofinal.u4vwttl.mongodb.net/e-books?retryWrites=true&w=majority`;


mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/ebooksdb", {
  useNewUrlParser: true
}).then(() => {
  console.log("database connected")
}).catch(err => {
  console.error(err)
});



// mongoose.connect(connection, {
// }).then(() => {
//   console.log("database connected")
// }).catch(err => {
//   console.error(err)
// })


