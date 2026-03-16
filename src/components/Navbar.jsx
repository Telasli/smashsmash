import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function SmashSmashLogo({ height = 65 }) {
  return (
    <img src="/logo_smash.png" alt="SmashSmash" style={{ height, width: 'auto' }} />
  )
}

export { SmashSmashLogo }

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className="navbar">
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

        {/* Mobile menu dropdown */}
        <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
          <NavLink to="/menu" onClick={closeMenu}>Menu</NavLink>
          <NavLink to="/restaurants" onClick={closeMenu}>Nos Restaurants</NavLink>
          <NavLink to="/blog" onClick={closeMenu}>Blog</NavLink>
          <NavLink to="/notre-histoire" onClick={closeMenu}>Notre Histoire</NavLink>
          <NavLink to="/franchise" onClick={closeMenu}>Devenir Franchise</NavLink>
          <Link to="/restaurants" className="btn-pill btn-green-solid mobile-menu-order" onClick={closeMenu}>Commander</Link>
        </div>
      </nav>
      {menuOpen && <div className="mobile-menu-overlay" onClick={closeMenu} />}
    </>
  )
}
