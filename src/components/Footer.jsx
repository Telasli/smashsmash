import { Link } from 'react-router-dom'
import { SmashSmashLogo } from './Navbar'

export default function Footer() {
  return (
    <footer className="footer pattern-lines">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <SmashSmashLogo height={32} />
            <p>
              Burgers smashes, frites crinkle-cut, milkshakes faits maison et bien plus.
              Ne a Paris, desormais dans toute la France.
            </p>
          </div>
          <div className="footer-columns">
            <div className="footer-column">
              <h5>Explorer</h5>
              <Link to="/menu">Menu</Link>
              <Link to="/restaurants">Nos Restaurants</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/notre-histoire">Notre Histoire</Link>
            </div>
            <div className="footer-column">
              <h5>Rejoindre</h5>
              <Link to="/franchise">Devenir Franchise</Link>
              <a href="#">Carrieres</a>
              <a href="#">Contact</a>
              <a href="#">Presse</a>
            </div>
            <div className="footer-column">
              <h5>Mentions legales</h5>
              <a href="#">Politique de confidentialite</a>
              <a href="#">Conditions d&rsquo;utilisation</a>
              <a href="#">Politique de cookies</a>
              <a href="#">Accessibilite</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 SmashSmash. Tous droits reserves.</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/smashsmashfr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg viewBox="0 0 24 24"><path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.5L20 4h-2l-5.2 6.3L8 4H4z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
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
    </footer>
  )
}
