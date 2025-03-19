const Router = require("express");
const authentication = require("../Authentication/authentication");

const router = Router();
router.get("/login/google", authentication.googleLogin);
router.get("/login/google/callback", authentication.googleCallback);
// router.post("/", authentication.login);
// router.get("/", authentication.logout);
// router.get("/user", authentication.user);
// router.get("/refresh-token", authentication.refreshToken);

module.exports = router;
