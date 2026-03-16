import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

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
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/restaurants">Nos Restaurants</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/notre-histoire">Notre Histoire</NavLink>
            <NavLink to="/franchise">Devenir Franchise</NavLink>
            <Link to="/restaurants" className="btn-order">Commander</Link>
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
            <NavLink to="/menu" onClick={closeMenu}>Menu</NavLink>
            <NavLink to="/restaurants" onClick={closeMenu}>Nos Restaurants</NavLink>
            <NavLink to="/blog" onClick={closeMenu}>Blog</NavLink>
            <NavLink to="/notre-histoire" onClick={closeMenu}>Notre Histoire</NavLink>
            <NavLink to="/franchise" onClick={closeMenu}>Devenir Franchise</NavLink>
          </div>
          <div className="mobile-menu-bottom">
            <Link to="/restaurants" className="btn-pill btn-green-solid mobile-menu-order" onClick={closeMenu}>Commander</Link>
            <div className="mobile-menu-socials">
              <a href="https://www.instagram.com/smashsmashfr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg>
              </a>
              <a href="#" aria-label="TikTok">
                <svg viewBox="0 0 24 24"><path d="M12 2v13a4 4 0 1 1-3-3.87" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 2c0 3 2.5 5 5.5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
