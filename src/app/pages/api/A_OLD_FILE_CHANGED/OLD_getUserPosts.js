import express from "express";
import prisma from "../../../lib/prisma.js";
import { requireAuth } from "../../../middlewares/auth.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await prisma.post.findMany({
      where: { author: { firebaseUid: userId } },
      include: { author: true, tags: true, comments: true },
      orderBy: { createdAt: "desc" },
    });

    if (!posts) return res.status(404).json({ error: "No posts found for this user" });

    res.json(posts);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    res.status(500).json({ error: "Could not fetch user posts" });
  }
});

export default router;
