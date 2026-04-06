import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
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
  { name: 'Smash Burger', image: '/menu/smash-burger.jpeg' },
  { name: 'Smoke Smash', image: '/menu/smoke-smash.jpeg' },
  { name: 'Big Smash', image: '/menu/big-smash.jpeg' },
  { name: 'Chick\u2019n Smash', image: '/menu/chickn-smash.jpeg' },
  { name: 'Frites Cheddar', image: '/menu/frites-cheddar.jpg' },
  { name: 'Hot Dog Classic', image: '/menu/hotdog-classic.jpeg' },
  { name: 'Shake Fraise', image: '/menu/shake-fraise.jpeg' },
  { name: 'Smice', image: '/menu/smice.jpeg' },
]

/* ---------- Donnees du carousel locations ---------- */
const locations = [
  {
    name: 'Bordeaux',
    image: '/restau-bordeaux-1.jpg',
  },
  {
    name: 'Saint Germain en Laye 78',
    image: '/restau-5.jpg',
  },
  {
    name: 'Calais',
    image: '/restau-7.jpg',
  },
  {
    name: 'Genappe (Belgique)',
    image: '/restau-8.jpg',
  },
  {
    name: 'Voiron',
    image: '/restau-4.jpg',
  },
  {
    name: 'Dubai',
    image: '/restau-2.jpg',
  },
]

/* ---------- Donnees Instagram ---------- */
const galleryImages = Array.from({ length: 30 }, (_, i) =>
  `/gallery/street-${String(i + 1).padStart(2, '0')}.jpeg`
)

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
      <section className="hero-video-hero">
        <video
          className="hero-video-bg"
          src="/video-presentation.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-video-overlay" />
        <div className="hero-video-content">
          <h1 className="hero-anim hero-anim-1">Une envie de burger <span className="hero-highlight">irresistible</span> ?</h1>
          <p className="hero-anim hero-anim-2">Notre menu a duree limitee est arrive !</p>
          <div className="hero-buttons hero-anim hero-anim-3">
            <a href="/restaurants" className="btn-pill btn-white">Commander</a>
            <a href="/menu" className="btn-pill btn-outline-white">Voir le Menu</a>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
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
            src="/restau-1.jpg"
            alt="Interieur du SmashSmash"
            loading="lazy"
          />
        </div>

        <div className="blog-cta pattern-lines">
          <div className="blog-cta-icon">
            <BurgerIcon size={48} color="white" />
          </div>
          <p>Retrouvez les dernieres actualites, mises a jour et coulisses</p>
          <a href="/blog" className="btn-pill btn-white" style={{ marginTop: '20px' }}>Voir le blog</a>
        </div>
      </section>

      {/* ===== 7. LES MEILLEURS BURGERS ===== */}
      <section className="best-burgers">
        <h2>Les meilleurs burgers a Bordeaux, Saint Germain en Laye et Calais</h2>
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

        <div className="locations-grid-home">
          {locations.slice(0, 4).map((loc) => (
            <div className="location-card" key={loc.name}>
              <div className="location-card-image">
                <img src={loc.image} alt={loc.name} loading="lazy" />
              </div>
              <div className="location-card-info">
                <h4>{loc.name}</h4>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="/restaurants" className="btn-pill btn-outline-black">Tous nos restaurants</a>
        </div>
      </section>

      {/* ===== 9. SECTION PETIT-DEJEUNER ===== */}
      <section className="breakfast">
        <div className="breakfast-image">
          <img
            src="/smash-bacon-burger.jpg"
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
            <p><strong>Bordeaux :</strong> 8h &mdash; 11h</p>
            <p><strong>Saint Germain en Laye :</strong> 8h &mdash; 11h</p>
            <p><strong>Calais :</strong> 8h &mdash; 11h</p>
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
            src="/smash-box-togo.jpg"
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
            src="/restau-bordeaux-2.jpg"
            alt="Terrasse SmashSmash Bordeaux"
            loading="lazy"
          />
        </div>
      </section>

      {/* ===== CTA LIVRAISON 2 ===== */}
      <section className="delivery pattern-lines-dark">
        <h2>Faites-vous livrer des burgers pres de chez vous</h2>
        <a href="/restaurants" className="btn-pill btn-green-solid delivery-cta">Commander</a>
      </section>

      {/* ===== 12. SECTION GALERIE ===== */}
      <section className="gallery-section">
        <h2>Notre Galerie</h2>
        <p>Decouvrez SmashSmash en images</p>

        <div className="gallery-swiper-wrapper">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={12}
            slidesPerView={5}
            loop={true}
            navigation={false}
            speed={7000}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1.5, spaceBetween: 8 },
              480: { slidesPerView: 2.5, spaceBetween: 10 },
              768: { slidesPerView: 3.5, spaceBetween: 12 },
              1024: { slidesPerView: 4.5, spaceBetween: 12 },
              1280: { slidesPerView: 5.5, spaceBetween: 14 },
            }}
          >
            {galleryImages.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="gallery-slide">
                  <img src={src} alt={`SmashSmash photo ${i + 1}`} loading="lazy" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

    </>
  )
}

export default App
