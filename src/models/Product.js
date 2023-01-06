const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const Product = new Schema({
  _id: {
    type: String,
    default: function () {
      return new ObjectId().toString();
    },
  },
  seller: {
    type: String,
    required: true,
  },
  sellerId: {
    type: String
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  editorial: {
    type: String,
    required: true,
  },
  saga: {
    type: String,
  },
  language: {
    type: String,
    required: true,
  },
  gender: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  typebook: {
    type: String,
    required: true,
  },
  buyers:{
    type:Array
  }
});

module.exports = model("Product", Product);
