const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { Schema, model } = mongoose;
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require("bcrypt-nodejs")

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
  stripeId:
  {type:String},
  role:{
    type:String,
    default:"user"
  }
});
//revisar validadciones a nivel backend y db

User.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10) )
}

User.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}


module.exports = model("User", User);
