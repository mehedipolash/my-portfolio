// Fetches public badges from a Credly profile via Credly's public JSON endpoint.
// Cisco / NetAcad badges appear here once linked to the Credly account.
// CREDLY_USERNAME is the vanity slug from https://www.credly.com/users/<slug>
export async function fetchCredlyBadges(username) {
  if (!username) return []

  const url = `https://www.credly.com/users/${encodeURIComponent(username)}/badges.json`
  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'User-Agent': 'portfolio-badge-sync' },
  })
  if (!res.ok) throw new Error(`Credly responded ${res.status}`)

  const json = await res.json()
  const items = Array.isArray(json?.data) ? json.data : []

  return items
    .map((b) => {
      const t = b.badge_template || {}
      return {
        id: b.id,
        name: t.name || 'Badge',
        issuer: t.issuer?.entities?.[0]?.entity?.name || t.issuer?.name || 'Issuer',
        image: t.image_url || b.image_url || '',
        url: b.id ? `https://www.credly.com/badges/${b.id}/public_url` : '',
        issuedAt: b.issued_at_date || b.issued_at || null,
      }
    })
    .filter((b) => b.name)
}
