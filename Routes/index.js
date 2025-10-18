const Router = require("express");
const authentication = require("../Authentication/authentication");
const verifyUser = require("../Middleware/verifyUser");

const routes = Router();

// routes
const productRoutes = require("./productsRoutes");
// routes.use(verifyUser);
routes.get("/api/login/google", authentication.googleLogin);
routes.get("/api/login/google/callback", authentication.googleCallback);
routes.get("/api/auth/me", authentication.me);
routes.get("/api/auth/logout", authentication.logout);

routes.use("/api/products", productRoutes);

routes.use("/api/", (req, res) => res.send("Hello World! Server is running."));

module.exports = routes;
