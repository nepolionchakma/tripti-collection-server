const Router = require("express");
// const cookieParser = require("cookie-parser");

const routes = Router();

// routes
const productRoutes = require("./productRoutes");

// routes.use(cookieParser());

routes.use("/products", productRoutes);

module.exports = routes;
