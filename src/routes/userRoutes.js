const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.post("/", userController.newUser);
router.get("/", userController.getUser);
router.get("/:id", userController.getDetail);
router.put("/deletelogic/:id", userController.deleteLogicUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/:id/storage", userController.storageUser);

module.exports = router;
