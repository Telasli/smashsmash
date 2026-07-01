import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Editable from '../editable/Editable'

function SmashSmashLogo({ height = 65 }) {
  return (
    <img src="/logo_smash.png" alt="SmashSmash" style={{ height, width: 'auto' }} />
  )
}

export { SmashSmashLogo }

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className={`navbar ${menuOpen ? 'navbar--menu-open' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <SmashSmashLogo />
          </Link>
          <div className="navbar-links">
            <NavLink to="/"><Editable id="nav.accueil">Accueil</Editable></NavLink>
            <NavLink to="/menu"><Editable id="nav.menu">Menu</Editable></NavLink>
            <NavLink to="/restaurants"><Editable id="nav.restaurants">Nos Restaurants</Editable></NavLink>
            <NavLink to="/notre-histoire"><Editable id="nav.histoire">Notre Histoire</Editable></NavLink>
            <NavLink to="/franchise"><Editable id="nav.franchise">Devenir Franchise</Editable></NavLink>
            <Link to="/restaurants" className="btn-order"><Editable id="nav.commander">Commander</Editable></Link>
          </div>
          <button
            className={`mobile-menu-btn ${menuOpen ? 'mobile-menu-btn--open' : ''}`}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Fullscreen mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-nav">
            <NavLink to="/" end onClick={closeMenu}><Editable id="nav.accueil">Accueil</Editable></NavLink>
            <NavLink to="/menu" onClick={closeMenu}><Editable id="nav.menu">Menu</Editable></NavLink>
            <NavLink to="/restaurants" onClick={closeMenu}><Editable id="nav.restaurants">Nos Restaurants</Editable></NavLink>
            <NavLink to="/notre-histoire" onClick={closeMenu}><Editable id="nav.histoire">Notre Histoire</Editable></NavLink>
            <NavLink to="/franchise" onClick={closeMenu}><Editable id="nav.franchise">Devenir Franchise</Editable></NavLink>
          </div>
          <div className="mobile-menu-bottom">
            <Link to="/restaurants" className="btn-pill btn-green-solid mobile-menu-order" onClick={closeMenu}><Editable id="nav.commander">Commander</Editable></Link>
            <div className="mobile-menu-socials">
              <a href="https://www.instagram.com/smashsmashfr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg>
              </a>
              <a href="https://www.tiktok.com/@smashsmash_fr" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg viewBox="0 0 24 24"><path d="M12 2v13a4 4 0 1 1-3-3.87" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 2c0 3 2.5 5 5.5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </a>
              <a href="https://www.facebook.com/Smash.Smash.France/?locale=fr_FR" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
