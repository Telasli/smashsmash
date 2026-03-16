import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

/* ================================================================
   SMASHSMASH - PAGE D'ACCUEIL
   Replica fidele du site smashsmash.fr - Version francaise
   ================================================================ */

/* ---------- Icones SVG reutilisables ---------- */
function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}

function BurgerIcon({ size = 48, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M8 24 Q8 10 24 10 Q40 10 40 24 Z" />
      <path d="M6 26 Q12 22 18 26 Q24 22 30 26 Q36 22 42 26" />
      <rect x="7" y="28" width="34" height="5" rx="2" />
      <path d="M8 35 L40 35 Q40 42 24 42 Q8 42 8 35 Z" />
    </svg>
  )
}

/* ---------- Donnees du carousel menu ---------- */
const menuItems = [
  {
    name: 'Milkshakes',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop',
    tag: null,
  },
  {
    name: 'Frites au Fromage',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=400&fit=crop',
    tag: null,
  },
  {
    name: 'SmokeSmash',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
    tag: null,
  },
  {
    name: 'SmashBurger',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop',
    tag: 'Boeuf Halal Uniquement',
  },
  {
    name: 'Double SmashBurger',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=400&fit=crop',
    tag: null,
  },
  {
    name: 'Chicken Smash',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=400&fit=crop',
    tag: null,
  },
  {
    name: 'Hot Dog',
    image: 'https://images.unsplash.com/photo-1612392062126-2f5b0ced0497?w=400&h=400&fit=crop',
    tag: null,
  },
  {
    name: 'Concrete',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop',
    tag: null,
  },
]

/* ---------- Donnees du carousel locations ---------- */
const locations = [
  {
    name: 'Bordeaux',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
  },
  {
    name: 'Saint Germain en Laye 78',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
  },
  {
    name: 'Quimper',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop',
  },
  {
    name: 'Anderlecht (Belgique)',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
  },
  {
    name: 'Calais',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=400&h=300&fit=crop',
  },
  {
    name: 'Genappe (Belgique)',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop',
  },
  {
    name: 'Voiron',
    image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop',
  },
]

/* ---------- Donnees Instagram ---------- */
const instaPosts = [
  'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=300&h=300&fit=crop',
]

/* ================================================================
   COMPOSANT PRINCIPAL
   ================================================================ */
