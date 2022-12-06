const mongoose = require("mongoose")
const { Schema,model } = mongoose;

const Product = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  categorie: {
    type: String,
    required: true
  },
  editorial: {
    type: String,
    required: true
  },
  saga: {
    type: String,
  },
  language: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: mongoose.Decimal128,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true,
  },
  available:{
    type: Boolean,
    default: true
  },
  typebook:{
    type: String,
    default: true
  }
})

module.exports = model("Product",Product)
