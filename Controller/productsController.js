const prisma = require("../DB/db.config");
// get products
exports.getProducts = async (req, res) => {
  console.log("Hello Products");
  try {
    const result = await prisma.products.findMany({
      orderBy: {
        product_id: "desc",
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.productsLazyloading = async (req, res) => {
  const { page, limit } = req.params;
  const pageNumber = parseInt(page, 10);
  const pageLimit = parseInt(limit, 10);

  if (isNaN(pageNumber) || isNaN(pageLimit)) {
    return res.status(400).json({ error: "Invalid page or limit" });
  }

  try {
    const skip = (pageNumber - 1) * pageLimit;
    const result = await prisma.products.findMany({
      skip: skip,
      take: pageLimit,
      orderBy: {
        product_id: "desc",
      },
    });

    const count = await prisma.products.count();

    // Calculate total pages
    const totalPageNumbers = Math.ceil(count / pageLimit);

    // Send response with products, current page, and total pages
    return res.status(200).json({ result, page: pageNumber, totalPageNumbers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get unique
exports.getUniqueProduct = async (req, res) => {
  const product_id = Number(req.params.id);
  try {
    const result = await prisma.products.findFirst({
      where: {
        product_id,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// lazyloading
exports.getProductsByPage = async (req, res) => {
  const { page, limit } = req.params;
  try {
    const result = await prisma.products.findMany({
      skip: page * 10,
      take: limit,
      orderBy: {
        product_id: "desc",
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// create
exports.createProduct = async (req, res) => {
  // product_id, title, categories, collection,  prices, sizes, colors,  material, edition,  offer,  features, img,  images, stock_quantity, rating,  description, tags, visibility, is_available_product, is_featured_product,  created_at, updated_at,
  const data = req.body;
  console.log(data, "data");
  try {
    const ss = await prisma.products.create({
      data,
    });
    return res.status(200).json({ message: "Product created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// update
exports.updateProduct = async (req, res) => {
  // product_id, title, categories, collection,  prices, sizes, colors,  material, edition,  offer,  features, img,  images, stock_quantity, rating,  description, tags, visibility, is_available_product, is_featured_product,  created_at, updated_at,
  const product_id = Number(req.params.id);
  const data = req.body;
  try {
    const result = await prisma.products.update({
      where: {
        product_id,
      },
      data,
    });

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// delete
exports.deleteProduct = async (req, res) => {
  const product_id = Number(req.params.id);
  try {
    const result = await prisma.products.delete({
      where: {
        product_id,
      },
    });
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// --------------------------------------------//
// categories
exports.getCategories = async (req, res) => {
  try {
    const result = await prisma.categories.findMany();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.createCategory = async (req, res) => {
  const data = req.body;
  try {
    await prisma.categories.create({
      data,
    });
    return res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.updateCategory = async (req, res) => {
  const category_id = Number(req.params.category_id);
  const data = req.body;
  try {
    const result = await prisma.categories.update({
      where: {
        category_id,
      },
      data,
    });

    return res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.deleteCategory = async (req, res) => {
  const ids = req.body;
  try {
    await prisma.categories.deleteMany({
      where: {
        category_id: {
          in: ids,
        },
      },
    });

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// sizes
exports.getSizes = async (req, res) => {
  try {
    const result = await prisma.sizes.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.createSize = async (req, res) => {
  const data = req.body;
  try {
    await prisma.sizes.create({
      data,
    });
    return res.status(201).json({ message: "Size created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.updateSize = async (req, res) => {
  const size_id = Number(req.params.size_id);
  const data = req.body;
  try {
    const result = await prisma.sizes.update({
      where: {
        size_id,
      },
      data,
    });
    return res.status(200).json({ message: "Size updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.deleteSize = async (req, res) => {
  const ids = req.body;
  try {
    await prisma.sizes.deleteMany({
      where: {
        size_id: {
          in: ids,
        },
      },
    });
    return res.status(200).json({ message: "Size deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// colors
exports.getColors = async (req, res) => {
  try {
    const result = await prisma.colors.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.createColor = async (req, res) => {
  const data = req.body;
  try {
    await prisma.colors.create({
      data,
    });
    return res.status(201).json({ message: "Color created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.updateColor = async (req, res) => {
  const color_id = Number(req.params.color_id);
  const data = req.body;
  try {
    const result = await prisma.colors.update({
      where: {
        color_id,
      },
      data,
    });
    return res.status(200).json({ message: "Color updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.deleteColor = async (req, res) => {
  const ids = req.body;
  try {
    await prisma.colors.deleteMany({
      where: {
        color_id: {
          in: ids,
        },
      },
    });
    return res.status(200).json({ message: "Color deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// materials
exports.getMaterials = async (req, res) => {
  try {
    const result = await prisma.materials.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.createMaterial = async (req, res) => {
  const data = req.body;
  try {
    await prisma.materials.create({
      data,
    });
    return res.status(201).json({ message: "Material created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.updateMaterial = async (req, res) => {
  const material_id = Number(req.params.material_id);
  const data = req.body;
  try {
    const result = await prisma.materials.update({
      where: {
        material_id,
      },
      data,
    });
    return res.status(200).json({ message: "Material updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.deleteMaterial = async (req, res) => {
  const ids = req.body;
  try {
    await prisma.materials.deleteMany({
      where: {
        material_id: {
          in: ids,
        },
      },
    });
    return res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// edition
exports.getEditions = async (req, res) => {
  try {
    const result = await prisma.editions.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.createEdition = async (req, res) => {
  const data = req.body;
  try {
    await prisma.editions.create({
      data,
    });
    return res.status(201).json({ message: "Edition created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.updateEdition = async (req, res) => {
  const edition_id = Number(req.params.edition_id);
  const data = req.body;
  try {
    const result = await prisma.editions.update({
      where: {
        edition_id,
      },
      data,
    });
    return res.status(200).json({ message: "Edition updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.deleteEdition = async (req, res) => {
  const ids = req.body;
  try {
    await prisma.editions.deleteMany({
      where: {
        edition_id: {
          in: ids,
        },
      },
    });
    return res.status(200).json({ message: "Edition deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// features
exports.getFeatures = async (req, res) => {
  try {
    const result = await prisma.features.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.createFeature = async (req, res) => {
  const data = req.body;
  try {
    await prisma.features.create({
      data,
    });
    return res.status(201).json({ message: "Feature created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.updateFeature = async (req, res) => {
  const feature_id = Number(req.params.feature_id);
  const data = req.body;
  try {
    const result = await prisma.features.update({
      where: {
        feature_id,
      },
      data,
    });
    return res.status(200).json({ message: "Feature updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.deleteFeature = async (req, res) => {
  const ids = req.body;
  try {
    await prisma.features.deleteMany({
      where: {
        feature_id: {
          in: ids,
        },
      },
    });
    return res.status(200).json({ message: "Feature deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// collections
exports.getCollections = async (req, res) => {
  try {
    const result = await prisma.collections.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.createCollection = async (req, res) => {
  const data = req.body;
  try {
    await prisma.collections.create({
      data,
    });
    return res.status(201).json({ message: "Collection created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.updateCollection = async (req, res) => {
  const collection_id = Number(req.params.collection_id);
  const data = req.body;
  try {
    const result = await prisma.collections.update({
      where: {
        collection_id,
      },
      data,
    });
    return res.status(200).json({ message: "Collection updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.deleteCollection = async (req, res) => {
  const ids = req.body;
  try {
    await prisma.collections.deleteMany({
      where: {
        collection_id: {
          in: ids,
        },
      },
    });
    return res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// sections
exports.getSections = async (req, res) => {
  try {
    const result = await prisma.sections.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.createSection = async (req, res) => {
  const data = req.body;
  try {
    await prisma.sections.create({
      data,
    });
    return res.status(201).json({ message: "Section created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.updateSection = async (req, res) => {
  const section_id = Number(req.params.section_id);
  const data = req.body;
  try {
    const result = await prisma.sections.update({
      where: {
        section_id,
      },
      data,
    });
    return res.status(200).json({ message: "Section updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.deleteSection = async (req, res) => {
  const ids = req.body;
  try {
    await prisma.sections.deleteMany({
      where: {
        section_id: {
          in: ids,
        },
      },
    });
    return res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
