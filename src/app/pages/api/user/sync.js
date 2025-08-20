// src/app/pages/api/user/sync.js
import prisma from '@/lib/prisma.js'
import { requireAuth } from '@/middlewares/auth.js'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { name, description, birthdate } = req.body
  const email = req.user.email

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
    })

    return res.status(201).json(user)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Could not sync user' })
  }
}

export default requireAuth(handler)
