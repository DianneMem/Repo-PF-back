const { Router } = require("express")
const productController = require("../controllers/productControllers")

const router = Router()

router.post("/", productController.newProduct)


module.exports = router
