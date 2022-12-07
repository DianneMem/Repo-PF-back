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
    const { title } = req.query;
    try {
    res.header("Access-Control-Allow-Origin", "*")
    const product = await Product.find({})
    console.log(product)
    if(title){
      const result = product.filter((pro) => pro.title.toLowerCase().includes(title.toLowerCase()))
      if(result.length){
        return res.status(200).send(result)
      } else {
        res.status(404).send("Book Not Found")
      }
    } else {
      res.status(200).send(product)
    }
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
