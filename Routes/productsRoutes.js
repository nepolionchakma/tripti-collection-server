const Router = require("express");
const productsController = require("../Controller/productsController");

const router = Router();
router.get("/", productsController.getProducts);
router.get("/lazyloading/:page/:limit", productsController.productsLazyloading);
router.get("/unique/:id", productsController.getUniqueProduct);
router.post("/create", productsController.createProduct);
router.put("/update/:id", productsController.updateProduct);
router.delete("/delete/:id", productsController.deleteProduct);

// categories
router.get("/categories", productsController.getCategories);
router.post("/categories/create", productsController.createCategory);
router.put(
  "/categories/update/:category_id",
  productsController.updateCategory
);
router.delete("/categories/delete", productsController.deleteCategory);

// sizes
router.get("/sizes", productsController.getSizes);
router.post("/sizes/create", productsController.createSize);
router.put("/sizes/update/:size_id", productsController.updateSize);
router.delete("/sizes/delete", productsController.deleteSize);

// colors
router.get("/colors", productsController.getColors);
router.post("/colors/create", productsController.createColor);
router.put("/colors/update/:color_id", productsController.updateColor);
router.delete("/colors/delete", productsController.deleteColor);

// materials
router.get("/materials", productsController.getMaterials);
router.post("/materials/create", productsController.createMaterial);
router.put("/materials/update/:material_id", productsController.updateMaterial);
router.delete("/materials/delete", productsController.deleteMaterial);

// editions
router.get("/editions", productsController.getEditions);
router.post("/editions/create", productsController.createEdition);
router.put("/editions/update/:edition_id", productsController.updateEdition);
router.delete("/editions/delete", productsController.deleteEdition);

// features
router.get("/features", productsController.getFeatures);
router.post("/features/create", productsController.createFeature);
router.put("/features/update/:feature_id", productsController.updateFeature);
router.delete("/features/delete", productsController.deleteFeature);

// collections
router.get("/collections", productsController.getCollections);
router.post("/collections/create", productsController.createCollection);
router.put(
  "/collections/update/:collection_id",
  productsController.updateCollection
);
router.delete("/collections/delete", productsController.deleteCollection);

// sections
router.get("/sections", productsController.getSections);
router.post("/sections/create", productsController.createSection);
router.put("/sections/update/:section_id", productsController.updateSection);
router.delete("/sections/delete", productsController.deleteSection);

module.exports = router;
