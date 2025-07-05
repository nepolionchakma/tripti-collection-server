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
    console.log(result, "result");
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
    console.log(result, "result");
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
