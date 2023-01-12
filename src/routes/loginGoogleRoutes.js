const { Router } = require("express");
const loginGoogleRouteAuth0 = require("../controllers/loginGoogleAuth0");

const router = Router();

router.get("/login-google", loginGoogleRouteAuth0.loginGoogle);

module.exports = router;