function App() {
  const menuPrevRef = useRef(null)
  const menuNextRef = useRef(null)
  const locPrevRef = useRef(null)
  const locNextRef = useRef(null)

  return (
    <>
      {/* ===== 3. SECTION HERO ===== */}
      <section className="hero">
        <div className="hero-left pattern-lines">
          <h1>Une envie de burger irresistible ?</h1>
          <p>Notre menu a duree limitee est arrive !</p>
          <div className="hero-buttons">
            <a href="/restaurants" className="btn-pill btn-white">Commander</a>
            <a href="/menu" className="btn-pill btn-outline-white">Voir le Menu</a>
          </div>
        </div>

        <div className="hero-right hero-right--image-only pattern-lines">
          <div className="hero-food-image">
            <img
              src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=450&fit=crop"
              alt="Burgers et frites sur un plateau"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ===== 5. SECTION NOTRE MENU ===== */}
      <section className="our-menu">
        <h2>Notre Menu</h2>
        <p>
          Decouvrez nos classiques SmashSmash : burgers, poulet, hot dogs, milkshakes faits maison
          et bien plus encore ; le tout prepare avec des ingredients simples, frais et de haute qualite.
          Nous travaillons avec les meilleurs fermiers, boulangers et artisans pour des ingredients locaux et premium.
        </p>

        <div className="menu-swiper-wrapper">
          <button ref={menuPrevRef} className="swiper-nav-btn swiper-nav-prev" aria-label="Precedent">
            <ChevronLeft />
          </button>
          <button ref={menuNextRef} className="swiper-nav-btn swiper-nav-next" aria-label="Suivant">
            <ChevronRight />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            loop={true}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = menuPrevRef.current
              swiper.params.navigation.nextEl = menuNextRef.current
              swiper.navigation.init()
              swiper.navigation.update()
            }}
            breakpoints={{
              0: { slidesPerView: 1.5, spaceBetween: 12 },
              480: { slidesPerView: 2.2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
              1280: { slidesPerView: 5, spaceBetween: 24 },
            }}
          >
            {menuItems.map((item) => (
              <SwiperSlide key={item.name}>
                <div className="menu-card">
                  <div className="menu-card-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>
                  <h4>{item.name}</h4>
                  {item.tag && <span className="tag">{item.tag}</span>}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <a href="/menu" className="btn-pill btn-outline-black">Decouvrir le Menu</a>
      </section>

      {/* ===== 4. SECTION LIVRAISON ===== */}
      <section className="delivery pattern-lines-dark">
        <h2>Faites-vous livrer des burgers pres de chez vous</h2>
        <a href="/restaurants" className="btn-pill btn-green-solid delivery-cta">Commander</a>
      </section>

      {/* ===== 6. SECTION BLOG / ACTUALITES ===== */}
      <section className="blog-section">
        <div className="blog-text">
          <h3>Decouvrez l&rsquo;artiste derriere notre SmashSmash de King&rsquo;s Cross Station</h3>
          <p>
            Quand nous avons ouvert les portes de notre SmashSmash de King&rsquo;s Cross, nous voulions
            que l&rsquo;espace soit aussi vivant et creatif que le quartier lui-meme&hellip;
          </p>
          <div>
            <a href="/notre-histoire" className="btn-pill btn-black">En savoir plus</a>
          </div>
        </div>

        <div className="blog-image">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=500&fit=crop"
            alt="Interieur du SmashSmash King's Cross avec fresque murale"
            loading="lazy"
          />
        </div>

        <div className="blog-cta pattern-lines">
          <div className="blog-cta-icon">
            <BurgerIcon size={48} color="white" />
          </div>
          <p>Retrouvez les dernieres actualites, mises a jour et coulisses</p>
        </div>
      </section>

      {/* ===== 7. LES MEILLEURS BURGERS ===== */}
      <section className="best-burgers">
        <h2>Les meilleurs burgers a Bordeaux, Saint Germain en Laye, Quimper et Anderlecht</h2>
        <p>
          Passez dans votre SmashSmash le plus proche pour savourer votre burger prefere, des frites
          crinkle-cut et des milkshakes faits maison. Ou restez chez vous et laissez-nous vous
          livrer nos burgers et milkshakes directement a votre porte.
        </p>
        <hr />
      </section>

      {/* ===== 8. SECTION TOUS LES RESTAURANTS ===== */}
      <section className="locations-section">
        <h2>Tous nos restaurants</h2>
        <p>Trouvez un restaurant de burgers pres de chez vous, ouvert sur place ou en livraison.</p>

        <div className="locations-swiper-wrapper">
          <button ref={locPrevRef} className="swiper-nav-btn swiper-nav-prev" aria-label="Precedent">
            <ChevronLeft />
          </button>
          <button ref={locNextRef} className="swiper-nav-btn swiper-nav-next" aria-label="Suivant">
            <ChevronRight />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            loop={true}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = locPrevRef.current
              swiper.params.navigation.nextEl = locNextRef.current
              swiper.navigation.init()
              swiper.navigation.update()
            }}
            breakpoints={{
              0: { slidesPerView: 1.3, spaceBetween: 12 },
              480: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {locations.map((loc) => (
              <SwiperSlide key={loc.name}>
                <div className="location-card">
                  <div className="location-card-image">
                    <img src={loc.image} alt={loc.name} loading="lazy" />
                  </div>
                  <div className="location-card-info">
                    <div className="loc-icon">
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="10" r="8" />
                        <path d="M8 12 h8 M8 9 Q12 4 16 9" />
                      </svg>
                    </div>
                    <h4>{loc.name}</h4>
                    <span className="see-location">Voir le restaurant &gt;</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ===== 9. SECTION PETIT-DEJEUNER ===== */}
      <section className="breakfast">
        <div className="breakfast-image">
          <img
            src="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700&h=600&fit=crop"
            alt="Burger petit-dejeuner avec oeuf et bacon"
            loading="lazy"
          />
        </div>

        <div className="breakfast-content pattern-lines">
          <h2>Nos restaurants petit-dejeuner</h2>
          <p>
            Bien commencer la journee avec SmashSmash : des burgers petit-dejeuner fraichement
            prepares avec du bacon, des oeufs, du fromage, des tots et bien plus encore.
          </p>
          <div className="breakfast-times">
            <p><strong>Mansion House :</strong> 8h &mdash; 11h</p>
            <p><strong>Canary Wharf :</strong> 8h &mdash; 11h (Dim &mdash; Ven), 8h30 &mdash; 11h (Sam)</p>
            <p><strong>St. Pancras :</strong> 7h30 &mdash; 11h</p>
            <p><strong>King&rsquo;s Cross Station :</strong> 7h30 &mdash; 11h</p>
            <p><strong>Gatwick Airport :</strong> 3h30 &mdash; 20h30</p>
          </div>
          <div>
            <a href="/restaurants" className="btn-pill btn-white">Commander</a>
          </div>
        </div>
      </section>

      {/* ===== 10. GAGNER UN REPAS / NEWSLETTER ===== */}
      <section className="newsletter">
        <div className="newsletter-form-section">
          <h2>Gagnez un repas pour deux !</h2>
          <p>Inscrivez-vous a notre liste de diffusion pour tenter de gagner un repas pour deux</p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Prenom *</label>
                <input type="text" id="firstName" placeholder="Votre prenom" required />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Nom *</label>
                <input type="text" id="surname" placeholder="Votre nom" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input type="email" id="email" placeholder="votre@email.com" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="birthday">Votre date de naissance *</label>
                <input type="date" id="birthday" required />
              </div>
              <div className="form-group">
                <label htmlFor="favRestaurant">Votre SmashSmash prefere *</label>
                <select id="favRestaurant" required>
                  <option value="">Choisir un restaurant</option>
                  <option>Bordeaux</option>
                  <option>Saint Germain en Laye 78</option>
                  <option>Quimper</option>
                  <option>Anderlecht (Belgique)</option>
                  <option>Calais</option>
                  <option>Genappe (Belgique)</option>
                  <option>Voiron</option>
                </select>
              </div>
            </div>

            <div className="form-checkboxes">
              <p>Faites-vous partie du NHS ou etes-vous etudiant ?</p>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" /> Personnel NHS
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" /> Etudiant
                </label>
              </div>
            </div>

            <button type="submit" className="btn-pill btn-white">
              Je m&rsquo;inscris
            </button>

            <div className="form-fine-print">
              <p>
                Un gagnant sera selectionne au hasard chaque mois parmi les abonnes de notre
                liste de diffusion. Le prix comprend deux burgers, deux frites et deux boissons.
              </p>
              <p style={{ marginTop: 8 }}>
                En vous inscrivant, vous acceptez de recevoir des actualites, offres et mises a
                jour de SmashSmash. Vous pouvez vous desabonner a tout moment.
              </p>
            </div>
          </form>
        </div>

        <div className="newsletter-image">
          <img
            src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=700&h=700&fit=crop"
            alt="Burgers et frites dans un emballage a emporter"
            loading="lazy"
          />
        </div>
      </section>

      {/* ===== 11. SECTION DEVELOPPEMENT DURABLE ===== */}
      <section className="sustainability">
        <div className="sustainability-content">
          <h2>Le developpement durable au coeur de nos actions</h2>
          <p>
            Chez SmashSmash, nous croyons que de bons plats doivent etre benefiques pour
            la communaute et la planete. De l&rsquo;approvisionnement en ingredients responsables
            a la reduction des dechets, le developpement durable guide chacune de nos decisions.
          </p>
          <p>
            Nous collaborons avec des fournisseurs qui partagent notre engagement pour une
            agriculture ethique, et nous travaillons en permanence a reduire notre empreinte
            environnementale dans tous nos restaurants au Royaume-Uni.
          </p>
          <a href="#" className="btn-pill btn-black">En savoir plus sur notre impact</a>
        </div>

        <div className="sustainability-image">
          <img
            src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=450&fit=crop"
            alt="Enseigne neon Stand For Something Good"
            loading="lazy"
          />
        </div>
      </section>

      {/* ===== CTA LIVRAISON 2 ===== */}
      <section className="delivery pattern-lines-dark">
        <h2>Faites-vous livrer des burgers pres de chez vous</h2>
        <a href="/restaurants" className="btn-pill btn-green-solid delivery-cta">Commander</a>
      </section>

      {/* ===== 12. SECTION INSTAGRAM ===== */}
      <section className="instagram-section">
        <div className="insta-profile">
          <div className="insta-avatar">
            <span style={{ color: 'white', fontWeight: 900, fontSize: 22 }}>S</span>
          </div>
          <div className="insta-info">
            <h4>
              SmashSmash
              <span className="verified">
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17 L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </span>
            </h4>
            <p>@smashsmash_fr &middot; 5K Publications</p>
          </div>
          <button className="insta-follow-btn">
            <svg viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" fill="none" stroke="white" strokeWidth="1.5" />
              <circle cx="17.5" cy="6.5" r="1.5" />
            </svg>
            Suivre
          </button>
        </div>

        <div className="insta-posts">
          {instaPosts.map((src, i) => (
            <a href="#" className="insta-post" key={i}>
              <img src={src} alt={`Publication Instagram ${i + 1}`} loading="lazy" />
            </a>
          ))}
        </div>
      </section>

    </>
  )
}

export default App
