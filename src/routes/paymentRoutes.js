const { Router } = require("express");
const paymentController =require("../controllers/paymentController")

const router = Router();

router.post("/", paymentController.payment);
router.post("/stripe", paymentController.createCustomer);
router.get("/", paymentController.findUserStripe);
module.exports = router;
