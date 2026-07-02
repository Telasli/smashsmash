import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Editable from './editable/Editable'

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
  const heroVideoRef = useRef(null)

  // Autoplay video mobile (iOS/Safari) : forcer la propriete muted et lancer la lecture.
  // React ne fixe pas toujours la propriete `muted` de maniere fiable, or iOS
  // n'autorise l'autoplay que si la video est reellement muette + playsinline.
  useEffect(() => {
    const v = heroVideoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    const play = () => {
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
    play()
    // Certaines versions iOS ne demarrent qu'a la premiere interaction : on reessaie alors.
    const onFirstTouch = () => { play(); window.removeEventListener('touchstart', onFirstTouch) }
    window.addEventListener('touchstart', onFirstTouch, { once: true, passive: true })
    return () => window.removeEventListener('touchstart', onFirstTouch)
  }, [])

  // Inscription au concours "Gagnez un repas" (envoi vers /api/signups)
  const [newsletterStatus, setNewsletterStatus] = useState('idle') // idle | sending | done | error

  const handleNewsletter = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = Object.fromEntries(new FormData(form))
    setNewsletterStatus('sending')
    try {
      const res = await fetch('/api/signups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setNewsletterStatus('done')
        form.reset()
      } else {
        setNewsletterStatus('error')
      }
    } catch {
      setNewsletterStatus('error')
    }
  }

  return (
    <>
      {/* ===== 3. SECTION HERO ===== */}
      <section className="hero-video-hero">
        <video
          ref={heroVideoRef}
          className="hero-video-bg"
          src="/video-presentation.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/smash-bacon-burger.jpg"
        />
        <div className="hero-video-overlay" />
        <div className="hero-video-content">
          <Editable id="home.hero.title" as="h1" className="hero-anim hero-anim-1">Une envie de burger <span className="hero-highlight">irresistible</span> ?</Editable>
          <Editable id="home.hero.subtitle" as="p" className="hero-anim hero-anim-2">Notre menu a duree limitee est arrive !</Editable>
          <div className="hero-buttons hero-anim hero-anim-3">
            <a href="/restaurants" className="btn-pill btn-white"><Editable id="home.hero.btn.order">Commander</Editable></a>
            <a href="/menu" className="btn-pill btn-outline-white"><Editable id="home.hero.btn.menu">Voir le Menu</Editable></a>
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
        <Editable id="home.menu.title" as="h2">Notre Menu</Editable>
        <Editable id="home.menu.text" as="p">
          Decouvrez nos classiques SmashSmash : burgers, poulet, hot dogs, milkshakes faits maison
          et bien plus encore ; le tout prepare avec des ingredients simples, frais et de haute qualite.
          Nous travaillons avec les meilleurs fermiers, boulangers et artisans pour des ingredients locaux et premium.
        </Editable>

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
                  <Editable id={`home.menucard.${item.name}`} as="h4">{item.name}</Editable>
                  {item.tag && <span className="tag">{item.tag}</span>}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <a href="/menu" className="btn-pill btn-outline-black"><Editable id="home.menu.btn">Decouvrir le Menu</Editable></a>
      </section>

      {/* ===== 4. SECTION LIVRAISON ===== */}
      <section className="delivery pattern-lines-dark">
        <Editable id="home.delivery.title" as="h2">Faites-vous livrer des burgers pres de chez vous</Editable>
        <a href="/restaurants" className="btn-pill btn-green-solid delivery-cta"><Editable id="home.delivery.btn">Commander</Editable></a>
      </section>

      {/* ===== 6. SECTION BLOG / ACTUALITES ===== */}
      <section className="blog-section">
        <div className="blog-text">
          <Editable id="home.blog.title" as="h3">Decouvrez l&rsquo;artiste derriere notre SmashSmash de King&rsquo;s Cross Station</Editable>
          <Editable id="home.blog.text" as="p">
            Quand nous avons ouvert les portes de notre SmashSmash de King&rsquo;s Cross, nous voulions
            que l&rsquo;espace soit aussi vivant et creatif que le quartier lui-meme&hellip;
          </Editable>
          <div>
            <a href="/notre-histoire" className="btn-pill btn-black"><Editable id="home.blog.btn">En savoir plus</Editable></a>
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
          <Editable id="home.blogcta.text" as="p">Retrouvez les dernieres actualites, mises a jour et coulisses</Editable>
          <a href="https://www.instagram.com/smashsmashfr/" target="_blank" rel="noopener noreferrer" className="btn-pill btn-white" style={{ marginTop: '20px' }}><Editable id="home.blogcta.btn">Voir nos actualites</Editable></a>
        </div>
      </section>

      {/* ===== 7. LES MEILLEURS BURGERS ===== */}
      <section className="best-burgers">
        <Editable id="home.best.title" as="h2">Les meilleurs burgers a Bordeaux, Saint Germain en Laye et Calais</Editable>
        <Editable id="home.best.text" as="p">
          Passez dans votre SmashSmash le plus proche pour savourer votre burger prefere, des frites
          crinkle-cut et des milkshakes faits maison. Ou restez chez vous et laissez-nous vous
          livrer nos burgers et milkshakes directement a votre porte.
        </Editable>
        <hr />
      </section>

      {/* ===== 8. SECTION TOUS LES RESTAURANTS ===== */}
      <section className="locations-section">
        <Editable id="home.locations.title" as="h2">Tous nos restaurants</Editable>
        <Editable id="home.locations.text" as="p">Trouvez un restaurant de burgers pres de chez vous, ouvert sur place ou en livraison.</Editable>

        <div className="locations-grid-home">
          {locations.slice(0, 4).map((loc) => (
            <div className="location-card" key={loc.name}>
              <div className="location-card-image">
                <img src={loc.image} alt={loc.name} loading="lazy" />
              </div>
              <div className="location-card-info">
                <Editable id={`home.loccard.${loc.name}`} as="h4">{loc.name}</Editable>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="/restaurants" className="btn-pill btn-outline-black"><Editable id="home.locations.btn">Tous nos restaurants</Editable></a>
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
          <Editable id="home.breakfast.title" as="h2">Nos restaurants petit-dejeuner</Editable>
          <Editable id="home.breakfast.text" as="p">
            Bien commencer la journee avec SmashSmash : des burgers petit-dejeuner fraichement
            prepares avec du bacon, des oeufs, du fromage, des tots et bien plus encore.
          </Editable>
          <div className="breakfast-times">
            <Editable id="home.breakfast.h1" as="p"><strong>Bordeaux :</strong> 8h &mdash; 11h</Editable>
            <Editable id="home.breakfast.h2" as="p"><strong>Saint Germain en Laye :</strong> 8h &mdash; 11h</Editable>
            <Editable id="home.breakfast.h3" as="p"><strong>Calais :</strong> 8h &mdash; 11h</Editable>
          </div>
          <div>
            <a href="/restaurants" className="btn-pill btn-white"><Editable id="home.breakfast.btn">Commander</Editable></a>
          </div>
        </div>
      </section>

      {/* ===== 10. GAGNER UN REPAS / NEWSLETTER ===== */}
      <section className="newsletter">
        <div className="newsletter-form-section">
          <Editable id="home.news.title" as="h2">Gagnez un repas pour deux !</Editable>
          <Editable id="home.news.subtitle" as="p">Inscrivez-vous a notre liste de diffusion pour tenter de gagner un repas pour deux</Editable>

          {newsletterStatus === 'done' ? (
            <div className="newsletter-success">
              <h3>Merci, votre inscription est enregistree !</h3>
              <p>Bonne chance pour le tirage. Nous vous contacterons par e-mail si vous gagnez.</p>
            </div>
          ) : (
          <form onSubmit={handleNewsletter}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName"><Editable id="home.news.label.firstName">Prenom *</Editable></label>
                <input type="text" id="firstName" name="firstName" placeholder="Votre prenom" required />
              </div>
              <div className="form-group">
                <label htmlFor="surname"><Editable id="home.news.label.surname">Nom *</Editable></label>
                <input type="text" id="surname" name="surname" placeholder="Votre nom" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email"><Editable id="home.news.label.email">E-mail *</Editable></label>
                <input type="email" id="email" name="email" placeholder="votre@email.com" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="birthday"><Editable id="home.news.label.birthday">Votre date de naissance *</Editable></label>
                <input type="date" id="birthday" name="birthday" required />
              </div>
              <div className="form-group">
                <label htmlFor="favRestaurant"><Editable id="home.news.label.favRestaurant">Votre SmashSmash prefere *</Editable></label>
                <select id="favRestaurant" name="favRestaurant" required>
                  <option value="">Choisir un restaurant</option>
                  <option>Bordeaux</option>
                  <option>Saint Germain en Laye 78</option>
                  <option>Calais</option>
                  <option>Genappe (Belgique)</option>
                  <option>Voiron</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-pill btn-white" disabled={newsletterStatus === 'sending'}>
              <Editable id="home.news.submit">Je m&rsquo;inscris</Editable>
            </button>

            {newsletterStatus === 'error' && (
              <p className="newsletter-error">Une erreur est survenue. Merci de reessayer.</p>
            )}

            <div className="form-fine-print">
              <Editable id="home.news.fine1" as="p">
                Un gagnant sera selectionne au hasard chaque mois parmi les abonnes de notre
                liste de diffusion. Le prix comprend deux burgers, deux frites et deux boissons.
              </Editable>
              <Editable id="home.news.fine2" as="p" style={{ marginTop: 8 }}>
                En vous inscrivant, vous acceptez de recevoir des actualites, offres et mises a
                jour de SmashSmash. Vous pouvez vous desabonner a tout moment.
              </Editable>
            </div>
          </form>
          )}
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
          <Editable id="home.sustain.title" as="h2">Le developpement durable au coeur de nos actions</Editable>
          <Editable id="home.sustain.text1" as="p">
            Chez SmashSmash, nous croyons que de bons plats doivent etre benefiques pour
            la communaute et la planete. De l&rsquo;approvisionnement en ingredients responsables
            a la reduction des dechets, le developpement durable guide chacune de nos decisions.
          </Editable>
          <Editable id="home.sustain.text2" as="p">
            Nous collaborons avec des fournisseurs qui partagent notre engagement pour une
            agriculture ethique, et nous travaillons en permanence a reduire notre empreinte
            environnementale dans tous nos restaurants au Royaume-Uni.
          </Editable>
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
        <Editable id="home.delivery2.title" as="h2">Faites-vous livrer des burgers pres de chez vous</Editable>
        <a href="/restaurants" className="btn-pill btn-green-solid delivery-cta"><Editable id="home.delivery2.btn">Commander</Editable></a>
      </section>

      {/* ===== 12. SECTION GALERIE ===== */}
      <section className="gallery-section">
        <Editable id="home.gallery.title" as="h2">Notre Galerie</Editable>
        <Editable id="home.gallery.subtitle" as="p">Decouvrez SmashSmash en images</Editable>

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
