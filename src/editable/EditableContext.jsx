import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

/* ================================================================
   Contexte d'edition des textes du site
   ----------------------------------------------------------------
   - Charge les textes modifies depuis /api/texts (Vercel Blob)
   - Cache local (localStorage) pour un affichage instantane + offline
   - Mode edition protege par mot de passe (verifie cote serveur)
   - Enregistrement automatique (debounce) de tous les textes
   ================================================================ */

const EditableContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useEditable = () => {
  const ctx = useContext(EditableContext)
  if (!ctx) throw new Error('useEditable doit etre utilise dans <EditableProvider>')
  return ctx
}

const LS_TEXTS = 'smashsmash_texts'
const SS_PASSWORD = 'smashsmash_admin_pw'

export function EditableProvider({ children }) {
  const [overrides, setOverrides] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_TEXTS)) || {} } catch { return {} }
  })
  const [editMode, setEditMode] = useState(false)
  const [password, setPassword] = useState(() => sessionStorage.getItem(SS_PASSWORD) || '')
  const [loggedIn, setLoggedIn] = useState(false)
  const [status, setStatus] = useState('idle') // idle | saving | saved | error

  const saveTimer = useRef(null)
  const overridesRef = useRef(overrides)
  overridesRef.current = overrides

  // ----- Chargement initial depuis le serveur -----
  useEffect(() => {
    let cancelled = false
    fetch('/api/texts')
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => {
        if (cancelled || !data || typeof data !== 'object') return
        setOverrides(data)
        try { localStorage.setItem(LS_TEXTS, JSON.stringify(data)) } catch { /* quota */ }
      })
      .catch(() => { /* hors-ligne / dev sans /api : on garde le cache local */ })
    return () => { cancelled = true }
  }, [])

  // ----- Reconnexion auto si mot de passe deja en session -----
  useEffect(() => {
    if (!password) return
    verifyPassword(password).then((ok) => setLoggedIn(ok)).catch(() => setLoggedIn(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getOverride = useCallback(
    (id) => (Object.prototype.hasOwnProperty.call(overrides, id) ? overrides[id] : null),
    [overrides]
  )

  // ----- Enregistrement (debounce) de l'ensemble des textes -----
  const scheduleSave = useCallback((nextOverrides) => {
    if (!password) return
    setStatus('saving')
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/texts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password, texts: nextOverrides }),
        })
        setStatus(res.ok ? 'saved' : 'error')
      } catch {
        setStatus('error')
      }
    }, 700)
  }, [password])

  const saveText = useCallback((id, value) => {
    setOverrides((prev) => {
      const next = { ...prev, [id]: value }
      try { localStorage.setItem(LS_TEXTS, JSON.stringify(next)) } catch { /* quota */ }
      scheduleSave(next)
      return next
    })
  }, [scheduleSave])

  const resetText = useCallback((id) => {
    setOverrides((prev) => {
      if (!Object.prototype.hasOwnProperty.call(prev, id)) return prev
      const next = { ...prev }
      delete next[id]
      try { localStorage.setItem(LS_TEXTS, JSON.stringify(next)) } catch { /* quota */ }
      scheduleSave(next)
      return next
    })
  }, [scheduleSave])

  const resetAll = useCallback(() => {
    setOverrides(() => {
      const next = {}
      try { localStorage.setItem(LS_TEXTS, JSON.stringify(next)) } catch { /* quota */ }
      scheduleSave(next)
      return next
    })
  }, [scheduleSave])

  // ----- Authentification -----
  async function verifyPassword(pw) {
    const res = await fetch('/api/texts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw, action: 'verify' }),
    })
    return res.ok
  }

  const login = useCallback(async (pw) => {
    const ok = await verifyPassword(pw)
    if (ok) {
      setPassword(pw)
      setLoggedIn(true)
      sessionStorage.setItem(SS_PASSWORD, pw)
    }
    return ok
  }, [])

  const logout = useCallback(() => {
    setPassword('')
    setLoggedIn(false)
    setEditMode(false)
    sessionStorage.removeItem(SS_PASSWORD)
  }, [])

  const value = {
    getOverride,
    saveText,
    resetText,
    resetAll,
    editMode,
    setEditMode,
    loggedIn,
    login,
    logout,
    status,
  }

  return <EditableContext.Provider value={value}>{children}</EditableContext.Provider>
}
