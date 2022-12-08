const { Router } = require("express");
const productController = require("../controllers/productController");

const router = Router();

router.post("/", productController.newProduct);
router.get("/", productController.getProduct);
router.get("/:id", productController.getDetail);
router.put("/deletelogic/:id", productController.deleteLogicProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
