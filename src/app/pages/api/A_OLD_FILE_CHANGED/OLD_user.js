import express from "express";
import prisma from "../../lib/prisma.js";
import { requireAuth } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/me", requireAuth, async (req, res) => {
  const me = await prisma.user.findUnique({
    where: { firebaseUid: req.user.uid },
    include: { posts: true, blogs: true, followers: true, following: true },
  });
  if (!me) return res.status(404).json({ error: "User not found" });
  res.json(me);
});

router.post("/sync", requireAuth, async (req, res) => {
  const { name, description, birthdate } = req.body;
  const email = req.user.email;

  try {
    const user = await prisma.user.upsert({
      where: { firebaseUid: req.user.uid },
      update: { name, description, birthdate },
      create: {
        firebaseUid: req.user.uid,
        email: email || `${req.user.uid}@placeholder.local`,
        name,
        description,
        birthdate,
      },
    });
    res.status(201).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Could not sync user" });
  }
});

export default router;
