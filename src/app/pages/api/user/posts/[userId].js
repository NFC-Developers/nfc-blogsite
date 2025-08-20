// src/app/pages/api/user/posts/[userId].js
import prisma from '@/lib/prisma.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { userId } = req.query

  try {
    const posts = await prisma.post.findMany({
      where: { author: { firebaseUid: userId } },
      include: { author: true, tags: true, comments: true },
      orderBy: { createdAt: 'desc' },
    })

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: 'No posts found for this user' })
    }

    return res.status(200).json(posts)
  } catch (err) {
    console.error('Error fetching user posts:', err)
    return res.status(500).json({ error: 'Could not fetch user posts' })
  }
}
