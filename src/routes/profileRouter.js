const { Router } = require("express");
const profileController = require("../controllers/profileController")

const router = Router()

router.use("/purchases/:id",profileController.addPurchaseUser)
router.use("/favorites/:id",profileController.addFavorites)
router.use("/myproducts/:id",profileController.addMyProducts)


module.exports = router;
