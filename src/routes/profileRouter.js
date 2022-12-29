const { Router } = require("express");
const profileController = require("../controllers/profileController")

const router = Router()

router.post("/purchases/:id",profileController.addPurchaseUser)
router.post("/favorites/:id",profileController.addFavorites)
router.post("/myproducts/:id",profileController.addMyProducts)
router.put("/myproducts/:id",profileController.updateProductProfile)
router.post("/reviews/:id",profileController.addReviews)
router.post("/myreviews/:id",profileController.myReviews)
router.get("/getmyreviews/:id",profileController.getMyReviews)
router.get("/myproducts/user/:id",profileController.getMyProducts)
router.get("/allreviews",profileController.getAllReviews)
router.get("/allreviews/:id",profileController.getReviewUser)


module.exports = router;
