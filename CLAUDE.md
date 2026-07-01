# SmashSmash - Site Vitrine (Version Francaise)

## Presentation du projet

Site vitrine pour **SmashSmash**, marque de smash burgers nee en France. Application React/Vite single-page avec routing cote client. Branding, contenu et restaurants propres a SmashSmash.

## Stack technique

- **Framework** : React 19 + Vite 7
- **Routing** : React Router DOM v7 (`BrowserRouter`, `NavLink` pour liens actifs)
- **Carousel** : Swiper.js (modules Navigation + Autoplay)
- **Fonts** : Cooper Hewitt (titres via fontsource CDN) + DM Sans (body via Google Fonts) + Jost (fallback)
- **CSS** : CSS pur (pas de framework), un fichier CSS par page + App.css pour les styles globaux/partages
- **Langue** : Francais (html lang="fr")
- **Edition des textes** : tous les textes visibles sont editables en ligne via `<Editable>`, stockes sur Vercel Blob, proteges par mot de passe (voir `EDITION.md`)

## Systeme d'edition des textes (Vercel)

Tous les textes du site sont modifiables en direct par un editeur connecte (voir `EDITION.md` pour la config et l'usage).

- `api/texts.js` : fonction serverless Vercel. `GET` renvoie le JSON des textes ; `POST` (protege par la variable d'env `ADMIN_PASSWORD`) l'enregistre dans le Blob `site-texts.json`. Necessite un store **Vercel Blob** (`BLOB_READ_WRITE_TOKEN`).
- `src/editable/EditableContext.jsx` : provider global (`<EditableProvider>` dans `main.jsx`) — charge les overrides, cache `localStorage`, auth par mot de passe, enregistrement auto (debounce).
- `src/editable/Editable.jsx` : `<Editable id="cle.unique" as="h2">Texte par defaut</Editable>`. Affiche l'override enregistre (via innerHTML imperatif) sinon les enfants JSX d'origine. En mode edition : `contentEditable`, enregistrement au blur, Alt+clic = reinitialiser.
- `src/editable/AdminBar.jsx` : barre d'admin cachee (revelee par **Ctrl+Shift+E** ou `#admin`), dans le `Layout`.
- **Ids** : convention `page.section.element` (ex. `home.hero.title`, `menu.item.burgers.0.name`, `about.timeline.2.desc`). Les textes partages (nav, footer) reutilisent la meme cle sur toutes les pages.
- **Degradation** : sans Blob/mot de passe configures, le site affiche les textes par defaut — rien ne casse. `npm run dev` (Vite seul) ne sert pas `/api` ; utiliser `vercel dev` pour tester l'edition.
- **Non couvert** : placeholders d'inputs, `alt` d'images, options de `<select>` (attributs, pas des noeuds texte).

## Charte graphique

- **Couleurs** : `#000106` (noir), `#50AF46` (vert brand), `#FFFFFF` (blanc)
- **Typographies** : Cooper Hewitt (titres, boutons) + DM Sans (body, inputs)
- **Logo** : `logo_smash.png` dans `/public`

## Architecture des fichiers

```
shakeshack-uk/
├── index.html                    # Point d'entree, fonts CDN, lang="fr", favicon logo_smash.png
├── public/
│   ├── logo_smash.png            # Logo SmashSmash (navbar + footer + favicon)
│   ├── video-presentation.mp4    # Video hero page d'accueil
│   ├── gallery/                  # 30 photos shooting street (street-01.jpeg a street-30.jpeg)
│   ├── menu/                     # Photos produits menu (burgers, frites, hotdogs, boissons, shakes, etc.)
│   ├── restau-*.jpg              # Photos restaurants (restau-1.jpg a restau-10.jpg, restau-bordeaux-*.jpg)
│   └── smash-*.jpg               # Photos food lifestyle (Smash Smash HD)
├── src/
│   ├── main.jsx                  # Routing + Layout (Navbar + Footer wrappent chaque page)
│   ├── App.jsx                   # Page d'accueil
│   ├── App.css                   # Styles globaux + variables CSS + styles accueil + patterns
│   ├── index.css                 # Reset CSS + styles de base (body, headings, fonts)
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation partagee (logo PNG, NavLink avec etat actif, bouton Commander, menu mobile)
│   │   └── Footer.jsx            # Footer partage (liens, reseaux sociaux Instagram/TikTok/Facebook)
│   └── pages/
│       ├── MenuPage.jsx          # Page menu avec 11 categories, scroll-spy, grille produits
│       ├── MenuPage.css
│       ├── LocationsPage.jsx     # Page restaurants (hero photo, cards sans images, geolocalisation, galerie)
│       ├── LocationsPage.css
│       ├── BlogPage.jsx          # Page blog (non utilisee, route supprimee)
│       ├── BlogPage.css
│       ├── AboutPage.jsx         # Page "Notre Histoire" avec hero vert, timeline, equipe, engagements
│       ├── AboutPage.css
│       ├── FranchisePage.jsx     # Page "Devenir Franchise" avec formulaire de contact
│       └── FranchisePage.css
```

## Routes

| Route              | Composant        | Description                                     |
|--------------------|------------------|-------------------------------------------------|
| `/`                | `App`            | Page d'accueil                                  |
| `/menu`            | `MenuPage`       | Menu complet avec 11 categories                 |
| `/restaurants`     | `LocationsPage`  | Recherche + geolocalisation + 6 restaurants     |
| `/notre-histoire`  | `AboutPage`      | A propos, timeline, equipe, engagements         |
| `/franchise`       | `FranchisePage`  | Devenir franchise + formulaire                  |

## Navigation (Navbar)

Liens dans l'ordre : **Accueil** | **Menu** | **Nos Restaurants** | **Notre Histoire** | **Devenir Franchise** | **Commander** (bouton vert)

- `NavLink` de React Router avec classe `.active` (couleur verte + bordure)
- Bouton "Commander" : fond vert `#50AF46`, texte blanc, redirige vers `/restaurants`
- Navbar sticky avec bordure verte en bas (4px)
- Logo PNG `logo_smash.png` (hauteur 65px)
- Menu mobile fullscreen fond vert avec hamburger anime

## Restaurants

6 restaurants :
- **Ouverts** : Bordeaux (277 Rue Sainte-Catherine), Saint Germain en Laye 78 (90 Av. du Marechal Foch), Calais (2 Rue Royale)
- **Bientot** : Genappe (Belgique), Voiron, Dubai

Fonctionnalites :
- Cards sans images avec pastille statut (vert ouvert / orange bientot)
- Boutons : "Commander en ligne" (actif pour Saint Germain via restabo.app) + "Plus d'info" (lien Google Maps)
- Geolocalisation : bouton "Utiliser ma position" pour trier par distance
- Hero avec photo restaurant en fond + overlay
- Galerie carrousel des photos restaurants en bas

## Menu (MenuPage.jsx)

11 categories avec scroll-spy (IntersectionObserver) :
- **Nos Box** : 2 for U, 4 for U, Big Box, Kid Box
- **Burgers** : Smash, Cheese, Chili, Fungi, Big Smash, Avocado Cheese, Smoke Smash
- **Poulet** : Hot Chick'n, Avocado Chick'n, Chick'n Smash, BBQ Smash
- **Hot Dog** : Classic, New York Style, Spicy Bird, Bacon Cheese
- **Nos Frites** : Nature/Epice, Cheddar, Cheddar Piment, Cheddar & Bacon
- **Salade** : Crousti
- **Petites Faims** : Nuggets, Mozza Sticks, Tenders
- **Boissons** : Lemonaid, Lemonaid Orange Sanguine, Coca, Coca Zero, Fuze Tea, Oasis, St Pellegrino, The Glace, Eau
- **Shakes Smash** : Fraise, Vanille, Chocolat
- **Smice** : Smice, Smice Croquant
- **Veggies** : Veggie Smash, Veggie Chick'n Smash, Veggie Beef Smash, Nuggets Veggie

Toutes les photos produits sont dans `/public/menu/`. Separateur vert degrade entre categories. Cards non cliquables.

## Variables CSS (App.css :root)

```css
--green-brand: #50AF46
--green-light: #50AF46
--green-button: #50AF46
--amber: #E8960C
--black: #000106
--gray-text: #555
--gray-light-bg: #f4f4f4
--white: #ffffff
--font-heading: 'Cooper Hewitt', 'Jost', sans-serif
--font-body: 'DM Sans', 'Jost', sans-serif
```

## Page d'accueil (App.jsx)

Sections dans l'ordre :
1. **Hero** : video de presentation full-width (92vh) avec overlay noir 0.7, titre anime (fade-up), fleche scroll
2. **Notre Menu** : carousel Swiper des produits phares
3. **Livraison CTA** : bandeau avec bouton Commander
4. **Blog section** : image restaurant + CTA
5. **Meilleurs burgers** : texte descriptif
6. **Tous nos restaurants** : grille 4 premiers restaurants
7. **Petit-dejeuner** : image + horaires
8. **Newsletter** : formulaire d'inscription
9. **Durabilite** : texte + image
10. **Livraison CTA 2** : bandeau
11. **Galerie** : carrousel auto 30 photos shooting street (defilement lineaire continu)

## Patterns decoratifs

- **`.pattern-lines`** : motifs food SVG blancs — fonds verts/sombres. Opacite 0.07.
- **`.pattern-lines-dark`** : memes motifs en noir — fonds clairs. Opacite 0.06.

## Composants partages

- **SmashSmashLogo** : composant `<img>` charge `logo_smash.png`, exporte depuis `Navbar.jsx`, utilise dans `Footer.jsx` (hauteur 55px)
- **Layout** : Wrapper dans `main.jsx` qui ajoute Navbar + Footer autour de chaque page
- **Boutons pill** : Classes `.btn-pill` + variantes (`.btn-white`, `.btn-black`, `.btn-outline-black`, `.btn-outline-white`, `.btn-green-solid`)

## Conventions

- Tout le contenu textuel est en **francais**
- Images : vraies photos SmashSmash (dossiers Smash Smash HD, Menu, PHOTO RESTAU, shooting street)
- Icones : SVG inline (pas de librairie d'icones)
- Un fichier CSS par page, styles globaux dans `App.css`
- Pas de TypeScript, pas de CSS modules
- Responsive : breakpoints a 1200px, 1024px, 768px, 480px
- Tous les boutons "Commander" redirigent vers `/restaurants`
- Footer : liens Accueil, Menu, Nos Restaurants, Notre Histoire, Devenir Franchise, Contact
- Reseaux sociaux : Instagram (@smashsmashfr), TikTok, Facebook

## Commandes

```bash
npm run dev    # Demarre le serveur de dev sur http://localhost:5173
npm run build  # Build de production dans /dist
```

## Repository

- **GitHub** : https://github.com/Telasli/smashsmash.git
- **Branche** : main
