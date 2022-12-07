const { Router } = require("express");
const productController = require("../controllers/productController");

const router = Router();

router.post("/", productController.newProduct);
router.get("/", productController.getProduct);
router.get("/:id", productController.getDetail);

module.exports = router;
