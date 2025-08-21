import express from "express";
import prisma from "../../lib/prisma.js";

const router = express.Router();

// GET all blogs
router.get("/", async (req, res) => {
  const blogs = await prisma.blog.findMany({ include: { owner: true } });
  res.json(blogs);
});

// GET single blog
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: { owner: true }
  });
  if (!blog) return res.status(404).json({ error: "Blog not found" });
  res.json(blog);
});

// CREATE blog
router.post("/", async (req, res) => {
  const { title, description, bannerUrl, ownerId } = req.body;
  if (!title || !ownerId) return res.status(400).json({ error: "Missing fields" });

  const blog = await prisma.blog.create({
    data: { title, description, bannerUrl, ownerId },
    include: { owner: true }
  });
  res.status(201).json(blog);
});

// UPDATE blog
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, bannerUrl } = req.body;
  try {
    const updated = await prisma.blog.update({
      where: { id },
      data: { title, description, bannerUrl },
      include: { owner: true }
    });
    res.json(updated);
  } catch {
    res.status(404).json({ error: "Blog not found" });
  }
});

// DELETE blog
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.blog.delete({ where: { id } });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: "Blog not found" });
  }
});

export default router;
