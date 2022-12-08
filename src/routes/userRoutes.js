const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.post("/", userController.newUser);
router.get("/", userController.getUser);
router.get("/:id", userController.getDetail);
router.put("/:id", userController.updateUser);

module.exports = router;
