import prisma from '@/lib/prisma.js'
import { requireAuth } from '@/middlewares/auth.js'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { id } = req.query
  const { rating } = req.body
  const userUid = req.user.uid

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be 1-5' })
  }

  try {
    const starRating = await prisma.starRating.upsert({
      where: { userId_postId: { userId: userUid, postId: id } },
      update: { rating },
      create: {
        rating,
        post: { connect: { id } },
        user: { connect: { firebaseUid: userUid } },
      },
    })

    return res.status(201).json(starRating)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Could not rate post' })
  }
}

export default requireAuth(handler)
