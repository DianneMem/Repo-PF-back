const { Router } = require("express");
const localAuth = require("../passport/local-auth")
const loginLocalRouter = Router()



loginLocalRouter.post("/register", localAuth.register);
loginLocalRouter.get("/confirm/:token", localAuth.confirm);
loginLocalRouter.post("/login", localAuth.loginLocal);
loginLocalRouter.post("/recover-password", localAuth.recoverPassword);





module.exports = loginLocalRouter;
