import './BlogPage.css'

/* ================================================================
   PAGE BLOG
   ================================================================ */

const articles = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
    category: 'recettes',
    categoryLabel: 'Recettes',
    title: 'Le secret de notre sauce SmashSmash',
    excerpt: 'Decouvrez les ingredients qui font de notre sauce signature un incontournable. Une recette gardee secrete depuis nos debuts.',
    date: '12 mars 2026',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop',
    category: 'actualites',
    categoryLabel: 'Actualites',
    title: 'Nouveau restaurant a Toulouse',
    excerpt: 'SmashSmash debarque dans la ville rose ! Venez decouvrir notre nouveau restaurant au coeur du centre-ville.',
    date: '5 mars 2026',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=400&fit=crop',
    category: 'coulisses',
    categoryLabel: 'Coulisses',
    title: 'Une journee avec notre chef Lucas',
    excerpt: 'Plongez dans les coulisses de notre cuisine et suivez le quotidien de Lucas, chef de notre restaurant parisien.',
    date: '28 fevrier 2026',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&h=400&fit=crop',
    category: 'evenements',
    categoryLabel: 'Evenements',
    title: 'Festival du burger : on y sera',
    excerpt: 'Retrouvez SmashSmash au Burger Fest Paris du 15 au 17 avril. Degustations, ateliers et surprises au programme.',
    date: '20 fevrier 2026',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=400&fit=crop',
    category: 'recettes',
    categoryLabel: 'Recettes',
    title: 'Reussir son smash burger maison',
    excerpt: 'Nos astuces pour reproduire le croustillant parfait du smash burger directement dans votre cuisine.',
    date: '14 fevrier 2026',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop',
    category: 'actualites',
    categoryLabel: 'Actualites',
    title: 'Notre engagement zero dechet',
    excerpt: 'Comment nous reduisons notre empreinte ecologique : emballages recyclables, approvisionnement local et lutte contre le gaspillage.',
    date: '7 fevrier 2026',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&h=400&fit=crop',
    category: 'coulisses',
    categoryLabel: 'Coulisses',
    title: 'Comment nous selectionnons notre viande',
    excerpt: 'Rencontre avec nos eleveurs partenaires en Auvergne. Qualite, traçabilite et respect animal au coeur de nos valeurs.',
    date: '30 janvier 2026',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&h=400&fit=crop',
    category: 'evenements',
    categoryLabel: 'Evenements',
    title: 'Soiree de lancement : edition limitee truffe',
    excerpt: 'Revivez en images notre soiree de lancement du burger truffe edition limitee. Un moment inoubliable avec nos fans.',
    date: '22 janvier 2026',
  },
]

export default function BlogPage() {
  return (
    <div className="blog-page">
      {/* ===== HERO ===== */}
      <section className="blog-hero pattern-lines-dark">
        <h1>Notre Blog</h1>
        <p className="blog-hero-desc">
          Recettes, actualites, coulisses et evenements : tout l&rsquo;univers SmashSmash en un seul endroit.
        </p>
      </section>

      {/* ===== ARTICLES GRID ===== */}
      <section className="blog-grid-section">
        <div className="blog-grid-inner">
          <div className="blog-grid">
            {articles.map((article) => (
              <article key={article.id} className="blog-card">
                <div className="blog-card-image">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                  />
                </div>
                <div className="blog-card-body">
                  <span className={`blog-card-tag blog-card-tag--${article.category}`}>
                    {article.categoryLabel}
                  </span>
                  <h3 className="blog-card-title">{article.title}</h3>
                  <p className="blog-card-excerpt">{article.excerpt}</p>
                  <div className="blog-card-footer">
                    <span className="blog-card-date">{article.date}</span>
                    <a href="#" className="blog-card-link">Lire l&rsquo;article &rarr;</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
