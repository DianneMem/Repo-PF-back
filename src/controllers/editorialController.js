const Product = require("../models/Product");

exports.getEditorial = async (req, res) => {
  try {
    const product = await Product.find({});
    let editorialsRepited = product.map((elm) => {return elm.editorial});
    let objEditorial = new Set(editorialsRepited);
    let arrayEditorial = [...objEditorial];
    res.status(200).send(arrayEditorial);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
