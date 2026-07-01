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
  const { editMode, setEditMode, loggedIn, login, logout, status, resetAll } = useEditable()
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
