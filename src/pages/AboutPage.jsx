import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import './AboutPage.css'

/* ================================================================
   PAGE NOTRE HISTOIRE
   ================================================================ */

const stats = [
  { number: '2019', label: 'Annee de creation' },
  { number: '5+', label: 'Restaurants ouverts' },
  { number: '3', label: 'Pays' },
  { number: '500K+', label: 'Burgers vendus' },
]

const timeline = [
  {
    year: '2019',
    title: "L\u2019idee est nee",
    description: "Deux amis passionnes de street food decouvrent le smash burger lors d\u2019un voyage a Los Angeles et decident de ramener le concept en France.",
  },
  {
    year: '2020',
    title: 'Premier restaurant',
    description: "Ouverture du tout premier SmashSmash a Bordeaux. Le succes est immediat : files d\u2019attente des la premiere semaine.",
  },
  {
    year: '2023',
    title: 'Expansion',
    description: "La marque s\u2019installe a Saint-Germain-en-Laye et Calais. Le concept seduit partout ou il passe.",
  },
  {
    year: '2024',
    title: 'International',
    description: "SmashSmash franchit les frontieres : Genappe en Belgique et bientot Dubai. L\u2019aventure ne fait que commencer.",
  },
  {
    year: '2025',
    title: "Et ce n\u2019est que le debut",
    description: "De nouveaux restaurants en preparation, des collaborations avec des chefs et des recettes toujours plus creatives.",
  },
]

const commitments = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 4C14 4 6 12 6 22c0 12 18 22 18 22s18-10 18-22C42 12 34 4 24 4z" />
        <circle cx="24" cy="20" r="6" />
      </svg>
    ),
    title: 'Approvisionnement local',
    description: "Notre viande provient exclusivement d\u2019elevages francais partenaires, nos legumes de producteurs locaux.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 40l8-16 8 10 8-20 12 26" />
        <path d="M6 40h36" />
        <circle cx="24" cy="10" r="4" />
        <path d="M24 14v6" />
      </svg>
    ),
    title: 'Zero gaspillage',
    description: "Nous avons reduit nos dechets de 60% grace a un systeme de gestion des stocks intelligent.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 44V20l12-16 12 16v24H12z" />
        <path d="M20 44V32h8v12" />
        <circle cx="24" cy="24" r="3" />
      </svg>
    ),
    title: 'Emballages responsables',
    description: "Tous nos emballages sont compostables ou recyclables. Objectif 100% sans plastique.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="14" r="8" />
        <path d="M8 44c0-8 7-16 16-16s16 8 16 16" />
      </svg>
    ),
    title: 'Bien-etre au travail',
    description: "Salaires au-dessus du marche, formation continue et perspectives d\u2019evolution pour chaque membre.",
  },
]

const galleryPhotos = [
  '/restau-1.jpg', '/restau-bordeaux-1.jpg', '/restau-5.jpg',
  '/restau-9.jpg', '/restau-8.jpg', '/restau-bordeaux-2.jpg',
  '/restau-2.jpg', '/restau-10.jpg', '/restau-4.jpg',
]

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* ===== HERO ===== */}
      <section className="about-hero">
        <img src="/restau-1.jpg" alt="Restaurant SmashSmash" className="about-hero-bg" />
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <span className="about-hero-tag">Notre Histoire</span>
          <h1>Ne de la passion du Smash Burger</h1>
          <p className="about-hero-lead">
            Depuis 2019, SmashSmash ecrit une nouvelle page de la street food en France.
            Des ingredients sources localement, une cuisson signature et un engagement
            sans compromis pour le gout.
          </p>
          <div className="about-hero-buttons">
            <a href="/menu" className="btn-pill btn-white">Voir le Menu</a>
            <a href="/restaurants" className="btn-pill btn-outline-white">Nos Restaurants</a>
          </div>
        </div>
      </section>

      {/* ===== CHIFFRES CLES ===== */}
      <section className="about-stats">
        {stats.map((s, i) => (
          <div className="about-stat" key={i}>
            <span className="about-stat-number">{s.number}</span>
            <span className="about-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ===== MISSION ===== */}
      <section className="about-mission">
        <div className="about-mission-inner">
          <h2>Notre Mission</h2>
          <p>
            Chez SmashSmash, nous croyons que le meilleur burger est celui qui est prepare
            avec des ingredients simples, frais et de qualite. Chaque bun est toaste,
            chaque steak est smash a la commande, chaque sauce est faite maison.
            Pas de compromis, juste du gout.
          </p>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="about-timeline">
        <h2>Notre Parcours</h2>
        <div className="timeline-container">
          <div className="timeline-line" />
          {timeline.map((item, i) => (
            <div className={`timeline-item ${i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`} key={i}>
              <div className="timeline-dot">
                <span>{item.year}</span>
              </div>
              <div className="timeline-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GALERIE NOS RESTAURANTS ===== */}
      <section className="about-gallery">
        <h2>Nos Restaurants</h2>
        <p className="about-gallery-desc">Decouvrez nos espaces, concus pour vous faire vivre une experience unique.</p>
        <div className="about-gallery-swiper">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={3}
            loop={true}
            speed={5000}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1.3 },
              480: { slidesPerView: 1.8 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3 },
            }}
          >
            {galleryPhotos.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="about-gallery-slide">
                  <img src={src} alt={`Restaurant SmashSmash ${i + 1}`} loading="lazy" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ===== ENGAGEMENTS ===== */}
      <section className="about-commitments">
        <div className="about-commitments-inner">
          <h2>Nos Engagements</h2>
          <p className="about-commitments-intro">
            Nous croyons qu&rsquo;une entreprise de restauration peut etre responsable et delicieuse a la fois.
          </p>
          <div className="commitments-grid">
            {commitments.map((item, i) => (
              <div className="commitment-card" key={i}>
                <div className="commitment-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="about-cta">
        <h2>Envie de rejoindre l&rsquo;aventure ?</h2>
        <p>Devenez franchise SmashSmash et ouvrez votre propre restaurant.</p>
        <div className="about-cta-buttons">
          <a href="/franchise" className="btn-pill btn-white">Devenir Franchise</a>
          <a href="/restaurants" className="btn-pill btn-outline-white">Nos Restaurants</a>
        </div>
      </section>
    </div>
  )
}
