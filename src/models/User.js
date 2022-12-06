const mongoose = require("mongoose")
const { Schema,model } = mongoose;


const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  adress: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    required: true
  }
})


module.exports = model("User",User)


