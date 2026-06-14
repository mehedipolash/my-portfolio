import bcrypt from 'bcryptjs'
import { signToken } from './_lib/auth.js'

// POST /api/login { email, password } -> { token }
// Single-admin: credentials come from env. Password is stored as a bcrypt hash
// (ADMIN_PASSWORD_HASH) so the plaintext never lives in config.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const { email, password } = body

  const adminEmail = process.env.ADMIN_EMAIL
  const hash = process.env.ADMIN_PASSWORD_HASH
  if (!adminEmail || !hash) {
    return res.status(500).json({ error: 'Admin credentials not configured' })
  }

  const emailOk = String(email || '').toLowerCase() === adminEmail.toLowerCase()
  const passOk = emailOk && (await bcrypt.compare(String(password || ''), hash))

  // Constant-ish response regardless of which check failed.
  if (!emailOk || !passOk) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = signToken({ role: 'admin', email: adminEmail })
  return res.status(200).json({ token })
}
