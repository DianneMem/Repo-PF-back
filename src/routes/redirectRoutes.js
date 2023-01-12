const { Router } = require("express");
const loginController = require("../controllers/loginController")
const router = Router();


router.get("/", loginController.redirectLoginFunction);

router.get("/home", loginController.redirectHomeFunction);


module.exports = router;
