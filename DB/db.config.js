const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

async function main() {
  // ... you will write your Prisma Client queries here
}

prisma
  .$connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

module.exports = prisma;
