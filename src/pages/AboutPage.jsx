import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import './AboutPage.css'

/* ================================================================
   PAGE NOTRE HISTOIRE - STYLE EDITORIAL
   ================================================================ */

const adnItems = [
  {
    image: '/menu/smash-burger.jpeg',
    title: 'Le Smash',
    text: "Notre technique signature : chaque steak est presse a la plancha pour obtenir cette croute caramelisee unique. Croustillant a l\u2019exterieur, juteux a l\u2019interieur.",
  },
  {
    image: '/menu/frites-cheddar-bacon.jpg',
    title: 'Les Ingredients',
    text: "Boeuf Irish Steak, cheddar affine, buns toastes, sauces maison. Chaque ingredient est selectionne pour sa qualite et son gout authentique.",
  },
  {
    image: '/restau-9.jpg',
    title: "L\u2019Experience",
    text: "Un cadre moderne et chaleureux, un service rapide, une ambiance conviviale. SmashSmash, c\u2019est plus qu\u2019un burger, c\u2019est un moment.",
  },
]

const story = [
  {
    image: '/restau-bordeaux-1.jpg',
    year: '2019',
    title: "Tout commence avec une obsession",
    text: "Deux amis, un voyage a Los Angeles, et une revelation : le smash burger. De retour en France, une seule idee en tete : faire le meilleur burger possible avec les meilleurs ingredients locaux.",
  },
  {
    image: '/restau-5.jpg',
    year: '2020',
    title: "Le premier SmashSmash ouvre a Bordeaux",
    text: "277 Rue Sainte-Catherine. Des la premiere semaine, c\u2019est la queue devant la porte. Le bouche-a-oreille fait le reste. Le concept est valide.",
  },
  {
    image: '/restau-8.jpg',
    year: '2023-2024',
    title: "L\u2019expansion commence",
    text: "Saint-Germain-en-Laye, Calais, bientot la Belgique et Dubai. Chaque nouveau restaurant garde l\u2019ADN SmashSmash : produits frais, cuisson parfaite, experience unique.",
  },
]

const values = [
  { title: 'Local', text: "Viande francaise, legumes de producteurs locaux, partenariats de proximite." },
  { title: 'Qualite', text: "Aucun compromis sur les ingredients. Tout est frais, rien n\u2019est surgele." },
  { title: 'Responsable', text: "Emballages recyclables, zero gaspillage, respect de l\u2019environnement." },
  { title: 'Humain', text: "Des equipes formees, valorisees, et passionnees par ce qu\u2019elles font." },
]

const galleryPhotos = [
  '/restau-1.jpg', '/restau-bordeaux-1.jpg', '/restau-5.jpg',
  '/restau-9.jpg', '/restau-8.jpg', '/restau-bordeaux-2.jpg',
  '/restau-2.jpg', '/restau-10.jpg', '/restau-4.jpg',
]

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* ===== HERO MINIMAL ===== */}
      <section className="about-hero-minimal">
        <span className="about-hero-label">Notre Histoire</span>
        <h1>On ne fait pas des burgers.<br /><span>On fait des SmashSmash.</span></h1>
      </section>

      {/* ===== NOTRE ADN ===== */}
      <section className="about-adn">
        {adnItems.map((item, i) => (
          <div className="adn-card" key={i}>
            <div className="adn-card-image">
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
            <div className="adn-card-content">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ===== CHIFFRES (bandeau) ===== */}
      <section className="about-numbers">
        <div className="about-number"><strong>2019</strong><span>Creation</span></div>
        <div className="about-number-sep" />
        <div className="about-number"><strong>5+</strong><span>Restaurants</span></div>
        <div className="about-number-sep" />
        <div className="about-number"><strong>3</strong><span>Pays</span></div>
        <div className="about-number-sep" />
        <div className="about-number"><strong>500K+</strong><span>Burgers vendus</span></div>
      </section>

      {/* ===== STORYTELLING ZIGZAG ===== */}
      <section className="about-story">
        {story.map((item, i) => (
          <div className={`story-block ${i % 2 !== 0 ? 'story-block--reverse' : ''}`} key={i}>
            <div className="story-block-image">
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
            <div className="story-block-content">
              <span className="story-block-year">{item.year}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ===== NOS VALEURS ===== */}
      <section className="about-values">
        <h2>Nos Valeurs</h2>
        <div className="values-grid">
          {values.map((v, i) => (
            <div className="value-card" key={i}>
              <span className="value-number">0{i + 1}</span>
              <h4>{v.title}</h4>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GALERIE ===== */}
      <section className="about-gallery">
        <div className="about-gallery-swiper">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={4}
            loop={true}
            speed={6000}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1.5 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {galleryPhotos.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="about-gallery-slide">
                  <img src={src} alt={`Restaurant ${i + 1}`} loading="lazy" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="about-cta">
        <h2>Envie de rejoindre l&rsquo;aventure ?</h2>
        <p>Ouvrez votre propre SmashSmash.</p>
        <a href="/franchise" className="btn-pill btn-white">Devenir Franchise</a>
      </section>
    </div>
  )
}
