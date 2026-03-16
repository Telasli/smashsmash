# SmashSmash - Site Vitrine (Version Francaise)

## Presentation du projet

Site vitrine pour **SmashSmash**, marque de smash burgers nee en France. Application React/Vite single-page avec routing cote client. Initialement inspire de Shake Shack UK, desormais entierement personnalise avec branding, contenu et restaurants propres a SmashSmash.

## Stack technique

- **Framework** : React 19 + Vite 7
- **Routing** : React Router DOM v7 (`BrowserRouter`, `NavLink` pour liens actifs)
- **Carousel** : Swiper.js (module Navigation)
- **Fonts** : Google Fonts - Jost (400, 500, 700, 800, 900)
- **CSS** : CSS pur (pas de framework), un fichier CSS par page + App.css pour les styles globaux/partages
- **Langue** : Francais (html lang="fr")

## Architecture des fichiers

```
shakeshack-uk/
├── index.html                    # Point d'entree, Google Fonts, lang="fr", favicon logo_smash.png
├── public/
│   ├── logo_smash.png            # Logo SmashSmash (utilise navbar + footer + favicon)
│   └── faviconV2.png             # Favicon alternatif (non utilise)
├── src/
│   ├── main.jsx                  # Routing + Layout (Navbar + Footer wrappent chaque page)
│   ├── App.jsx                   # Page d'accueil (hero, menu carousel, livraison CTA, blog, locations, breakfast, newsletter, sustainability, livraison CTA 2, instagram)
│   ├── App.css                   # Styles globaux + variables CSS + styles accueil + patterns
│   ├── index.css                 # Reset CSS + styles de base (body, headings)
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation partagee (logo PNG, NavLink avec etat actif, bouton Commander)
│   │   └── Footer.jsx            # Footer partage (liens React Router, reseaux sociaux, pattern leger)
│   └── pages/
│       ├── MenuPage.jsx          # Page menu avec categories sticky, scroll-spy, grille produits
│       ├── MenuPage.css
│       ├── LocationsPage.jsx     # Page restaurants simplifiee (hero + recherche + grille)
│       ├── LocationsPage.css
│       ├── BlogPage.jsx          # Page blog avec grille d'articles
│       ├── BlogPage.css
│       ├── AboutPage.jsx         # Page "Notre Histoire" avec hero vert, timeline, equipe, engagements
│       ├── AboutPage.css
│       ├── FranchisePage.jsx     # Page "Devenir Franchise" avec formulaire de contact
│       └── FranchisePage.css
```

## Routes

| Route              | Composant        | Description                                |
|--------------------|------------------|--------------------------------------------|
| `/`                | `App`            | Page d'accueil                             |
| `/menu`            | `MenuPage`       | Menu complet avec 7 categories             |
| `/restaurants`     | `LocationsPage`  | Recherche + grille de 7 restaurants        |
| `/blog`            | `BlogPage`       | Blog avec 8 articles en grille             |
| `/notre-histoire`  | `AboutPage`      | A propos, timeline, equipe, engagements    |
| `/franchise`       | `FranchisePage`  | Devenir franchise + formulaire             |

## Navigation (Navbar)

Liens dans l'ordre : **Menu** | **Nos Restaurants** | **Blog** | **Notre Histoire** | **Devenir Franchise** | **Commander** (bouton vert)

- `NavLink` de React Router avec classe `.active` (couleur verte + bordure) pour indiquer la page courante
- Pas de bandeau d'annonce (supprime)
- Pas de fleches dropdown sur les liens
- Bouton "Commander" : fond vert, texte blanc (`!important`), redirige vers `/restaurants`
- Navbar sticky avec bordure verte en bas (4px)
- Logo PNG `logo_smash.png` (hauteur 65px)

## Restaurants

7 restaurants reels :
- **Ouverts** : Bordeaux, Saint Germain en Laye 78, Quimper, Anderlecht (Belgique)
- **Bientot** : Calais, Genappe (Belgique), Voiron

