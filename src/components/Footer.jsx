import { Link } from 'react-router-dom'
import { SmashSmashLogo } from './Navbar'
import Editable from '../editable/Editable'

export default function Footer() {
  return (
    <footer className="footer pattern-lines">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <SmashSmashLogo height={55} />
            <Editable id="footer.brand.text" as="p">
              Burgers smashes, frites crinkle-cut, milkshakes faits maison et bien plus.
              Ne a Paris, desormais dans toute la France et en Belgique.
            </Editable>
            <div className="footer-cert">
              <img
                src="/achahada.png"
                alt="Certifie Halal ACHAHADA"
                loading="lazy"
                onError={(e) => { const c = e.currentTarget.closest('.footer-cert'); if (c) c.style.display = 'none' }}
              />
            </div>
          </div>
          <div className="footer-columns">
            <div className="footer-column">
              <Editable id="footer.col1.title" as="h5">Explorer</Editable>
              <Link to="/"><Editable id="nav.accueil">Accueil</Editable></Link>
              <Link to="/menu"><Editable id="nav.menu">Menu</Editable></Link>
              <Link to="/restaurants"><Editable id="nav.restaurants">Nos Restaurants</Editable></Link>
              <Link to="/notre-histoire"><Editable id="nav.histoire">Notre Histoire</Editable></Link>
            </div>
            <div className="footer-column">
              <Editable id="footer.col2.title" as="h5">Rejoindre</Editable>
              <Link to="/franchise"><Editable id="nav.franchise">Devenir Franchise</Editable></Link>
              <a href="#"><Editable id="footer.contact">Contact</Editable></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <Editable id="footer.copyright" as="p">&copy; 2026 SmashSmash. Tous droits reserves.</Editable>
          <div className="footer-socials">
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
    </footer>
  )
}
