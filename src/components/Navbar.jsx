import { Link, NavLink } from 'react-router-dom'

function SmashSmashLogo({ height = 65 }) {
  return (
    <img src="/logo_smash.png" alt="SmashSmash" style={{ height, width: 'auto' }} />
  )
}

export { SmashSmashLogo }

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
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
          <button className="mobile-menu-btn" aria-label="Ouvrir le menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </>
  )
}
