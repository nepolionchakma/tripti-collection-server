const prisma = require("../DB/db.config");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client();

const verifyUser = async (req, res, next) => {
  try {
    const access_token =
      req?.cookies?.access_token ||
      req?.body?.access_token ||
      req.header("Authorization")?.replace("Bearer ", "");
    // console.log(access_token, "access token");
    const ticket = await client.getTokenInfo(access_token);
    if (ticket.email) {
      const user = await prisma.users.findFirst({
        where: {
          email: ticket.email,
        },
      });

      const token = user.access_token === access_token;
      if (token) {
        next();
      }
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = verifyUser;
