const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const User = new Schema({
  _id: {
    type: String,
    default: function () {
      return new ObjectId().toString();
    },
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  username: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  storage: {
    type: Array,
    default:[]
  },
  stripeId: {
    type:String
  },
  role:{
    type:String,
    default:"user"
  },
  token: {
    type: String,
    default: ""
  },
  confirm: {
    type: Boolean,
    default: false, 
  },
  purchases:{
    type: Array
  },
  favorites: {
    type: Array
  },
  myproducts: {
    type: Array
  },
  reviews: {
    type: Array
  },
  myreviews: {
    type: Array
  },
  address:{
    type:String
  },
  phone:{
    type:String
  },
  balance:{
    type:Number,
    default:0
  }
});



module.exports = model("User", User);
