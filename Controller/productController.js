const prisma = require("../DB/db.config");
exports.getProducts = async (req, res) => {
  try {
    const result = await prisma.test.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
