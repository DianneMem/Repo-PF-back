const Product = require("../models/Product");

exports.filterAuthor = async (req, res) => {
  try {
    const { author } = req.params
    console.log(author)
    const authors = await Product.find({})
    const filterAuthors1 = authors.filter((elm) => {
      return elm.author.toLocaleLowerCase().includes(author.toLocaleLowerCase())
    })
   return res.status(202).send(filterAuthors1);
  } catch (error) {
   return res.status(400).send(error.message);
  }
};

exports.filterEditorial = async (req, res) => {
  try {
    const { editorial } = req.params
    const editorials = await Product.find({})
    const filterEditorial = editorials.filter((elm) => {
      return elm.editorial.toLocaleLowerCase().includes(editorial.toLocaleLowerCase())
    })
   return res.status(202).send(filterEditorial);
  } catch (error) {
   return res.status(400).send(error.message);
  }
};

exports.filterSaga = async (req, res) => {
  try {
    const { saga } = req.params
    const sagas = await Product.find({})
    const filterSaga = sagas.filter((elm) => {
      return elm.saga.toLocaleLowerCase().includes(saga.toLocaleLowerCase())
    })
   return res.status(202).send(filterSaga);
  } catch (error) {
   return res.status(400).send(error.message);
  }
};
