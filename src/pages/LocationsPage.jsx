import { useState } from 'react'
import './LocationsPage.css'

/* ================================================================
   DONNEES DES RESTAURANTS
   ================================================================ */
const locations = [
  {
    name: 'Bordeaux',
    address: 'Bordeaux, France',
    phone: '05 56 44 55 29',
    hours: 'Lundi — Dimanche | 11h - 22h',
    image: '/restau-bordeaux-1.jpg',
    status: 'open',
  },
  {
    name: 'Saint Germain en Laye 78',
    address: 'Saint-Germain-en-Laye, Yvelines (78)',
    phone: '01 39 73 55 30',
    hours: 'Lundi — Dimanche | 11h - 22h',
    image: '/restau-5.jpg',
    status: 'open',
  },
  {
    name: 'Quimper',
    address: 'Quimper, Finistere',
    phone: '02 98 55 44 31',
    hours: 'Lundi — Dimanche | 11h - 22h',
    image: '/restau-9.jpg',
    status: 'open',
  },
  {
    name: 'Calais',
    address: 'Calais, Pas-de-Calais',
    phone: '03 21 34 55 33',
    hours: 'Lundi — Dimanche | 11h - 22h',
    image: '/restau-7.jpg',
    status: 'open',
  },
  {
    name: 'Genappe (Belgique)',
    address: 'Genappe, Brabant wallon, Belgique',
    phone: '+32 67 55 44 34',
    hours: 'Bientot disponible',
    image: '/restau-8.jpg',
    status: 'coming',
  },
  {
    name: 'Voiron',
    address: 'Voiron, Isere',
    phone: '04 76 55 44 35',
    hours: 'Bientot disponible',
    image: '/restau-4.jpg',
    status: 'coming',
  },
  {
    name: 'Dubai',
    address: 'Dubai, Emirats Arabes Unis',
    phone: '',
    hours: 'Bientot disponible',
    image: '/restau-2.jpg',
    status: 'coming',
  },
]

/* ================================================================
   COMPOSANT LOCATIONS PAGE
   ================================================================ */
export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="locations-page">
      {/* ===== HERO + RECHERCHE ===== */}
      <section className="loc-hero pattern-lines-dark">
        <h1>Trouvez votre SmashSmash</h1>
        <p className="loc-hero-desc">
          Recherchez votre ville ou entrez votre code postal pour trouver un restaurant pres de chez vous.
        </p>
        <div className="loc-search-inner">
          <input
            type="text"
            placeholder="Rechercher une ville, un code postal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="loc-find-btn">Rechercher</button>
        </div>
      </section>

      {/* ===== GRILLE RESTAURANTS ===== */}
      <section className="loc-grid-section">
        <div className="loc-grid">
          {filtered.map((loc, i) => (
            <div className="loc-grid-card" key={i}>
              <div className="loc-grid-card-image">
                <img src={loc.image} alt={loc.name} loading="lazy" />
                <span className={`loc-status-badge loc-status-badge--${loc.status}`}>
                  {loc.status === 'open' ? 'Ouvert' : 'Bientot'}
                </span>
              </div>
              <h4>{loc.name}</h4>
              <p className="loc-grid-card-addr">{loc.address}</p>
              <p className="loc-grid-card-hours">{loc.hours}</p>
              <p className="loc-grid-card-phone">{loc.phone}</p>
              <div className="loc-grid-card-actions">
                {loc.status === 'open' ? (
                  <a href="/restaurants" className="btn-pill btn-green-solid loc-card-order">Commander</a>
                ) : (
                  <span className="btn-pill loc-card-coming">Ouverture prochaine</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="loc-no-results">Aucun restaurant trouve pour cette recherche.</p>
        )}
      </section>
    </div>
  )
}
