// src/app/pages/api/user/posts/create.js
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
    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.user.uid },
      select: { firebaseUid: true },
    })
    if (!user) return res.status(403).json({ error: 'User not registered' })

    // Step 1: Ensure categories exist
    const categoriesMap = {}
    if (Array.isArray(tags)) {
      for (const tag of tags) {
        if (tag.categoryName) {
          const category = await prisma.tagCategory.upsert({
            where: { name: tag.categoryName },
            update: {},
            create: { name: tag.categoryName },
          })
          categoriesMap[tag.categoryName] = category.id
        }
      }
    }

    // Step 2: Build connectOrCreate for tags
    const tagsData = Array.isArray(tags)
      ? tags
          .filter(tag => tag.name && tag.categoryName)
          .map(tag => ({
            where: {
              name_categoryId: {
                name: tag.name,
                categoryId: categoriesMap[tag.categoryName],
              },
            },
            create: {
              name: tag.name,
              category: { connect: { id: categoriesMap[tag.categoryName] } },
            },
          }))
      : []

    // Step 3: Create the post
    const post = await prisma.post.create({
      data: {
        title,
        description: description || '',
        content,
        rating: rating || 'GENERAL',
        isExplicit: !!isExplicit,
        author: { connect: { firebaseUid: req.user.uid } },
        tags: { connectOrCreate: tagsData },
      },
      include: { author: true, tags: true },
    })

    return res.status(201).json(post)
  } catch (err) {
    console.error('Error creating post:', err)
    return res.status(500).json({ error: 'Could not create post' })
  }
}

export default requireAuth(handler)
