const { Router } = require("express");
const loginGoogleRouteAuth0 = require("../controllers/loginGoogleAuth0");

const router = Router();

router.post("/", loginGoogleRouteAuth0.createUserGoogle);

module.exports = router;

