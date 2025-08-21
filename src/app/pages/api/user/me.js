// src/app/pages/api/user/me.js
import prisma from '@/lib/prisma.js'
import { requireAuth } from '@/middlewares/auth.js'

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const me = await prisma.user.findUnique({
      where: { firebaseUid: req.user.uid },
      include: { posts: true, blogs: true, followers: true, following: true },
    })

    if (!me) return res.status(404).json({ error: 'User not found' })

    return res.status(200).json(me)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Could not fetch user' })
  }
}

export default requireAuth(handler)
