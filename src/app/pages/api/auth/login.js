import admin from '@/lib/firebaseAdmin.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const user = await admin.auth().getUserByEmail(email)
    const customToken = await admin.auth().createCustomToken(user.uid)
    return res.status(200).json({ token: customToken })
  } catch (err) {
    console.error('Login error:', err)
    return res
      .status(401)
      .json({ error: 'User not found or cannot create token' })
  }
}
