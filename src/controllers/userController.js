const User = require("../models/User");

exports.newUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getUser = async (req, res) => {
  const { name } = req.query;
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const user = await User.find({});
    if (name) {
      const userFilter = user.filter((user) =>
        user.firstname.toLowerCase().includes(name.toLowerCase())
      );
      if (userFilter.length) {
        return res.status(200).send(userFilter);
      } else {
        res.status(404).send("User Not Found");
      }
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.getDetail = async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).json("Update successful");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteLogicUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    user.available ? (user.available = false) : (user.available = true);

    await User.findByIdAndUpdate({ _id: req.params.id }, user, {
      new: true,
    });

    res.status(200).json("Delete logic successful");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req.params.id });

    res.status(200).json("Delete user successful");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
