const { Router } = require("express");
const categorieController = require("../controllers/categorieController");

const router = Router();

router.post("/", categorieController.newCategorie);
router.get("/", categorieController.getCategorie);

module.exports = router;
