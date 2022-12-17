const { Router } = require("express");
const authorController = require("../controllers/authorController");

const router = Router();

router.get("/", authorController.getAuthor);

module.exports = router;
