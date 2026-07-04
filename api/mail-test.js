/* ================================================================
   DIAGNOSTIC TEMPORAIRE — a retirer apres le test d'envoi.
   GET /api/mail-test : envoie un email de test et renvoie la
   reponse brute de Resend (statut + corps), sans exposer la cle.
   ================================================================ */
export default async function handler(req, res) {
  const key = process.env.RESEND_API_KEY
  const from = process.env.MAIL_FROM || 'SmashSmash <onboarding@resend.dev>'
  const to = process.env.MAIL_TO || 'contact@smashsmash.com'

  const out = { hasKey: !!key, from, to }
  if (!key) {
    out.error = 'RESEND_API_KEY absente'
    return res.status(200).json(out)
  }
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        subject: 'Test d\'envoi — SmashSmash',
        html: '<p>Ceci est un email de test automatique. Si vous le recevez, la configuration Resend fonctionne.</p>',
      }),
    })
    out.resendStatus = r.status
    out.resendBody = (await r.text()).slice(0, 500)
  } catch (e) {
    out.error = e?.message || String(e)
  }
  res.setHeader('Cache-Control', 'no-store')
  return res.status(200).json(out)
}
