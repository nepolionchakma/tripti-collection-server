const Router = require("express");
const productsController = require("../Controller/productsController");

const router = Router();
router.get("/", productsController.getProducts);
router.get("/lazyloading/:page/:limit", productsController.productsLazyloading);
router.get("/unique/:id", productsController.getUniqueProduct);
router.post("/create", productsController.createProduct);
router.put("/update/:id", productsController.updateProduct);
router.delete("/delete/:id", productsController.deleteProduct);

module.exports = router;
