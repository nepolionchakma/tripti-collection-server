const Router = require("express");
const productController = require("../Controller/productController");

const router = Router();
router.get("/", productController.getProducts);
module.exports = router;
