import { neon } from '@neondatabase/serverless'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name } = req.body ?? {}
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required' })
  }

  const trimmed = name.trim()
  const sql = neon(process.env.DATABASE_URL)

  try {
    const rows = await sql`SELECT id FROM guests WHERE name = ${trimmed}`
    if (rows.length === 0) {
      return res.status(400).json({ error: 'Guest not found' })
    }

    await sql`
      INSERT INTO rsvps (guest_name)
      VALUES (${trimmed})
      ON CONFLICT (guest_name) DO UPDATE SET confirmed_at = NOW()
    `

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[POST /api/rsvp]', err)
    res.status(500).json({ error: 'Failed to save RSVP' })
  }
}
