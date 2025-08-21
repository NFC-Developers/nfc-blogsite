// src/app/pages/api/posts/create.js
import prisma from '@/lib/prisma.js'
import { requireAuth } from '@/middlewares/auth.js'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { title, description, content, tags, rating, isExplicit } = req.body

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' })
  }

  try {
    // 1️⃣ Ensure user exists
    let user = await prisma.user.findUnique({
      where: { firebaseUid: req.user.uid },
      select: { id: true },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: req.user.uid,
          email: req.user.email || `${req.user.uid}@placeholder.local`,
        },
      })
    }

    // 2️⃣ Ensure all categories exist
    const categoryMap = {} // categoryName -> categoryId
    for (const t of tags || []) {
      if (!t.categoryName) continue
      if (!categoryMap[t.categoryName]) {
        const category = await prisma.tagCategory.upsert({
          where: { name: t.categoryName },
          update: {},
          create: { name: t.categoryName },
        })
        categoryMap[t.categoryName] = category.id
      }
    }

    const tagsData = []
    for (const t of tags || []) {
      const category = await prisma.tagCategory.upsert({
        where: { name: t.categoryName },
        update: {},
        create: { name: t.categoryName },
      })

      tagsData.push({
        where: {
          name_categoryId: {
            name: t.name,
            categoryId: category.id,
          },
        },
        create: {
          name: t.name,
          categoryId: category.id,
        },
      })
    }

    const post = await prisma.post.create({
      data: {
        title,
        description: description || '',
        content,
        rating,
        isExplicit,
        author: { connect: { id: user.id } },
        tags: { connectOrCreate: tagsData },
      },
      include: { author: true, tags: true },
    })

    return res.status(201).json(post)
  } catch (err) {
    console.error('Error creating post:', err)
    return res
      .status(500)
      .json({ error: 'Could not create post', details: err.message })
  }
}

// Wrap handler with authentication middleware
export default requireAuth(handler)
