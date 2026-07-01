import { put, list } from '@vercel/blob'

/* ================================================================
   API /api/texts  —  Stockage des textes editables (Vercel Blob)
   ----------------------------------------------------------------
   GET   -> renvoie le JSON des textes modifies (ou {} si aucun)
   POST  -> { password, action:'verify' }        -> valide le mot de passe
            { password, texts:{...} }             -> enregistre les textes
   ----------------------------------------------------------------
   Variables d'environnement Vercel requises :
   - ADMIN_PASSWORD        : mot de passe de l'editeur (vous)
   - BLOB_READ_WRITE_TOKEN : injecte automatiquement quand un
                             store Blob est lie au projet
   ================================================================ */

const BLOB_PATH = 'site-texts.json'

export default async function handler(req, res) {
  // ----- Lecture publique des textes -----
  if (req.method === 'GET') {
    try {
      const { blobs } = await list({ prefix: BLOB_PATH, limit: 1 })
      const found = blobs.find((b) => b.pathname === BLOB_PATH)
      if (!found) {
        res.setHeader('Cache-Control', 'no-store')
        return res.status(200).json({})
      }
      const r = await fetch(found.url, { cache: 'no-store' })
      const data = await r.json()
      res.setHeader('Cache-Control', 'no-store')
      return res.status(200).json(data)
    } catch {
      // En cas d'erreur (store non configure, etc.) on renvoie vide :
      // le site affiche alors les textes par defaut, rien ne casse.
      res.setHeader('Cache-Control', 'no-store')
      return res.status(200).json({})
    }
  }

  // ----- Ecriture protegee -----
  if (req.method === 'POST') {
    const { password, texts, action } = req.body || {}

    if (!process.env.ADMIN_PASSWORD) {
      return res.status(500).json({ error: "ADMIN_PASSWORD n'est pas configure sur Vercel." })
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Mot de passe incorrect.' })
    }
    if (action === 'verify') {
      return res.status(200).json({ ok: true })
    }
    if (typeof texts !== 'object' || texts === null || Array.isArray(texts)) {
      return res.status(400).json({ error: 'Payload invalide.' })
    }

    try {
      await put(BLOB_PATH, JSON.stringify(texts), {
        access: 'public',
        contentType: 'application/json',
        allowOverwrite: true,
        addRandomSuffix: false,
      })
      return res.status(200).json({ ok: true, count: Object.keys(texts).length })
    } catch (e) {
      return res.status(500).json({ error: 'Echec de l\'enregistrement : ' + (e?.message || 'inconnu') })
    }
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).end()
}
