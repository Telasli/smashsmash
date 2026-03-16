import './AboutPage.css'

/* ================================================================
   PAGE NOTRE HISTOIRE
   ================================================================ */

const timeline = [
  {
    year: '2019',
    title: "L'idee est nee",
    description: "Deux amis passionnes de street food decouvrent le smash burger lors d'un voyage a Los Angeles et decident de ramener le concept en France.",
  },
  {
    year: '2020',
    title: 'Premier restaurant',
    description: "Ouverture du tout premier SmashSmash dans le Marais a Paris. Le succes est immediat : files d'attente des la premiere semaine.",
  },
  {
    year: '2022',
    title: 'Expansion nationale',
    description: "Forte de son succes parisien, la marque s'installe a Lyon, Marseille et Bordeaux. 8 restaurants ouverts en un an.",
  },
  {
    year: '2024',
    title: '15 restaurants',
    description: 'SmashSmash est desormais present dans les grandes villes francaises avec plus de 500 000 burgers vendus.',
  },
  {
    year: '2025',
    title: "Et ce n'est que le debut",
    description: 'De nouveaux restaurants en preparation, des collaborations avec des chefs etoiles et des recettes toujours plus creatives.',
  },
]

const team = [
  {
    initials: 'TD',
    name: 'Thomas Durand',
    role: 'Co-fondateur & CEO',
    description: "Ancien chef de cuisine, passionne par la street food et l'entrepreneuriat.",
  },
  {
    initials: 'ML',
    name: 'Marie Lefevre',
    role: 'Co-fondatrice & Directrice Creative',
    description: "Designer culinaire, elle imagine chaque nouvelle recette et l'identite visuelle de la marque.",
  },
  {
    initials: 'AM',
    name: 'Antoine Mercier',
    role: 'Head Chef',
    description: 'Forme dans les plus grands restaurants parisiens, il supervise la qualite dans tous nos restaurants.',
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
    description: "Notre viande provient exclusivement d'elevages francais partenaires, nos legumes de producteurs locaux.",
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
    description: "Nous avons reduit nos dechets de 60% grace a un systeme de gestion des stocks intelligent et des partenariats avec des associations.",
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
    description: "Tous nos emballages sont compostables ou recyclables. Nous visons le 100% sans plastique d'ici fin 2026.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="14" r="8" />
        <path d="M8 44c0-8 7-16 16-16s16 8 16 16" />
      </svg>
    ),
    title: 'Bien-etre au travail',
    description: "Salaires au-dessus du marche, formation continue et perspectives d'evolution pour chaque membre de notre equipe.",
  },
]

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* ===== HERO ===== */}
      <section className="about-hero pattern-lines">
        <div className="about-hero-inner">
          <div className="about-hero-content">
            <span className="about-hero-tag">Notre Histoire</span>
            <h1>Ne de la passion du Smash Burger</h1>
            <p className="about-hero-lead">
              Depuis 2019, SmashSmash ecrit une nouvelle page de la street food en France.
              Des ingredients sourcés localement, une cuisson signature et un engagement
              sans compromis pour le gout.
            </p>
            <div className="about-hero-buttons">
              <a href="/menu" className="btn-pill btn-white">Voir le Menu</a>
              <a href="/restaurants" className="btn-pill btn-outline-white">Nos Restaurants</a>
            </div>
          </div>
          <div className="about-hero-image">
            <img
              src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=700&h=500&fit=crop"
              alt="Restaurant SmashSmash"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="about-timeline">
        <h2>Notre Histoire</h2>
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

      {/* ===== EQUIPE ===== */}
      <section className="about-team">
        <div className="about-team-inner">
          <h2>L&rsquo;equipe</h2>
          <p className="about-team-intro">
            Des passionnes qui travaillent chaque jour pour vous offrir la meilleure experience burger.
          </p>
          <div className="team-grid">
            {team.map((member, i) => (
              <div className="team-card" key={i}>
                <div className="team-avatar">
                  <span>{member.initials}</span>
                </div>
                <h4>{member.name}</h4>
                <span className="team-role">{member.role}</span>
                <p>{member.description}</p>
              </div>
            ))}
          </div>
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
    </div>
  )
}
