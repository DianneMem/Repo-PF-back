const Gender = require("../models/Gender");

exports.newGender = async (req, res) => {
  const gender = new Gender(req.body);

  try {
    await gender.save();
    res.status(202).send(gender);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getGender = async (req, res) => {
  try {
    const result = await Gender.find({});
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
