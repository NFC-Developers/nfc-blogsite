import express from "express";
import prisma from "../../lib/prisma.js";

const router = express.Router();

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        title: true,
        description: true,
        rating: true,
        stars: true,
        createdAt: true,
        author: { select: { id: true, name: true } },
        tags: {
          select: {
            id: true,
            name: true,
            category: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ error: "Could not fetch post" });
  }
});



export default router;
