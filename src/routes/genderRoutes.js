const { Router } = require("express");
const genderController = require("../controllers/genderController");

const router = Router();

router.post("/", genderController.newGender);
router.get("/", genderController.getGender);

module.exports = router;
