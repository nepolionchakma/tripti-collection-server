const prisma = require("../DB/db.config");
// get products
exports.getProducts = async (req, res) => {
  try {
    const result = await prisma.products.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// get unique
exports.getUniqueProduct = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await prisma.products.findFirst({
      where: {
        id,
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
        id: "desc",
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// create
exports.createProduct = async (req, res) => {
  const data = req.body;
  try {
    const result = await prisma.products.create({
      data,
    });
    console.log(result, "result");
    return res.status(200).json({ message: "Product created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// update
exports.updateProduct = async (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;
  try {
    const result = await prisma.products.update({
      where: {
        id,
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
  const id = Number(req.params.id);
  try {
    const result = await prisma.products.delete({
      where: {
        id,
      },
    });
    console.log(result, "result");
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
