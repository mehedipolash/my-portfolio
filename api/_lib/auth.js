import jwt from 'jsonwebtoken'

const SECRET = () => {
  const s = process.env.JWT_SECRET
  if (!s) throw new Error('JWT_SECRET is not set')
  return s
}

export function signToken(payload) {
  return jwt.sign(payload, SECRET(), { expiresIn: '7d' })
}

// Returns the decoded token if the request carries a valid admin JWT, else null.
export function getAuth(req) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return null
  try {
    return jwt.verify(token, SECRET())
  } catch {
    return null
  }
}

// Guard helper for protected routes. Returns true if authorized; otherwise
// writes a 401 and returns false.
export function requireAuth(req, res) {
  const auth = getAuth(req)
  if (!auth || auth.role !== 'admin') {
    res.status(401).json({ error: 'Unauthorized' })
    return false
  }
  return true
}
