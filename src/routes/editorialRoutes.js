const { Router } = require("express");
const editorialController = require("../controllers/editorialController");

const router = Router();

router.get("/", editorialController.getEditorial);

module.exports = router;
