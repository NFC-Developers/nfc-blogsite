// src/app/pages/api/blogs/index.js
import prisma from '@/lib/prisma.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const blogs = await prisma.blog.findMany({ include: { owner: true } })
    return res.status(200).json(blogs)
  }

  if (req.method === 'POST') {
    const { title, description, bannerUrl, ownerId } = req.body
    if (!title || !ownerId) return res.status(400).json({ error: 'Missing fields' })

    const blog = await prisma.blog.create({
      data: { title, description, bannerUrl, ownerId },
      include: { owner: true },
    })
    return res.status(201).json(blog)
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
