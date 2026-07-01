import { put, list } from '@vercel/blob'

/* ================================================================
   API /api/signups  —  Inscriptions au concours "Gagnez un repas"
   ----------------------------------------------------------------
   POST (public)  { firstName, surname, email, birthday, favRestaurant }
                  -> ajoute une inscription
   POST (protege) { action:'list', password }
                  -> renvoie toutes les inscriptions (pour l'editeur)
   ----------------------------------------------------------------
   Stockage : blob prive signups.json (meme mecanique que les textes).
   ================================================================ */

const BLOB_PATH = 'signups.json'
const ACCESS = 'private'

async function readSignups() {
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

async function writeSignups(arr) {
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
      return res.status(200).json({ signups: await readSignups() })
    } catch (e) {
      return res.status(500).json({ error: e?.message || 'Erreur de lecture.' })
    }
  }

  // ----- Nouvelle inscription (public) -----
  const { firstName, surname, email, birthday, favRestaurant } = body
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Email invalide.' })
  }
  const entry = {
    firstName: String(firstName || '').slice(0, 100),
    surname: String(surname || '').slice(0, 100),
    email: String(email).slice(0, 200),
    birthday: String(birthday || '').slice(0, 20),
    favRestaurant: String(favRestaurant || '').slice(0, 100),
    date: new Date().toISOString(),
  }
  try {
    const arr = await readSignups()
    arr.push(entry)
    await writeSignups(arr)
    return res.status(200).json({ ok: true })
  } catch (e) {
    return res.status(500).json({ error: e?.message || 'Erreur d\'enregistrement.' })
  }
}
