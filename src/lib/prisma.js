import { PrismaClient, Prisma } from "@prisma/client";
import path from "path";
import fs from "fs";

const globalForPrisma = globalThis;

// Development fallback: if DATABASE_URL isn't set, use default SQLite path
if (!process.env.DATABASE_URL && process.env.NODE_ENV !== "production") {
  // Find repository root by walking up until we find package.json
  function findRepoRoot(startDir) {
    let current = startDir;
    for (let i = 0; i < 10; i++) {
      if (fs.existsSync(path.join(current, "package.json"))) {
        return current;
      }
      const parent = path.dirname(current);
      if (parent === current) break;
      current = parent;
    }
    return startDir;
  }

  const repoRoot = findRepoRoot(process.cwd());
  const dbPath = path.join(repoRoot, "src", "prisma", "dev.db");
  process.env.DATABASE_URL = `file:${dbPath}`;
  
  if (process.env.NODE_ENV !== "production") {
    console.log("Using dev DATABASE_URL:", process.env.DATABASE_URL);
  }
}

// Normalize DATABASE_URL if needed
if (process.env.DATABASE_URL && process.env.NODE_ENV !== "production") {
  let rawUrl = process.env.DATABASE_URL;
  
  // Remove quotes if present
  if ((rawUrl.startsWith('"') && rawUrl.endsWith('"')) || 
      (rawUrl.startsWith("'") && rawUrl.endsWith("'"))) {
    rawUrl = rawUrl.slice(1, -1);
  }

  // Handle file URLs with relative paths
  if (rawUrl.startsWith("file:")) {
    let filePath = rawUrl.slice(5); // Remove "file:" prefix
    
    if (!path.isAbsolute(filePath)) {
      const repoRoot = findRepoRoot(process.cwd());
      const resolvedPath = path.resolve(repoRoot, filePath.replace(/^\.\//, ""));
      process.env.DATABASE_URL = `file:${resolvedPath}`;
      console.log("Normalized DATABASE_URL to:", process.env.DATABASE_URL);
    }
  } else if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(rawUrl)) {
    // No protocol detected, assume it's a file path
    const repoRoot = findRepoRoot(process.cwd());
    const resolvedPath = path.isAbsolute(rawUrl) ? rawUrl : path.resolve(repoRoot, rawUrl.replace(/^\.\//, ""));
    process.env.DATABASE_URL = `file:${resolvedPath}`;
    console.log("Normalized DATABASE_URL to:", process.env.DATABASE_URL);
  }
  
  function findRepoRoot(startDir) {
    let current = startDir;
    for (let i = 0; i < 10; i++) {
      if (fs.existsSync(path.join(current, "package.json"))) {
        return current;
      }
      const parent = path.dirname(current);
      if (parent === current) break;
      current = parent;
    }
    return startDir;
  }
}

// Create Prisma client instance
let prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
});

// Ensure we have a working client instance
if (typeof prisma.$use !== 'function') {
  try {
    const fresh = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
    });
    prisma = fresh;
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prisma;
    }
  } catch (e) {
    console.warn('Prisma client initialization warning:', e?.message || e);
  }
}

// Add middleware for graceful error handling
if (typeof prisma.$use === 'function') {
  prisma.$use(async (params, next) => {
    try {
      return await next(params);
    } catch (err) {
      // Handle missing schema/table errors (P2021)
      const isKnownError = err instanceof Prisma.PrismaClientKnownRequestError;
      const errorCode = isKnownError ? err.code : err?.code || err?.meta?.code;

      if (errorCode === "P2021") {
        if (!globalForPrisma._prismaSchemaMissingWarned) {
          console.warn(
            "Prisma schema/tables not found (P2021). Run 'npx prisma db push' to create the database schema."
          );
          globalForPrisma._prismaSchemaMissingWarned = true;
        }

        // Return safe defaults for read operations
        const action = params.action;
        if (action === "findMany") return [];
        if (action === "count") return 0;
        if (action === "aggregate") return {};
        if (action === "findUnique" || action === "findFirst") return null;
      }

      throw err;
    }
  });
}

export default prisma;
