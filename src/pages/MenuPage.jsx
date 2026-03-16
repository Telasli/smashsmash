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
  { id: 'limited', name: 'Edition Limitee', icon: 'star' },
  { id: 'burgers', name: 'Menu Burgers', icon: 'burger' },
  { id: 'chicken', name: 'Menu Poulet', icon: 'chicken' },
  { id: 'sides', name: 'Accompagnements', icon: 'fries' },
  { id: 'hotdog', name: 'Menu Hot Dog', icon: 'hotdog' },
  { id: 'shakes', name: 'Shakes + Frozen Custard', icon: 'shake' },
  { id: 'drinks', name: 'Boissons', icon: 'drink' },
]

const menuData = {
  limited: {
    title: 'EDITION LIMITEE',
    featured: {
      title: 'French Onion, Totalement Charge',
      subtitle: 'EDITION LIMITEE',
      description: "Dites bonjour a notre menu French Onion en edition limitee. C'est fondant, oignonne, croustillant et incroyablement riche. Du comfort food, mais en version extra.",
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
    },
    items: [],
  },
  burgers: {
    title: 'MENU BURGERS',
    description: "Tous nos burgers sont cuits a point sauf demande contraire, servis sur un pain pomme de terre toaste. Parcourez notre menu burgers ci-dessous.",
    items: [
      {
        name: 'SmashBurger\u2122',
        description: 'Cheeseburger avec laitue, tomate, SmashSauce',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop',
      },
      {
        name: 'Double SmashBurger\u2122',
        description: 'Double cheeseburger avec laitue, tomate, SmashSauce',
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=400&fit=crop',
      },
      {
        name: 'Triple SmashBurger\u2122',
        description: 'Triple cheeseburger avec laitue, tomate, SmashSauce',
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=400&fit=crop',
      },
      {
        name: 'SmokeSmash',
        description: 'Cheeseburger avec bacon fume au bois de pommier, laitue, tomate, piments cerises haches, SmashSauce',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
      },
      {
        name: 'Double SmokeSmash',
        description: 'Double cheeseburger avec bacon fume au bois de pommier, piments cerises haches, SmashSauce',
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=400&fit=crop',
      },
      {
        name: 'Triple SmokeSmash',
        description: 'Triple cheeseburger avec bacon fume au bois de pommier, piments cerises haches, SmashSauce',
        image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=400&fit=crop',
      },
      {
        name: 'SmashMeister\u2122',
        description: 'Cheeseburger avec echalotes croustillantes marinees a la SmashMeister Ale, SmashSauce',
        image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=400&fit=crop',
      },
      {
        name: 'Double SmashMeister\u2122',
        description: 'Double cheeseburger avec echalotes croustillantes marinees a la SmashMeister Ale, SmashSauce',
        image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=400&fit=crop',
      },
      {
        name: 'Smash Stack',
        description: "SmashBurger avec un champignon portobello frit et farci au fromage fondu",
        image: 'https://images.unsplash.com/photo-1608767221051-2b9d18f35a2f?w=400&h=400&fit=crop',
      },
      {
        name: 'Veggie Smash',
        description: 'Galette de legumes croustillante panee avec laitue, tomate, SmashSauce vegan',
        image: 'https://images.unsplash.com/photo-1520072959219-c595e6cdc073?w=400&h=400&fit=crop',
      },
      {
        name: "'Shroom Burger",
        description: 'Champignon portobello frit et farci au fromage fondu avec laitue, tomate, SmashSauce',
        image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=400&h=400&fit=crop',
      },
      {
        name: 'Hamburger',
        description: 'Hamburger 100% boeuf Angus sans hormones ni antibiotiques',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop',
      },
    ],
  },
  chicken: {
    title: 'MENU POULET',
    description: "Notre poulet est 100% filet, eleve en plein air. Nous preparons tous nos produits poulet avec soin pour garantir la meilleure qualite.",
    items: [
      {
        name: 'Chicken Smash\u2122',
        description: 'Filet de poulet 100% croustillant avec laitue, cornichons et mayo aux herbes buttermilk, dans un pain toaste.',
        image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=400&fit=crop',
      },
      {
        name: 'Chicken Bites',
        description: "Morceaux de poulet 100% filet, panes a la main, servis avec votre sauce au choix. Par 6 ou 10 avec sauce BBQ ou Miel Moutarde, ou ajoutez notre sauce fromage.",
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=400&fit=crop',
      },
    ],
  },
  sides: {
    title: 'ACCOMPAGNEMENTS',
    items: [
      {
        name: 'Frites',
        description: 'Croustillantes, croquantes, un pur delice de pomme de terre',
        image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=400&fit=crop',
      },
      {
        name: 'Frites au Fromage',
        description: 'Croustillantes, croquantes, un pur delice de pomme de terre nappes de notre melange special de cheddar et fromage americain',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop',
      },
      {
        name: 'Onion Rings',
        description: "Rondelles d'oignon croustillantes panees a la biere, faites a partir d'oignons doux espagnols, servies avec une sauce creme aigre et oignon.",
        image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=400&fit=crop',
      },
    ],
  },
  hotdog: {
    title: 'MENU HOT DOG',
    items: [
      {
        name: 'Hot Dog',
        description: 'Authentique hot dog allemand 100% boeuf',
        image: 'https://images.unsplash.com/photo-1612392062126-2f5b0ced0497?w=400&h=400&fit=crop',
      },
    ],
  },
  shakes: {
    title: 'SHAKES + FROZEN CUSTARD',
    description: "Nos milkshakes sont faits main avec du vrai lait et notre Frozen Custard cremeux. Notre Frozen Custard est prepare frais chaque jour sur place.",
    items: [
      {
        name: 'Shake Vanille',
        description: 'Milkshake fait main avec du Frozen Custard vanille et du lait entier',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop',
      },
      {
        name: 'Shake Chocolat',
        description: 'Milkshake fait main avec du Frozen Custard chocolat et du lait entier',
        image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400&h=400&fit=crop',
      },
      {
        name: 'Shake Caramel',
        description: 'Milkshake fait main avec du Frozen Custard caramel et du lait entier',
        image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=400&fit=crop',
      },
      {
        name: 'Shake Fraise',
        description: 'Milkshake fait main avec du Frozen Custard fraise et du lait entier',
        image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=400&fit=crop',
      },
      {
        name: 'Concrete',
        description: 'Frozen Custard dense et cremeux melange avec des garnitures au choix',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop',
      },
    ],
  },
  drinks: {
    title: 'BOISSONS',
    items: [
      {
        name: 'Limonade Maison',
        description: 'Limonade fraichement preparee sur place chaque jour',
        image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=400&fit=crop',
      },
      {
        name: 'The Glace',
        description: 'The glace fraichement infuse, non sucre',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',
      },
      {
        name: 'Boissons Gazeuses',
        description: 'Coca-Cola, Sprite, Fanta et plus encore',
        image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=400&fit=crop',
      },
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
                        <h3 className="menu-item-name">{item.name}</h3>
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
