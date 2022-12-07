const Categorie = require("../models/Categorie")

exports.newCategorie = async (req, res) => {
  const categorie = new Categorie(req.body);

  try {
    await categorie.save();
    res.status(202).send(categorie);
    
  } catch (error) {
    res.status(400).send(error.message)
  }
}

exports.getCategorie = async(req, res) => {
  try {
    const result = await Categorie.find({})
    res.header("Access-Control-Allow-Origin", "*")
    res.status(200).send(result)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

