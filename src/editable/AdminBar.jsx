import { useState, useEffect } from 'react'
import { useEditable } from './EditableContext'
import './editable.css'

/* ================================================================
   Barre d'administration (cachee par defaut)
   ----------------------------------------------------------------
   - Reveler / masquer : Ctrl+Shift+E  (ou #admin dans l'URL)
   - Connexion par mot de passe (ADMIN_PASSWORD cote Vercel)
   - Bascule du mode edition ON/OFF
   - Indicateur d'enregistrement + reinitialisation
   ================================================================ */

export default function AdminBar() {
  const { editMode, setEditMode, loggedIn, login, logout, status, resetAll, fetchSignups, fetchFranchise } = useEditable()
  const [visible, setVisible] = useState(() =>
    typeof window !== 'undefined' && window.location.hash === '#admin'
  )
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // Raccourci clavier pour reveler la barre
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault()
        setVisible((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!visible) return null

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const ok = await login(pw)
      if (!ok) setError('Mot de passe incorrect.')
      else setPw('')
    } catch {
      setError('Serveur indisponible (lancez « vercel dev » en local).')
    } finally {
      setBusy(false)
    }
  }

  const downloadCsv = (rows, headers, filename, emptyMsg) => {
    if (rows === null) { window.alert('Recuperation impossible (mot de passe ou serveur).'); return }
    if (rows.length === 0) { window.alert(emptyMsg); return }
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const csv = [
      headers.join(','),
      ...rows.map((r) => headers.map((h) => esc(r[h])).join(',')),
    ].join('\r\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportSignups = async () => {
    const rows = await fetchSignups()
    downloadCsv(rows, ['date', 'firstName', 'surname', 'email', 'birthday', 'favRestaurant'],
      'inscriptions-smashsmash.csv', 'Aucune inscription pour le moment.')
  }

  const handleExportFranchise = async () => {
    const rows = await fetchFranchise()
    downloadCsv(rows, ['date', 'firstName', 'lastName', 'email', 'phone', 'city', 'investment', 'experience', 'message'],
      'candidatures-franchise.csv', 'Aucune candidature pour le moment.')
  }

  const statusLabel = {
    idle: '',
    saving: 'Enregistrement…',
    saved: 'Enregistre ✓',
    error: 'Erreur d\'enregistrement',
  }[status]

  return (
    <div className="admin-bar">
      <div className="admin-bar-brand">
        <span className="admin-bar-dot" />
        Edition SmashSmash
      </div>

      {!loggedIn ? (
        <form className="admin-bar-login" onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Mot de passe"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoFocus
          />
          <button type="submit" disabled={busy || !pw}>
            {busy ? '…' : 'Connexion'}
          </button>
          {error && <span className="admin-bar-error">{error}</span>}
        </form>
      ) : (
        <div className="admin-bar-controls">
          <button
            className={`admin-bar-toggle ${editMode ? 'is-on' : ''}`}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? '● Edition activee' : '○ Activer l\'edition'}
          </button>

          {statusLabel && (
            <span className={`admin-bar-status admin-bar-status--${status}`}>{statusLabel}</span>
          )}

          <button className="admin-bar-reset" onClick={handleExportSignups}>
            Inscriptions (CSV)
          </button>

          <button className="admin-bar-reset" onClick={handleExportFranchise}>
            Candidatures (CSV)
          </button>

          <button
            className="admin-bar-reset"
            onClick={() => {
              if (window.confirm('Reinitialiser TOUS les textes a leur valeur d\'origine ?')) resetAll()
            }}
          >
            Tout reinitialiser
          </button>

          <button className="admin-bar-logout" onClick={logout}>Deconnexion</button>
        </div>
      )}

      <button className="admin-bar-close" onClick={() => setVisible(false)} aria-label="Fermer">×</button>
    </div>
  )
}
