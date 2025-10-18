const prisma = require("../DB/db.config");
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  try {
    const access_token =
      req?.cookies?.access_token ||
      req?.body?.access_token ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!access_token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY);

    // optional: ensure the user still exists
    const email = decoded?.user?.email;
    if (!email) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await prisma.users.findFirst({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = verifyUser;
