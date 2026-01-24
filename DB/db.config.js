const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

prisma
  .$connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });

module.exports = prisma;
