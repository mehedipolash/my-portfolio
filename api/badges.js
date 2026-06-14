import { getDb, COLLECTIONS } from './_lib/db.js'
import { fetchCredlyBadges } from './_lib/credly.js'

// GET /api/badges — public. Returns cached badges; if the cache is empty it
// does a one-off live Credly fetch so the section is never blank.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const db = await getDb()
    const col = db.collection(COLLECTIONS.badges)
    let docs = await col.find({}).sort({ issuedAt: -1 }).toArray()

    if (!docs.length && process.env.CREDLY_USERNAME) {
      const live = await fetchCredlyBadges(process.env.CREDLY_USERNAME)
      if (live.length) {
        await col.bulkWrite(
          live.map((b) => ({
            updateOne: { filter: { id: b.id }, update: { $set: b }, upsert: true },
          }))
        )
        docs = live
      }
    }

    const badges = docs.map(({ _id, ...rest }) => rest)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).json({ badges })
  } catch (err) {
    return res.status(200).json({ badges: [], error: 'unavailable' })
  }
}
