const Product = require("../models/Product");

exports.newProduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.status(200).send(product);
    
  } catch (error) {
    res.status(400).send(error.message)
  }
}

