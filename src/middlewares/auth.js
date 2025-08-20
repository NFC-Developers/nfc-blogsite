import admin from '@/lib/firebaseAdmin.js'

export function requireAuth(handler) {
  return async (req, res) => {
    const header = req.headers.authorization
    if (!header) return res.status(401).json({ error: 'No token provided' })

    const token = header.replace('Bearer ', '')
    try {
      const decoded = await admin.auth().verifyIdToken(token)
      req.user = decoded
      return handler(req, res)
    } catch (err) {
      console.error('Auth error:', err)
      return res.status(401).json({ error: 'Invalid Firebase ID token' })
    }
  }
}
