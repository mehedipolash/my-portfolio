import { getDb, COLLECTIONS } from './_lib/db.js'
import { getAuth } from './_lib/auth.js'

// GET  /api/content        — public, returns the editable content document.
// PUT  /api/content (auth) — admin replaces the content document.
export default async function handler(req, res) {
  try {
    const db = await getDb()
    const col = db.collection(COLLECTIONS.content)

    if (req.method === 'GET') {
      const doc = await col.findOne({ _id: 'site' })
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600')
      return res.status(200).json(doc ? stripId(doc) : {})
    }

    if (req.method === 'PUT') {
      if (getAuth(req)?.role !== 'admin') return res.status(401).json({ error: 'Unauthorized' })
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
      const allowed = {
        experience: body.experience,
        projects: body.projects,
        skillGroups: body.skillGroups,
        profile: body.profile,
        updatedAt: new Date().toISOString(),
      }
      await col.updateOne({ _id: 'site' }, { $set: allowed }, { upsert: true })
      return res.status(200).json({ ok: true })
    }

    res.setHeader('Allow', 'GET, PUT')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    if (req.method === 'GET') return res.status(200).json({})
    return res.status(500).json({ error: String(err.message) })
  }
}

function stripId({ _id, ...rest }) {
  return rest
}
