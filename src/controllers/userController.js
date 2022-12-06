const User = require("../models/User")

exports.newUser = async(req,res) => {
  const user = new User(req.body)
  try {
    await user.save()
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
