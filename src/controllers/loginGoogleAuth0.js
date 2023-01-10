const User = require("../models/User");


exports.createUserGoogle = async (req,res) => {
  const { email, name, email_verified  } = req.body 
  try {
    let newUser = new User();
    newUser.email = email
    newUser.username = name
    newUser.password = ""
    newUser.confirm = email_verified
   await newUser.save() 
   res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send(error.message)
  }
}
