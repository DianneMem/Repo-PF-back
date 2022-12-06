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

exports.getProduct = async(req,res) => {
  try {
    const result = await Product.find({})
    res.status(202).send(result)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

