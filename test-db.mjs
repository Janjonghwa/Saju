import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ["error", "warn"],
});

try {
  console.log("Connecting to:", process.env.DATABASE_URL?.replace(/:[^@]+@/, ":***@"));
  const result = await prisma.$queryRaw`SELECT 1 as ok`;
  console.log("DB_OK", JSON.stringify(result));
} catch (e) {
  console.log("DB_FAIL");
  console.log("Error code:", e.code);
  console.log("Error message:", e.message);
} finally {
  await prisma.$disconnect();
}
