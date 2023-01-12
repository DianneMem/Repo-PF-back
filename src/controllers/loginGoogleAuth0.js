const User = require("../models/User");
const jwt = require("jsonwebtoken");


exports.loginGoogle = async (req,res) => {

  try {
    const user = await User.find({google:true})
    const num = user.length -1;
    const userfind = user[num];

    const token = jwt.sign(
      {
        id: userfind.id,
        username: userfind.username,
        role: userfind.role,
        email: userfind.email,
      },
      "top_secret",
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 5000),
        httpOnly: true,
      })
      .send(token);

  } catch (error) {
    console.log(error)
  }
  
}
