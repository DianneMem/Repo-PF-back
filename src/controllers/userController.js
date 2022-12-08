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

// exports.deleteLogicProduct = async (req, res) => {
//   try {
//     const product = await Product.findById({ _id: req.params.id });
//     product.available
//       ? (product.available = false)
//       : (product.available = true);

//     await Product.findByIdAndUpdate({ _id: req.params.id }, product, {
//       new: true,
//     });

//     res.status(200).json("Delete logic successfull");
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };
// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findOneAndRemove({ _id: req.params.id });

//     res.status(200).json("Removed product");
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };
