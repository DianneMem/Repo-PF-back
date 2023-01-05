const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const config = require("../configuration/config");

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  //validation
  await check("username").notEmpty().withMessage("Is required").run(req);
  await check("email").isEmail().withMessage("example@example.com").run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("Min 6 character")
    .run(req);

  let result = validationResult(req);
  //verification length
  if (!result.isEmpty()) {
    return res.json(result.array());
  }

  const existsUser = await User.findOne({ email: req.body.email });
  if (existsUser) {
    console.log("User already exists");
    return;
  }

  const generarId =
    Math.random().toString(32).substring(2) + Date.now().toString(32);
  const user = new User({
    username,
    password,
    email,
    token: generarId,
  });

  const salt = await bcrypt.genSaltSync(10);
  user.password = await bcrypt.hashSync(user.password, salt);
  await user.save();

  const emailRegister = async (data) => {
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fd4a0f3a81475d",
    pass: "be7a7c215f7fdd"
      },
    });
    const { username, email, token } = data;
    await transport.sendMail({
      from: "books.com",
      to: email,
      subject: "Confirm acount",
      text: "Confirm acount",
      html: `
      <p> Hi! ${username}, confirm acount in FlyBooks </p>
      <p> Confirm your account in the link :
      <a href="http://localhost:3001/local/confirm/${token}"> Confirm Acount </a></p>
      <p> If you don't create the account, ignore</p>`,
    });
  };
  emailRegister({
    username: user.username,
    email: user.email,
    token: user.token,
  });
  res.status(200).send(user);
};

exports.confirm = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ token });
  if (!user) {
    res.send("Invalid Token");
  }
  user.token = null;
  user.confirm = true;
  await user.save();
  res.redirect("http://localhost:3000/login");
};

exports.recoverPassword = async (req, res) => {
  await check("email").isEmail().withMessage("example@example.com").run(req);
  let result = validationResult(req);
  //verification length
  if (!result.isEmpty()) {
    return res.json(result.array());
  }
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.send("Invalid email");
  }

  const newPassword = Math.random().toString(32).substring(2);

  const salt = await bcrypt.genSaltSync(10);
  const passCrypt = await bcrypt.hashSync(newPassword, salt);
  user.password = passCrypt;

  await user.save();
  //send email
  const emailRecover = async (data) => {
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fd4a0f3a81475d",
    pass: "be7a7c215f7fdd"
      },
    });

    const { username, email, password } = data;
    await transport.sendMail({
      from: "books.com",
      to: email,
      subject: "Reset your password on FlyBooks",
      text: "Reset your password on FlyBooks",
      html: `
        <p> Hi! ${username}, Reset your password on FlyBooks</p>
        <p> this is your new password " ${password} "</p>
        <p> click on the link to log in:
        <a href="http://localhost:3000/login"> FlyBooks</a></p>
        <p> If you did not request the change ignore the message </p>`,
    });
  };

  emailRecover({
    username: user.username,
    email: user.email,
    password: newPassword,
  });
  res.send("ok");
};

exports.loginLocal = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (user) {
    const validPassword = await bcrypt.compareSync(password, user.password);
    if (validPassword && user.confirm) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
          email: user.email,
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
    } else {
      res.send("Incorrect password");
    }
  } else {
    res.send("Incorrect data");
  }
};
