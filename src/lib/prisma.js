import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

// Avoid logging every SQL query in the console to reduce noisy dev output.
// If you need query logs temporarily, enable them locally.
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
