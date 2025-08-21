// src/app/pages/api/user/posts/me.js
import prisma from '@/lib/prisma.js'
import { requireAuth } from '@/middlewares/auth.js'

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const posts = await prisma.post.findMany({
      where: { author: { firebaseUid: req.user.uid } },
      include: { author: true, tags: true, comments: true },
      orderBy: { createdAt: 'desc' },
    })
    return res.status(200).json(posts)
  } catch (err) {
    console.error('Error fetching posts:', err)
    return res.status(500).json({ error: 'Could not fetch your posts' })
  }
}

export default requireAuth(handler)