Chaque carte affiche un badge vert "Ouvert" ou orange "Bientot". Les restaurants "bientot" affichent "Ouverture prochaine" au lieu du bouton Commander.

## Variables CSS (App.css :root)

```css
--green-brand: #1F5C30
--green-light: #4A8C2A
--green-button: #3D7B42
--amber: #E8960C
--black: #1a1a1a
--gray-text: #707070
--gray-light-bg: #f0f0f0
--white: #ffffff
```

## Patterns decoratifs

- **`.pattern-lines`** : motifs food SVG blancs (burgers, frites, milkshakes) — utilise sur fonds verts/sombres (hero, footer, sections vertes). Opacite 0.07.
- **`.pattern-lines-dark`** : memes motifs en noir (`#1a1a1a`) — utilise sur fonds clairs (section livraison, hero page restaurants, header menu). Opacite 0.06.
- **Footer** : surcharge `.footer.pattern-lines::before` a opacite 0.02 pour rester tres discret.
- Les elements enfants utilisent `position: relative; z-index: 2` pour rester au-dessus du pattern.

## Composants partages

- **SmashSmashLogo** : composant `<img>` charge `logo_smash.png`, exporte depuis `Navbar.jsx`, utilise dans `Footer.jsx`
- **Layout** : Wrapper dans `main.jsx` qui ajoute Navbar + Footer autour de chaque page
- **Boutons pill** : Classes `.btn-pill` + variantes (`.btn-white`, `.btn-black`, `.btn-outline-black`, `.btn-outline-white`, `.btn-green-solid`)

## Pages detaillees

### Accueil (`App.jsx`)
Sections dans l'ordre : Hero (fond vert + pattern + image) → Menu carousel → Livraison CTA (texte gauche, bouton droite) → Blog → Tous les restaurants carousel → Petit-dejeuner → Newsletter → Durabilite → Livraison CTA 2 → Instagram

### Menu (`MenuPage.jsx`)
Header avec pattern + bouton Commander. 7 categories avec scroll-spy (IntersectionObserver) : Edition Limitee, Menu Burgers, Menu Poulet, Accompagnements, Menu Hot Dog, Shakes + Frozen Custard, Boissons. Titre de categorie au-dessus du banner featured.

### Restaurants (`LocationsPage.jsx`)
Page simplifiee : hero avec pattern + barre de recherche pill (fond blanc) + grille 4 colonnes de cartes restaurants.

### Blog (`BlogPage.jsx`)
Hero avec pattern + grille 4 colonnes de 8 articles. 4 categories : Recettes, Actualites, Coulisses, Evenements.

### Notre Histoire (`AboutPage.jsx`)
Hero vert brand avec pattern + boutons. Timeline (2019-2025). Equipe (3 membres). Engagements (4 cartes sur fond beige clair `#faf9f7`).

### Devenir Franchise (`FranchisePage.jsx`)
Hero vert avec pattern. Stats, avantages (6 cartes), etapes (6 etapes), temoignage, formulaire de contact complet.

## Conventions

- Tout le contenu textuel est en **francais** (pas d'accents dans le code source, `&rsquo;` pour les apostrophes)
- Images : placeholders Unsplash (pas d'images locales sauf le logo)
- Icones : SVG inline (pas de librairie d'icones)
- Un fichier CSS par page, styles globaux dans `App.css`
- Pas de TypeScript, pas de CSS modules
- Responsive : breakpoints a 1200px, 1024px, 768px, 480px
- Tous les boutons "Commander" redirigent vers `/restaurants`
- Tous les boutons "Voir le Menu" / "Decouvrir le Menu" redirigent vers `/menu`
- Footer utilise `react-router-dom` `Link` pour la navigation interne
- Instagram du footer pointe vers `https://www.instagram.com/smashsmashfr/`

## Commandes

```bash
npm run dev    # Demarre le serveur de dev sur http://localhost:5173
npm run build  # Build de production dans /dist
```
