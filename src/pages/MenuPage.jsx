import { useState, useRef, useEffect } from 'react'
import './MenuPage.css'

/* ================================================================
   ICONES SVG POUR LES CATEGORIES
   ================================================================ */
const CategoryIcons = {
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  burger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 15h16M4 15c0 3 3 5 8 5s8-2 8-5M4 12h16M4 12c0-4 3-8 8-8s8 4 8 8" />
      <path d="M6 12h12" />
    </svg>
  ),
  chicken: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3c-3 0-6 3-6 7 0 2 1 4 2 5l-1 6h10l-1-6c1-1 2-3 2-5 0-4-3-7-6-7z" />
    </svg>
  ),
  fries: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 22l1-12h10l1 12H6z" />
      <path d="M8 10V4M12 10V2M16 10V4" />
    </svg>
  ),
  hotdog: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="12" rx="10" ry="5" />
      <path d="M4 10c2-1 4 1 6 0s4-1 6 0s2 1 4 0" />
    </svg>
  ),
  shake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 22l1-12h6l1 12H8z" />
      <path d="M7 10h10" />
      <path d="M9 10c0-3 1-5 3-7" />
      <circle cx="12" cy="6" r="2" />
    </svg>
  ),
  drink: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 22l1-14h6l1 14H8z" />
      <path d="M6 8h12" />
      <path d="M10 8l-2-5h8l-2 5" />
    </svg>
  ),
}

/* ================================================================
   DONNEES DU MENU
   ================================================================ */
const categories = [
  { id: 'box', name: 'Nos Box', icon: 'star' },
  { id: 'burgers', name: 'Burgers', icon: 'burger' },
  { id: 'chicken', name: 'Poulet', icon: 'chicken' },
  { id: 'hotdog', name: 'Hot Dog', icon: 'hotdog' },
  { id: 'frites', name: 'Nos Frites', icon: 'fries' },
  { id: 'salade', name: 'Salade', icon: 'fries' },
  { id: 'petitesfaims', name: 'Petites Faims', icon: 'fries' },
  { id: 'boissons', name: 'Boissons', icon: 'drink' },
  { id: 'shakes', name: 'Shakes Smash', icon: 'shake' },
  { id: 'smice', name: 'Smice', icon: 'shake' },
  { id: 'veggies', name: 'Veggies', icon: 'burger' },
]

