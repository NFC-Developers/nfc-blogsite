// src/app/pages/api/blogs/[id].js
import prisma from '@/lib/prisma.js'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { owner: true },
    })
    if (!blog) return res.status(404).json({ error: 'Blog not found' })
    return res.status(200).json(blog)
  }

  if (req.method === 'PUT') {
    const { title, description, bannerUrl } = req.body
    try {
      const updated = await prisma.blog.update({
        where: { id },
        data: { title, description, bannerUrl },
        include: { owner: true },
      })
      return res.status(200).json(updated)
    } catch {
      return res.status(404).json({ error: 'Blog not found' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.blog.delete({ where: { id } })
      return res.status(204).end()
    } catch {
      return res.status(404).json({ error: 'Blog not found' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
