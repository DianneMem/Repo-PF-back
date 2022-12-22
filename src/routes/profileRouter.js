const { Router } = require("express");
const profileController = require("../controllers/profileController")

const router = Router()

router.post("/purchases/:id",profileController.addPurchaseUser)
router.post("/favorites/:id",profileController.addFavorites)
router.post("/myproducts/:id",profileController.addMyProducts)
router.post("/reviews/:id",profileController.addReviews)
router.get("/myproducts/user/:id",profileController.getMyProducts)



module.exports = router;
