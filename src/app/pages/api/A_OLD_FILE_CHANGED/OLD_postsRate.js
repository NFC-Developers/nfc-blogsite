import express from "express";
import prisma from "../../lib/prisma.js";
import { requireAuth } from "../../middlewares/auth.js";

const router = express.Router();

router.post("/:id/rate", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  const userUid = req.user.uid;

  if (!rating || rating < 1 || rating > 5)
    return res.status(400).json({ error: "Rating must be 1-5" });

  try {
    const starRating = await prisma.starRating.upsert({
      where: { userId_postId: { userId: userUid, postId: id } },
      update: { rating },
      create: {
        rating,
        post: { connect: { id } },
        user: { connect: { firebaseUid: userUid } },
      },
    });

    res.status(201).json(starRating);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Could not rate post" });
  }
});

export default router;
