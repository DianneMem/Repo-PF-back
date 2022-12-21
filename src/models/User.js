const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require("bcrypt")

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
});

// , {
//   hooks: {
//     beforeCreate: async function(user) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(user.password, salt);
//     }
//   }

// }

// User.methods.encryptPassword = (password) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10) )
// }

// User.methods.comparePassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// }


module.exports = model("User", User);
