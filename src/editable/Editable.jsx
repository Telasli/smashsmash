import { useLayoutEffect, useRef } from 'react'
import { useEditable } from './EditableContext'

/* ================================================================
   <Editable id="..." as="h2">Texte par defaut</Editable>
   ----------------------------------------------------------------
   - Affiche l'override enregistre s'il existe, sinon le texte par
     defaut (les enfants JSX d'origine).
   - En mode edition : l'element devient cliquable/editable
     (contentEditable) et s'enregistre a la sortie du champ (blur).
   - L'override est applique de facon imperative (innerHTML) pour ne
     pas entrer en conflit avec le rendu React des enfants statiques.
   ================================================================ */

export default function Editable({ id, as: Tag = 'span', children, className = '', ...rest }) {
  const { getOverride, saveText, resetText, editMode } = useEditable()
  const ref = useRef(null)
  const focusHtml = useRef('')
  const override = getOverride(id)

  // Applique l'override enregistre directement dans le DOM.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (override != null && el.innerHTML !== override) {
      el.innerHTML = override
    }
  }, [override])

  const classes = [
    className,
    editMode ? 'editable is-editing' : '',
    override != null ? 'is-overridden' : '',
  ].filter(Boolean).join(' ')

  const editProps = editMode
    ? {
        contentEditable: true,
        suppressContentEditableWarning: true,
        spellCheck: false,
        'data-editable-id': id,
        title: 'Cliquez pour modifier — Alt+clic pour reinitialiser',
        onFocus: (e) => { focusHtml.current = e.currentTarget.innerHTML },
        onClick: (e) => {
          // Alt+clic : reinitialise ce texte a sa valeur d'origine
          if (e.altKey) {
            e.preventDefault()
            e.stopPropagation()
            resetText(id)
            e.currentTarget.blur()
            return
          }
          // En edition, neutralise la navigation/activation des liens et boutons
          e.preventDefault()
          e.stopPropagation()
        },
        onKeyDown: (e) => {
          // Empeche le retour a la ligne (Entree) pour les titres/boutons courts
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            e.currentTarget.blur()
          }
        },
        onBlur: (e) => {
          const html = e.currentTarget.innerHTML
          if (html !== focusHtml.current) saveText(id, html)
        },
      }
    : {}

  return (
    <Tag ref={ref} className={classes} {...editProps} {...rest}>
      {override == null ? children : null}
    </Tag>
  )
}
