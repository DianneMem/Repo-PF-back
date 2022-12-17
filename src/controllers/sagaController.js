const Product = require("../models/Product");

exports.getSaga = async (req, res) => {
  try {
    const product = await Product.find({});
    let productsWithSaga = product.filter((elm) => {return elm.saga !== ""});
    let sagasRepited = productsWithSaga.map((elm)=>{return elm.saga});
    let objSagasClean = new Set(sagasRepited);
    let arraySagasClean = [...objSagasClean];
    res.status(200).send(arraySagasClean);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
