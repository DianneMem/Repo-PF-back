const Product = require("../models/Product");
const User = require("../models/User");

exports.newProduct = async (req, res) => {
  const product = new Product(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  const user = await User.findById(req.params.id);
  console.log(product);
  try {
    user.myproducts.push(product);
    await product.save();
    await user.save();
    res.status(202).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.addBuyers = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const prod = await Product.findById(req.params.id)

   await prod.buyers.push(req.body)
      await prod.save();
      res.status(200).send(prod);
    
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

exports.getProduct = async (req, res) => {
  const { search } = req.query;
  try {
    const product = await Product.find({});
    if (search) {
      const productTitle = product.filter((pro) =>
        pro.title.toLowerCase().includes(search.toLowerCase())
      );
      const productAuthor = product.filter((pro) =>
        pro.author.toLowerCase().includes(search.toLowerCase())
      );
      const productEditorial = product.filter((pro) =>
        pro.editorial.toLowerCase().includes(search.toLowerCase())
      );
      const productSaga = product.filter((pro) =>
        pro.saga.toLowerCase().includes(search.toLowerCase())
      );
      let all = productTitle
        .concat(productAuthor)
        .concat(productEditorial)
        .concat(productSaga);
      if (all.length) {
        return res.status(200).send(all);
      } else {
        res.status(404).send("Book Not Found");
      }
    } else {
      res.status(200).send(product);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.getDetail = async (req, res) => {
  const product = await Product.findById(req.params.id);
  try {
    if (!product) {
      throw new Error("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let prod=await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).json(prod);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.modifiedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product=req.body
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteLogicProduct = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    product.available
      ? (product.available = false)
      : (product.available = true);

    await Product.findByIdAndUpdate({ _id: req.params.id }, product, {
      new: true,
    });

    res.status(200).json("Delete logic successful");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndRemove({ _id: req.params.id });

    res.status(200).json("Delete product successful");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
