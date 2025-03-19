const Router = require("express");
const authentication = require("../Authentication/authentication");
const cookieParser = require("cookie-parser");
const verifyUser = require("../Middleware/verifyUser");

const routes = Router();

// routes
const productRoutes = require("./productRoutes");

routes.use(cookieParser());
// routes.use(verifyUser);
routes.get("/login/google", authentication.googleLogin);
routes.get("/login/google/callback", authentication.googleCallback);
routes.get("/auth/me", authentication.me);

routes.use("/products", productRoutes);

module.exports = routes;
