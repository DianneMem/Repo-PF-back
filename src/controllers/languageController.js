const Language = require("../models/Language");

exports.newLanguage = async (req, res) => {
  const language = new Language(req.body);

  try {
    await language.save();
    res.status(202).send(language);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getLanguage = async (req, res) => {
  try {
    const result = await Language.find({});
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
