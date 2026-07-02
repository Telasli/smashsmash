/* ================================================================
   Envoi d'email via l'API Resend (best-effort)
   ----------------------------------------------------------------
   Variables d'environnement :
   - RESEND_API_KEY : cle API Resend (Vercel Marketplace -> Resend)
   - MAIL_TO        : destinataire (defaut contact@smashsmash.com)
   - MAIL_FROM      : expediteur (defaut onboarding@resend.dev)
                      -> pour envoyer vers une adresse quelconque, il
                         faut un domaine verifie dans Resend et mettre
                         ici une adresse de ce domaine.
   Si RESEND_API_KEY est absente, l'envoi est simplement ignore
   (la soumission reste enregistree dans le Blob).
   ================================================================ */

const esc = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

export function buildTable(title, fields) {
  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 14px;background:#f4f4f4;font-weight:600;white-space:nowrap;vertical-align:top">${esc(label)}</td>` +
        `<td style="padding:8px 14px;vertical-align:top">${esc(value) || '—'}</td></tr>`
    )
    .join('')
  return (
    `<div style="font-family:Arial,Helvetica,sans-serif;color:#000106;max-width:640px">` +
    `<h2 style="color:#50AF46;margin:0 0 16px">${esc(title)}</h2>` +
    `<table style="border-collapse:collapse;width:100%;border:1px solid #e5e5e5">${rows}</table>` +
    `<p style="color:#888;font-size:12px;margin-top:16px">Envoye automatiquement depuis smashsmash.com</p>` +
    `</div>`
  )
}

export async function sendMail({ subject, html, replyTo }) {
  const key = process.env.RESEND_API_KEY
  if (!key) return { skipped: true }
  const to = process.env.MAIL_TO || 'contact@smashsmash.com'
  const from = process.env.MAIL_FROM || 'SmashSmash <onboarding@resend.dev>'
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
    })
    return { ok: res.ok }
  } catch {
    return { ok: false }
  }
}
