import { useState } from 'react'
import './FranchisePage.css'

/* ================================================================
   PAGE DEVENIR FRANCHISE
   ================================================================ */

const advantages = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 4v16l12 8-12 8-12-8 12-8" />
        <path d="M12 20v12l12 8 12-8V20" />
      </svg>
    ),
    title: 'Marque forte',
    description: "Beneficiez de la notoriete SmashSmash, une marque reconnue et aimee par des milliers de clients fideles a travers la France.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="22" width="36" height="20" rx="3" />
        <path d="M16 22V14a8 8 0 1 1 16 0v8" />
        <circle cx="24" cy="33" r="3" />
        <path d="M24 36v3" />
      </svg>
    ),
    title: 'Formation complete',
    description: "Un programme de formation intensif de 6 semaines couvrant operations, management, marketing et gestion financiere.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" />
        <path d="M24 14v10l7 7" />
      </svg>
    ),
    title: 'Retour sur investissement rapide',
    description: "Nos franchises atteignent en moyenne leur seuil de rentabilite en 14 mois grace a un modele eprouve et optimise.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="6" />
        <circle cx="32" cy="16" r="6" />
        <circle cx="24" cy="32" r="6" />
        <path d="M20 20l4 8M28 20l-4 8M16 22v4M32 22v4" />
      </svg>
    ),
    title: 'Accompagnement continu',
    description: "Une equipe dediee vous accompagne au quotidien : recherche de local, amenagement, lancement et suivi des performances.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 40V20l18-14 18 14v20H6z" />
        <rect x="18" y="28" width="12" height="12" />
        <path d="M24 6v6" />
      </svg>
    ),
    title: 'Supply chain optimisee',
    description: "Acces a nos fournisseurs negocies, notre logistique centralisee et nos ingredients premium a des tarifs preferentiels.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 40l6-12 8 6 8-16 10 22" />
        <path d="M8 40h32" />
      </svg>
    ),
    title: 'Marketing national',
    description: "Beneficiez de campagnes marketing nationales, d'une presence social media forte et d'outils de communication cles en main.",
  },
]

const steps = [
  { number: '01', title: 'Candidature', description: "Remplissez le formulaire ci-dessous. Notre equipe examine chaque dossier avec attention." },
  { number: '02', title: 'Entretien', description: "Echange avec notre equipe franchise pour discuter de votre projet, vos motivations et votre vision." },
  { number: '03', title: 'Validation', description: "Etude de votre dossier financier et validation de votre candidature par le comite de direction." },
  { number: '04', title: 'Recherche du local', description: "Notre equipe immobiliere vous aide a trouver l'emplacement ideal pour votre restaurant." },
  { number: '05', title: 'Formation', description: "6 semaines de formation intensive dans un de nos restaurants ecoles." },
  { number: '06', title: 'Ouverture', description: "Lancement de votre restaurant avec le soutien complet de notre equipe sur place." },
]

const stats = [
  { value: '15+', label: 'Restaurants' },
  { value: '500K+', label: 'Burgers vendus' },
  { value: '14', label: "Mois pour la rentabilite" },
  { value: '95%', label: 'Satisfaction franchises' },
]

