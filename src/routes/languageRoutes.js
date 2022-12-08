const { Router } = require("express");
const languageController = require("../controllers/languageController");

const router = Router();

router.post("/", languageController.newLanguage);
router.get("/", languageController.getLanguage);

module.exports = router;
