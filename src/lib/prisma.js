import { PrismaClient } from "@prisma/client";

let prisma;

if (global.prisma) {
  prisma = global.prisma;
} else {
  prisma = new PrismaClient({ log: ["query"] });
  if (process.env.NODE_ENV !== "production") global.prisma = prisma;
}

export default prisma;