export default function FranchisePage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    city: '', investment: '', message: '', experience: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Merci pour votre candidature ! Notre equipe vous contactera sous 48h.')
  }

  return (
    <div className="franchise-page">
      {/* ===== HERO ===== */}
      <section className="franchise-hero">
        <div className="franchise-hero-bg pattern-lines">
          <div className="franchise-hero-content">
            <span className="franchise-hero-tag">Rejoignez l&rsquo;aventure</span>
            <h1>Devenez Franchise SmashSmash</h1>
            <p>
              Vous etes passionne par la restauration et souhaitez rejoindre une marque
              en pleine croissance ? Decouvrez comment ouvrir votre propre SmashSmash.
            </p>
            <a href="#contact-form" className="btn-pill btn-white">Postuler maintenant</a>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="franchise-stats">
        <div className="franchise-stats-inner">
          {stats.map((stat, i) => (
            <div className="franchise-stat" key={i}>
              <span className="franchise-stat-value">{stat.value}</span>
              <span className="franchise-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== AVANTAGES ===== */}
      <section className="franchise-advantages">
        <div className="franchise-advantages-inner">
          <h2>Pourquoi SmashSmash ?</h2>
          <p className="franchise-advantages-intro">
            Rejoindre SmashSmash, c&rsquo;est integrer un reseau solide avec un concept eprouve
            et un accompagnement a chaque etape.
          </p>
          <div className="advantages-grid">
            {advantages.map((item, i) => (
              <div className="advantage-card" key={i}>
                <div className="advantage-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ETAPES ===== */}
      <section className="franchise-steps">
        <div className="franchise-steps-inner">
          <h2>Le parcours franchise</h2>
          <p className="franchise-steps-intro">
            De la candidature a l&rsquo;ouverture, nous vous accompagnons a chaque etape.
          </p>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div className="step-card" key={i}>
                <span className="step-number">{step.number}</span>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEMOIGNAGE ===== */}
      <section className="franchise-testimonial">
        <div className="franchise-testimonial-inner">
          <blockquote>
            &laquo; Ouvrir un SmashSmash a ete la meilleure decision de ma carriere.
            L&rsquo;accompagnement est exceptionnel et les resultats ont depasse
            toutes mes attentes des le premier mois. &raquo;
          </blockquote>
          <div className="testimonial-author">
            <div className="testimonial-avatar">JR</div>
            <div>
              <strong>Julien Roux</strong>
              <span>Franchise SmashSmash Lyon</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FORMULAIRE DE CONTACT ===== */}
      <section className="franchise-form-section" id="contact-form">
        <div className="franchise-form-inner">
          <div className="franchise-form-info">
            <h2>Candidature Franchise</h2>
            <p>
              Remplissez ce formulaire pour nous faire part de votre interet.
              Notre equipe franchise vous recontactera sous 48 heures pour
              un premier echange.
            </p>
            <div className="franchise-form-details">
              <div className="franchise-detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>01 23 45 67 89</span>
              </div>
              <div className="franchise-detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>franchise@smashsmash.fr</span>
              </div>
              <div className="franchise-detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>12 Rue de la Paix, 75002 Paris</span>
              </div>
            </div>
          </div>

          <form className="franchise-form" onSubmit={handleSubmit}>
            <div className="franchise-form-row">
              <div className="franchise-form-group">
                <label htmlFor="firstName">Prenom *</label>
                <input type="text" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Votre prenom" required />
              </div>
              <div className="franchise-form-group">
                <label htmlFor="lastName">Nom *</label>
                <input type="text" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Votre nom" required />
              </div>
            </div>

            <div className="franchise-form-row">
              <div className="franchise-form-group">
                <label htmlFor="email">E-mail *</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="votre@email.com" required />
              </div>
              <div className="franchise-form-group">
                <label htmlFor="phone">Telephone *</label>
                <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="06 12 34 56 78" required />
              </div>
            </div>

            <div className="franchise-form-row">
              <div className="franchise-form-group">
                <label htmlFor="city">Ville souhaitee *</label>
                <input type="text" id="city" name="city" value={form.city} onChange={handleChange} placeholder="Paris, Lyon, Marseille..." required />
              </div>
              <div className="franchise-form-group">
                <label htmlFor="investment">Budget d&rsquo;investissement *</label>
                <select id="investment" name="investment" value={form.investment} onChange={handleChange} required>
                  <option value="">Selectionnez</option>
                  <option value="150-250k">150 000 - 250 000 EUR</option>
                  <option value="250-400k">250 000 - 400 000 EUR</option>
                  <option value="400k+">400 000 EUR et plus</option>
                </select>
              </div>
            </div>

            <div className="franchise-form-group franchise-form-group--full">
              <label htmlFor="experience">Experience en restauration</label>
              <select id="experience" name="experience" value={form.experience} onChange={handleChange}>
                <option value="">Selectionnez</option>
                <option value="none">Aucune experience</option>
                <option value="1-3">1 a 3 ans</option>
                <option value="3-5">3 a 5 ans</option>
                <option value="5+">Plus de 5 ans</option>
                <option value="franchise">Deja franchise d&rsquo;une autre marque</option>
              </select>
            </div>

            <div className="franchise-form-group franchise-form-group--full">
              <label htmlFor="message">Votre message *</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Parlez-nous de votre projet, vos motivations..." rows={5} required />
            </div>

            <div className="franchise-form-consent">
              <label>
                <input type="checkbox" required />
                J&rsquo;accepte que mes donnees soient traitees dans le cadre de ma candidature franchise.
                Voir notre <a href="#">politique de confidentialite</a>.
              </label>
            </div>

            <button type="submit" className="btn-pill btn-green-solid franchise-submit">
              Envoyer ma candidature
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
