const Router = require("express");
const productsController = require("../Controller/productsController");

const router = Router();
router.get("/", productsController.getProducts);
router.get("/lazyloading/:page/:limit", productsController.productsLazyloading);
router.get("/unique/:id", productsController.getUniqueProduct);
router.post("/create", productsController.createProduct);
router.put("/update/:id", productsController.updateProduct);
router.delete("/delete/:id", productsController.deleteProduct);

router.get("/categories", productsController.getCategories);
router.get("/sizes", productsController.getSizes);
router.get("/colors", productsController.getColors);
router.get("/materials", productsController.getMaterials);
router.get("/editions", productsController.getEditions);
router.get("/features", productsController.getFeatures);
router.get("/collections", productsController.getCollections);
router.get("/sections", productsController.getSections);

module.exports = router;
