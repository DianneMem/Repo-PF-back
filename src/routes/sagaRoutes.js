const { Router } = require("express");
const sagaController = require("../controllers/sagaController");

const router = Router();

router.get("/", sagaController.getSaga);

module.exports = router;