const menuData = {
  box: {
    title: 'NOS BOX',
    description: "Composez votre box avec les produits de votre choix : burgers, frites et boissons.",
    items: [
      { name: '2 for U', description: '2 produits au choix + 1 frite + 1 boisson 33cl', price: '16,50\u20ac', image: '/menu/box-4foryou.jpg' },
      { name: '4 for U', description: '4 produits au choix + 2 frites + 2 boissons 33cl', price: '32,00\u20ac', image: '/menu/box-4foryou.jpg' },
      { name: 'Big Box', description: '10 produits au choix + 5 frites + 5 boissons 33cl', price: '84,90\u20ac', image: '/menu/box-4foryou.jpg' },
      { name: 'Kid Box', description: 'Saucisse volaille + 1 frite + 1 boisson 33cl', price: '5,90\u20ac', image: '/menu/hotdog-classic.jpeg' },
    ],
  },
  burgers: {
    title: 'BURGERS',
    description: "+4,50\u20ac frites et boisson. Tous nos burgers sont prepares avec du bun, irish steak et des ingredients frais.",
    items: [
      { name: 'Smash Burger', description: 'Bun, irish steak, cheddar, oignons, salade, tomate, pickles, sauce smash.', price: '6,90\u20ac', image: '/menu/smash-burger.jpeg' },
      { name: 'Cheese Burger', description: 'Bun, irish steak, cheddar, pickles, oignons, sauce ketchup moutarde.', price: '6,50\u20ac', image: '/menu/cheese-burger.jpeg' },
      { name: 'Chili Smash', description: 'Bun, irish steak, bacon, tomate, cheddar, salade, jalapenos, oignons, pickles, sauce spicy.', price: '8,50\u20ac', image: '/menu/chili-smash.jpeg' },
      { name: 'Fungi Smash', description: 'Bun, irish steak, cheddar, salade, tomate, oignons, champignons grilles, pickles, smoky sauce.', price: '7,50\u20ac', image: '/menu/fungi-smash.jpeg' },
      { name: 'Big Smash', description: 'Bun, cheddar, double irish steak, oignons, pickles, salade iceberg, sauce biggy.', price: '8,50\u20ac', image: '/menu/big-smash.jpeg' },
      { name: 'Avocado Cheese', description: 'Bun, irish steak, cheddar, oignons, pickles, avocat, salade, tomate, sauce smash.', price: '8,50\u20ac', image: '/menu/avocado-cheese.jpeg' },
      { name: 'Smoke Smash', description: 'Bun, irish steak, bacon, cheddar, oignons, salade, tomate, pickles, smoky sauce.', price: '8,50\u20ac', image: '/menu/smoke-smash.jpeg' },
      { name: 'Double Ton Smash !', description: 'Supplement steak pour doubler le plaisir.', price: '+2,50\u20ac', image: '/menu/big-smash.jpeg', tag: 'Supplement', tagColor: 'amber' },
    ],
  },
  chicken: {
    title: 'POULET',
    description: "Nos burgers poulet sont prepares avec du bun et du crispy chicken de qualite.",
    items: [
      { name: 'Hot Chick\u2019n', description: 'Bun, crispy chicken, cheddar, jalapenos, tomate, oignons, salade, pickles, sauce spicy.', price: '6,90\u20ac', image: '/menu/hot-chickn.jpeg' },
      { name: 'Avocado Chick\u2019n', description: 'Bun, crispy chicken, cheddar, oignons, avocat, salade, tomate, pickles, sauce smash.', price: '7,90\u20ac', image: '/menu/avocado-chickn.jpeg' },
      { name: 'Chick\u2019n Smash', description: 'Bun, crispy chicken, cheddar, oignons, tomate, salade, pickles, sauce smash.', price: '6,90\u20ac', image: '/menu/chickn-smash.jpeg' },
      { name: 'BBQ Smash', description: 'Bun, crispy chicken, cheddar, bacon, salade, tomate, oignons, pickles, sauce barbecue.', price: '7,90\u20ac', image: '/menu/bbq-smash.jpeg' },
    ],
  },
  hotdog: {
    title: 'HOT DOG',
    description: "+4,50\u20ac frites et boisson. Nos hot dogs sont prepares avec une saucisse de boeuf de qualite.",
    items: [
      { name: 'Classic', description: 'Saucisse de boeuf, pickles, ketchup, moutarde.', price: '5,00\u20ac', image: '/menu/hotdog-classic.jpeg' },
      { name: 'New York Style', description: 'Saucisse de boeuf, ketchup, moutarde, relish pickles, oignon crispy.', price: '5,40\u20ac', image: '/menu/hotdog-newyork.jpeg' },
      { name: 'Spicy Bird', description: 'Saucisse de boeuf, sauce cheddar, ketchup, moutarde, relish pickles, jalapenos, oignon crispy.', price: '6,00\u20ac', image: '/menu/hotdog-spicy.jpeg' },
      { name: 'Bacon Cheese', description: 'Saucisse de boeuf, bacon de boeuf, sauce cheddar, ketchup, moutarde, relish pickles, oignon crispy.', price: '6,40\u20ac', image: '/menu/hotdog-bacon.jpeg' },
    ],
  },
  frites: {
    title: 'NOS FRITES',
    items: [
      { name: 'Nature ou Epice', description: 'Frites crinkle-cut croustillantes, nature ou assaisonnees aux epices.', price: '2,50\u20ac', image: '/menu/frites-nature.jpg' },
      { name: 'Cheddar', description: 'Frites nappees de sauce cheddar fondante.', price: '3,50\u20ac', image: '/menu/frites-cheddar.jpg' },
      { name: 'Cheddar Piment', description: 'Frites nappees de sauce cheddar et piments jalapenos.', price: '4,00\u20ac', image: '/menu/frites-cheddar-piment.jpg' },
      { name: 'Cheddar & Bacon', description: 'Frites nappees de sauce cheddar et morceaux de bacon croustillant.', price: '4,50\u20ac', image: '/menu/frites-cheddar-bacon.jpg' },
    ],
  },
  salade: {
    title: 'SALADE',
    items: [
      { name: 'Crousti', description: 'Salade, tomate cerise, des de fromage, poulet pane croustillant.', price: '8,00\u20ac', image: '/menu/salade-crousti.jpeg' },
    ],
  },
  petitesfaims: {
    title: 'PETITES FAIMS',
    items: [
      { name: 'Nuggets x5', description: '5 nuggets de poulet croustillants.', price: '4,20\u20ac', image: '/menu/nuggets.jpeg' },
      { name: 'Mozza Sticks x4', description: '4 batonnets de mozzarella panes et frits.', price: '4,20\u20ac', image: '/menu/mozza-sticks.jpeg' },
      { name: 'Tenders x4', description: '4 tenders de poulet croustillants.', price: '5,90\u20ac', image: '/menu/tenders.jpeg' },
    ],
  },
  boissons: {
    title: 'BOISSONS',
    items: [
      { name: 'Lemonaid', description: 'Limonade artisanale.', price: '3,50\u20ac', image: '/menu/lemonaid.jpeg' },
      { name: 'Lemonaid Orange Sanguine', description: 'Limonade artisanale orange sanguine.', price: '3,50\u20ac', image: '/menu/lemonaid-orange.jpeg' },
      { name: 'Coca', description: 'Coca-Cola 33cl.', price: '2,00\u20ac', image: '/menu/coca.jpeg' },
      { name: 'Coca Zero', description: 'Coca-Cola Zero 33cl.', price: '2,00\u20ac', image: '/menu/coca-zero.jpeg' },
      { name: 'Fuze Tea', description: 'The glace peche 33cl.', price: '2,00\u20ac', image: '/menu/fuze-tea.jpeg' },
      { name: 'Oasis', description: 'Oasis tropical 33cl.', price: '2,00\u20ac', image: '/menu/oasis.jpeg' },
      { name: 'St Pellegrino', description: 'Eau gazeuse St Pellegrino.', price: '2,00\u20ac', image: '/menu/st-pellegrino.jpeg' },
      { name: 'The Glace', description: 'The glace maison.', price: '2,00\u20ac', image: '/menu/the-glace.jpeg' },
      { name: 'Eau', description: 'Eau minerale 50cl.', price: '2,00\u20ac', image: '/menu/eau.jpeg' },
    ],
  },
  shakes: {
    title: 'SHAKES SMASH',
    description: "Saveur au choix : Fraise, Vanille ou Chocolat. Supplement topping 0,80\u20ac.",
    items: [
      { name: 'Shake Fraise', description: 'Milkshake fait maison a la fraise avec chantilly.', price: '5,90\u20ac', image: '/menu/shake-fraise.jpeg' },
      { name: 'Shake Vanille', description: 'Milkshake fait maison a la vanille avec chantilly.', price: '5,90\u20ac', image: '/menu/shake-fraise.jpeg' },
      { name: 'Shake Chocolat', description: 'Milkshake fait maison au chocolat avec chantilly.', price: '5,90\u20ac', image: '/menu/shake-fraise.jpeg' },
    ],
  },
  smice: {
    title: 'SMICE',
    description: "1 coulis + 1 croquant. Supplement topping 0,90\u20ac. Topping coulant : Caramel, Fraise, Chocolat. Topping croquant : Daim, Eclat de cacahuete, Crunch, M&M\u2019s, Cookie Granola.",
    items: [
      { name: 'Smice', description: 'Glace soft avec 1 coulis et 1 topping croquant au choix.', price: '3,90\u20ac', image: '/menu/smice.jpeg' },
      { name: 'Smice Croquant', description: 'Glace soft avec coulis caramel et eclats croquants.', price: '3,90\u20ac', image: '/menu/smice-croquant.jpeg' },
    ],
  },
  veggies: {
    title: 'VEGGIES',
    description: "+4,50\u20ac frites et boisson. Nos options vegetariennes et veganes.",
    items: [
      { name: 'Veggie Smash', description: 'Sauce smash, oignons, cornichons, avocat, champignons grilles, cheddar, salade.', price: '7,50\u20ac', image: '/menu/vegee.jpeg' },
      { name: 'Veggie Chick\u2019n Smash', description: 'Sauce smash, oignons, pickles, Chicken veggie, cheddar, salade, tomate.', price: '11,50\u20ac', image: '/menu/vegee.jpeg' },
      { name: 'Veggie Beef Smash', description: 'Sauce smash, oignons, cornichons, steak veggie, cheddar, salade, tomate.', price: '9,50\u20ac', image: '/menu/vegee.jpeg' },
      { name: 'Nuggets Veggie x5', description: '5 nuggets vegetariens croustillants.', price: '6,00\u20ac', image: '/menu/nuggets.jpeg' },
    ],
  },
}

