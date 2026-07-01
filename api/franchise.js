import { put, list } from '@vercel/blob'

/* ================================================================
   API /api/franchise  —  Candidatures franchise
   ----------------------------------------------------------------
   POST (public)  { firstName, lastName, email, phone, city,
                    investment, experience, message }
                  -> enregistre une candidature
   POST (protege) { action:'list', password }
                  -> renvoie toutes les candidatures (pour l'editeur)
   ----------------------------------------------------------------
   Stockage : blob prive franchise.json.
   ================================================================ */

const BLOB_PATH = 'franchise.json'
const ACCESS = 'private'

async function readAll() {
  const { blobs } = await list({ prefix: BLOB_PATH, limit: 1 })
  const found = blobs.find((b) => b.pathname === BLOB_PATH)
  if (!found) return []
  const r = await fetch(found.url, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
  })
  if (!r.ok) return []
  const data = await r.json()
  return Array.isArray(data) ? data : []
}

async function writeAll(arr) {
  return put(BLOB_PATH, JSON.stringify(arr), {
    access: ACCESS,
    contentType: 'application/json',
    allowOverwrite: true,
    addRandomSuffix: false,
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end()
  }

  const body = req.body || {}

  // ----- Consultation protegee (editeur) -----
  if (body.action === 'list') {
    if (!process.env.ADMIN_PASSWORD || body.password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Non autorise.' })
    }
    try {
      return res.status(200).json({ applications: await readAll() })
    } catch (e) {
      return res.status(500).json({ error: e?.message || 'Erreur de lecture.' })
    }
  }

  // ----- Nouvelle candidature (public) -----
  const { firstName, lastName, email, phone, city, investment, experience, message } = body
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Email invalide.' })
  }
  const s = (v, n) => String(v ?? '').slice(0, n)
  const entry = {
    firstName: s(firstName, 100),
    lastName: s(lastName, 100),
    email: s(email, 200),
    phone: s(phone, 40),
    city: s(city, 120),
    investment: s(investment, 40),
    experience: s(experience, 40),
    message: s(message, 4000),
    date: new Date().toISOString(),
  }
  try {
    const arr = await readAll()
    arr.push(entry)
    await writeAll(arr)
    return res.status(200).json({ ok: true })
  } catch (e) {
    return res.status(500).json({ error: e?.message || 'Erreur d\'enregistrement.' })
  }
}
