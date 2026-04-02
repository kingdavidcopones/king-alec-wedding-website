import { neon } from '@neondatabase/serverless'

const GUESTS = [
  // Principal Sponsors
  'Mark Martin', 'Lara Martin',
  'Macairog Santos Jr.', 'Mickey Santos',
  'George De Guzman', 'Lyn Laguisma',
  'Joseph Magtalas', 'Anne Magtalas',
  'Hepty Santos Jr.', 'Vivian Santos',
  'Mayette Acuna', 'Josephine Garcia',
  // Secondary Sponsors
  'Miguel Jerico Onofre', 'Nicole Laguisma',
  'Marc Arnold Mateo', 'Jiane Trishia Magtalas',
  'John Lenmer Laguisma', 'Marian Angelique Garcia',
  // Wedding Party
  'Eric Marc Martin',
  'Justin Lope', 'Lesther Laguisma', 'Justin Guevara',
  'Anton Geronimo', 'Aizen Paman', 'Rafael San Andres', 'Jed Bambo',
  'Rhoal Mica Esteban', 'Elijah Esteban',
  'Kimberly Dianne Copones',
  'Trisha Calucod',
  'Noelle Lim', 'Chin Wong', 'Kaye Atendido',
  'Chynna Esteban', 'Jaila Villacarlos', 'Bea Villanueva', 'Mikaela Onofre',
  // Kids
  'Julia Bagares', 'Zyreen Castillo', 'Francine Casino',
  'Blessie Marie Atendido', 'Jastine Javier', 'Micaiah Castroverde',
  'Ashzaira Rodriguez', 'Mischa Calison', 'Nika Tamayo',
  'Archie', 'Bruno',
]

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sql = neon(process.env.DATABASE_URL)

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS guests (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      )
    `
    await sql`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        guest_name TEXT NOT NULL UNIQUE,
        confirmed_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    let inserted = 0
    for (const name of GUESTS) {
      const result = await sql`
        INSERT INTO guests (name) VALUES (${name})
        ON CONFLICT (name) DO NOTHING
      `
      inserted += result.length
    }

    res.status(200).json({ ok: true, total: GUESTS.length, inserted })
  } catch (err) {
    console.error('[POST /api/seed]', err)
    res.status(500).json({ error: err.message })
  }
}
