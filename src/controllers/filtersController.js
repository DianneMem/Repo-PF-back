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
