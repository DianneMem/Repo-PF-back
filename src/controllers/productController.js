const Product = require("../models/Product");

exports.newProduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.status(202).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getProduct = async (req, res) => {
  const { title } = req.query;
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const product = await Product.find({});
    if (title) {
      const productFilter = product.filter((pro) =>
        pro.title.toLowerCase().includes(title.toLowerCase())
      );
      if (productFilter.length) {
        return res.status(200).send(productFilter);
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
  res.header("Access-Control-Allow-Origin", "*");
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
    await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).json("Update successful");
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
