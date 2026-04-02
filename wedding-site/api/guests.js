import { neon } from '@neondatabase/serverless'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  try {
    const sql = neon(process.env.DATABASE_URL)
    const rows = await sql`SELECT name FROM guests ORDER BY name ASC`
    res.status(200).json({ guests: rows.map((r) => r.name) })
  } catch (err) {
    console.error('[GET /api/guests]', err)
    res.status(500).json({ error: 'Failed to fetch guest list' })
  }
}
