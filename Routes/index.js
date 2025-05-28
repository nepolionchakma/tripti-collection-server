const Router = require("express");
const authentication = require("../Authentication/authentication");
const cookieParser = require("cookie-parser");
const verifyUser = require("../Middleware/verifyUser");

const routes = Router();

// routes
const productRoutes = require("./productsRoutes");

routes.use(cookieParser());
// routes.use(verifyUser);
routes.get("/login/google", authentication.googleLogin);
routes.get("/login/google/callback", authentication.googleCallback);
routes.get("/auth/me", authentication.me);
routes.get("/auth/logout", authentication.logout);

routes.use("/products", productRoutes);
routes.use("/", (req, res) => res.send("Hello World! Server is running."));

module.exports = routes;
