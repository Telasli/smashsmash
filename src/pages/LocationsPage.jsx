import { useState, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import './LocationsPage.css'

/* ================================================================
   DONNEES DES RESTAURANTS
   ================================================================ */
const locations = [
  {
    name: 'Bordeaux',
    address: '277 Rue Sainte-Catherine, 33000 Bordeaux',
    hours: 'Lun-Jeu 11h30-22h30 | Ven 11h30-23h | Sam 12h-23h | Dim 12h-22h',
    status: 'open',
    orderUrl: null,
    googleUrl: 'https://share.google/lb6BlbV7e6Xqnn5Cu',
    lat: 44.8378, lng: -0.5792,
  },
  {
    name: 'Saint Germain en Laye 78',
    address: '90 Av. du Marechal Foch, 78100 Saint-Germain-en-Laye',
    hours: 'Tous les jours 11h30-01h00',
    status: 'open',
    orderUrl: 'https://restabo.app/smash-smash-saint-germain-en-laye',
    googleUrl: 'https://share.google/UsaiHJHO9GOGEh1Zf',
    lat: 48.8986, lng: 2.0938,
  },
  {
    name: 'Calais',
    address: '2 Rue Royale, 62100 Calais',
    hours: 'Lun-Jeu 11h-23h | Ven-Sam 11h-00h | Dim 11h-23h',
    status: 'open',
    orderUrl: null,
    googleUrl: 'https://share.google/YqGciDHOnHkX0MEmf',
    lat: 50.9513, lng: 1.8587,
  },
  {
    name: 'Genappe (Belgique)',
    address: 'Genappe, Brabant wallon, Belgique',
    hours: 'Bientot disponible',
    status: 'coming',
    orderUrl: null,
    googleUrl: null,
    lat: 50.6117, lng: 4.4517,
  },
  {
    name: 'Voiron',
    address: 'Voiron, Isere',
    hours: 'Bientot disponible',
    status: 'coming',
    orderUrl: null,
    googleUrl: null,
    lat: 45.3650, lng: 5.5911,
  },
  {
    name: 'Dubai',
    address: 'Dubai, Emirats Arabes Unis',
    hours: 'Bientot disponible',
    status: 'coming',
    orderUrl: null,
    googleUrl: null,
    lat: 25.2048, lng: 55.2708,
  },
]

const restauPhotos = [
  '/restau-1.jpg', '/restau-2.jpg', '/restau-3.jpg', '/restau-4.jpg',
  '/restau-5.jpg', '/restau-6.jpg', '/restau-7.jpg', '/restau-8.jpg',
  '/restau-9.jpg', '/restau-10.jpg', '/restau-bordeaux-1.jpg', '/restau-bordeaux-2.jpg',
]

/* ================================================================
   COMPOSANT LOCATIONS PAGE
   ================================================================ */
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng/2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [userPos, setUserPos] = useState(null)
  const [geoLoading, setGeoLoading] = useState(false)

  const handleGeolocate = useCallback(() => {
    if (!navigator.geolocation) return
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setGeoLoading(false)
        setSearchQuery('')
      },
      () => setGeoLoading(false)
    )
  }, [])

  let filtered = locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (userPos) {
    filtered = [...filtered].sort((a, b) => {
      const dA = getDistance(userPos.lat, userPos.lng, a.lat, a.lng)
      const dB = getDistance(userPos.lat, userPos.lng, b.lat, b.lng)
      return dA - dB
    })
  }

  return (
    <div className="locations-page">
      {/* ===== HERO + RECHERCHE ===== */}
      <section className="loc-hero">
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
        <button className="loc-geo-btn" onClick={handleGeolocate} disabled={geoLoading}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>
          {geoLoading ? 'Localisation...' : 'Utiliser ma position'}
        </button>
      </section>

      {/* ===== GRILLE RESTAURANTS (sans images) ===== */}
      <section className="loc-grid-section">
        <div className="loc-grid">
          {filtered.map((loc, i) => (
            <div className={`loc-card ${loc.status === 'coming' ? 'loc-card--coming' : ''}`} key={i}>
              <div className="loc-card-header">
                <div className="loc-card-top">
                  <span className={`loc-status-dot loc-status-dot--${loc.status}`} />
                  <span className="loc-status-label">
                    {loc.status === 'open' ? 'Ouvert' : 'Bientot'}
                  </span>
                </div>
              </div>
              <div className="loc-card-body">
                <h3 className="loc-card-name">
                  {loc.name}
                  {userPos && loc.lat && (
                    <span className="loc-card-distance">
                      {Math.round(getDistance(userPos.lat, userPos.lng, loc.lat, loc.lng))} km
                    </span>
                  )}
                </h3>
                <div className="loc-card-details">
                  <p className="loc-card-addr">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {loc.address}
                  </p>
                  <p className="loc-card-hours">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {loc.hours}
                  </p>
                    </div>
                <div className="loc-card-actions">
                  {loc.status === 'open' ? (
                    <>
                      {loc.orderUrl ? (
                        <a href={loc.orderUrl} target="_blank" rel="noopener noreferrer" className="btn-pill btn-green-solid loc-card-order">Commander en ligne</a>
                      ) : (
                        <span className="btn-pill loc-card-order-disabled">Commande en ligne bientot</span>
                      )}
                      {loc.googleUrl && (
                        <a href={loc.googleUrl} target="_blank" rel="noopener noreferrer" className="btn-pill loc-card-info">Plus d&rsquo;info</a>
                      )}
                    </>
                  ) : (
                    <span className="btn-pill loc-card-coming-btn">Ouverture prochaine</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="loc-no-results">Aucun restaurant trouve pour cette recherche.</p>
        )}
      </section>

      {/* ===== GALERIE RESTAURANTS ===== */}
      <section className="loc-gallery">
        <h2>Nos Restaurants en images</h2>
        <div className="loc-gallery-swiper">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={12}
            slidesPerView={4}
            loop={true}
            speed={5000}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1.5 },
              480: { slidesPerView: 2.2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {restauPhotos.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="loc-gallery-slide">
                  <img src={src} alt={`Restaurant SmashSmash ${i + 1}`} loading="lazy" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  )
}