/* ================================================================
   COMPOSANT MENU PAGE
   ================================================================ */
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('burgers')
  const tabsRef = useRef(null)
  const sectionRefs = useRef({})

  const scrollTabIntoView = (id) => {
    const tabEl = document.querySelector(`[data-tab="${id}"]`)
    if (tabEl && tabsRef.current) {
      const container = tabsRef.current
      const scrollLeft = tabEl.offsetLeft - container.offsetWidth / 2 + tabEl.offsetWidth / 2
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }

  const handleCategoryClick = (id) => {
    setActiveCategory(id)
    scrollTabIntoView(id)
    const el = sectionRefs.current[id]
    if (el) {
      const offset = 160
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id)
            scrollTabIntoView(entry.target.id)
          }
        })
      },
      { rootMargin: '-200px 0px -60% 0px', threshold: 0 }
    )

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTabs = (dir) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' })
    }
  }

  return (
    <div className="menu-page">
      {/* ===== HEADER ===== */}
      <div className="menu-page-header pattern-lines-dark">
        <div className="menu-page-header-inner">
          <h1>Notre Menu</h1>
          <a href="/restaurants" className="btn-pill btn-green-solid">Commander</a>
        </div>
      </div>

      {/* ===== BARRE DE CATEGORIES (sticky) ===== */}
      <div className="menu-tabs-bar">
        <button className="menu-tabs-arrow menu-tabs-arrow--left" onClick={() => scrollTabs(-1)} aria-label="Defiler a gauche">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="menu-tabs" ref={tabsRef}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              data-tab={cat.id}
              className={`menu-tab ${activeCategory === cat.id ? 'menu-tab--active' : ''}`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <span className="menu-tab-icon">{CategoryIcons[cat.icon]}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <button className="menu-tabs-arrow menu-tabs-arrow--right" onClick={() => scrollTabs(1)} aria-label="Defiler a droite">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      {/* ===== CONTENU DU MENU ===== */}
      <div className="menu-page-content">
        {categories.map((cat) => {
          const data = menuData[cat.id]
          if (!data) return null

          return (
            <section
              key={cat.id}
              id={cat.id}
              ref={(el) => (sectionRefs.current[cat.id] = el)}
              className="menu-section"
            >
              {/* Titre de la section */}
              <h2 className="menu-section-title">{data.title}</h2>

              {/* Featured banner pour Edition Limitee */}
              {data.featured && (
                <div className="menu-featured">
                  <div className="menu-featured-image">
                    <img src={data.featured.image} alt={data.featured.title} loading="lazy" />
                  </div>
                  <div className="menu-featured-content">
                    <span className="menu-featured-tag">{data.featured.subtitle}</span>
                    <h2 className="menu-featured-title">{data.featured.title}</h2>
                    <p>{data.featured.description}</p>
                    <div className="menu-featured-buttons">
                      <a href="/restaurants" className="btn-pill btn-green-solid">Commander</a>
                      <a href="#" className="btn-pill btn-outline-black">Explorer le menu limite</a>
                    </div>
                  </div>
                </div>
              )}
              {data.description && (
                <p className="menu-section-desc">{data.description}</p>
              )}

              {/* Grille de produits */}
              {data.items.length > 0 && (
                <div className="menu-grid">
                  {data.items.map((item, i) => (
                    <div className="menu-item-card" key={i}>
                      <div className="menu-item-image">
                        <img src={item.image} alt={item.name} loading="lazy" />
                      </div>
                      <div className="menu-item-info">
                        {item.tag && (
                          <span className={`menu-item-tag menu-item-tag--${item.tagColor || 'green'}`}>
                            {item.tag}
                          </span>
                        )}
                        <div className="menu-item-name-row">
                          <h3 className="menu-item-name">{item.name}</h3>
                          {item.price && <span className="menu-item-price">{item.price}</span>}
                        </div>
                        <p className="menu-item-desc">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
