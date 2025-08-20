import prisma from '@/lib/prisma.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { postId } = req.query

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
    })

    if (!post) return res.status(404).json({ error: 'Post not found' })

    return res.status(200).json(post)
  } catch (err) {
    console.error('Error fetching post:', err)
    return res.status(500).json({ error: 'Could not fetch post' })
  }
}
