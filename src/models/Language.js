const mongoose = require("mongoose")
const { Schema,model } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const Language = new Schema({
  _id:{
    type: String,
    default: function(){
      return new ObjectId().toString()
    }
  },
 name: {
  type: String,
  unique: true,
  trim: true
 } 
})

module.exports = model("Language",Language)
