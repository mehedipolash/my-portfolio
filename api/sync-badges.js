import { getDb, COLLECTIONS } from './_lib/db.js'
import { fetchCredlyBadges } from './_lib/credly.js'
import { getAuth } from './_lib/auth.js'

// POST/GET /api/sync-badges — refreshes the badge cache from Credly.
// Authorized either by an admin JWT (manual "Sync now" button) or by the
// Vercel Cron secret header (scheduled daily run).
export default async function handler(req, res) {
  // Vercel Cron sends the `x-vercel-cron` header; we also accept an explicit
  // bearer secret for manual/curl triggering.
  const isCron =
    Boolean(req.headers['x-vercel-cron']) ||
    (process.env.CRON_SECRET &&
      req.headers['authorization'] === `Bearer ${process.env.CRON_SECRET}`)
  const isAdmin = getAuth(req)?.role === 'admin'
  if (!isCron && !isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const username = process.env.CREDLY_USERNAME
  if (!username) return res.status(400).json({ error: 'CREDLY_USERNAME not configured' })

  try {
    const live = await fetchCredlyBadges(username)
    const db = await getDb()
    const col = db.collection(COLLECTIONS.badges)

    if (live.length) {
      await col.bulkWrite(
        live.map((b) => ({
          updateOne: { filter: { id: b.id }, update: { $set: b }, upsert: true },
        }))
      )
      // Drop badges no longer present on the Credly profile.
      const ids = live.map((b) => b.id)
      await col.deleteMany({ id: { $nin: ids } })
    }

    return res.status(200).json({ synced: live.length })
  } catch (err) {
    return res.status(502).json({ error: 'Credly sync failed', detail: String(err.message) })
  }
}
