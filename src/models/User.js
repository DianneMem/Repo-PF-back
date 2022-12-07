const mongoose = require("mongoose")
const { Schema,model } = mongoose;


const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
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
    unique: true,
    trim: true
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
//revisar validadciones a nivel backend y db


module.exports = model("User",User)


