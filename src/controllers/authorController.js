const Product = require("../models/Product");

exports.getAuthor = async (req, res) => {
  try {
    const product = await Product.find({});
    let authorsRepited = product.map((elm) => {
      return elm.author
    });
    let noRepeat = new Set(authorsRepited);
    let authorsClean = [...noRepeat];
    res.status(200).send(authorsClean);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
