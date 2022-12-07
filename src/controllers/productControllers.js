const Product = require("../models/Product");

exports.newProduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.status(202).send(product);
    
  } catch (error) {
    res.status(400).send(error.message)
  }
}

exports.getProduct = async(req, res) => {
  try {
    const result = await Product.find({})
    res.header("Access-Control-Allow-Origin", "*")
    res.status(200).send(result)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

exports.getDetail = async (req, res) => {
  const product = await Product.findById(req.params.id);

  try {
    if(!product){
      throw new Error("Product not found")
    }
     res.status(200).json(product);
    
  } catch (error) {
    res.status(400).send(error.message)
  }
}
