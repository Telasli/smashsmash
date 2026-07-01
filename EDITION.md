# Edition des textes du site (backend Vercel)

Tous les textes visibles du site sont modifiables **en ligne**, directement depuis
le site, par vous seul (protege par mot de passe). Les modifications sont
enregistrees sur **Vercel Blob** et publiees en direct pour tous les visiteurs.

## 1. Configuration Vercel (a faire une seule fois)

### a. Creer un store Blob
1. Sur le dashboard Vercel : **Storage → Create Database → Blob**.
2. Liez-le au projet SmashSmash.
   → Vercel injecte automatiquement la variable `BLOB_READ_WRITE_TOKEN`.

### b. Definir le mot de passe editeur
Dans **Settings → Environment Variables** du projet, ajoutez :

| Nom              | Valeur                    | Environnements            |
|------------------|---------------------------|---------------------------|
| `ADMIN_PASSWORD` | *(votre mot de passe)*    | Production + Preview + Dev |

### c. Redeployer
Un nouveau deploiement prend en compte le store Blob et le mot de passe.

## 2. Modifier les textes

1. Ouvrez le site (n'importe quelle page).
2. Appuyez sur **Ctrl + Shift + E** → une barre noire apparait en bas
   (ou ajoutez `#admin` a l'URL).
3. Saisissez votre **mot de passe** (`ADMIN_PASSWORD`) puis **Connexion**.
4. Cliquez sur **Activer l'edition**.
5. Cliquez sur n'importe quel texte et modifiez-le. Il s'enregistre
   automatiquement a la sortie du champ (indicateur « Enregistre ✓ »).
   - **Entree** valide et sort du champ.
   - **Alt + clic** sur un texte le remet a sa valeur d'origine.
6. **Tout reinitialiser** efface toutes les modifications.
7. **Deconnexion** quand vous avez fini.

Les visiteurs voient les nouveaux textes au rechargement de la page.

## 3. Test en local

`npm run dev` (Vite seul) ne fait **pas** tourner l'API `/api/texts` :
l'edition n'est donc pas testable ainsi (le site affiche les textes par defaut).

Pour tester l'edition en local, utilisez le CLI Vercel :

```bash
npm i -g vercel        # si pas deja installe
vercel link            # lier le dossier au projet Vercel
vercel env pull        # recupere ADMIN_PASSWORD + BLOB_READ_WRITE_TOKEN en local
vercel dev             # sert le site + les fonctions /api
```

## 4. Fonctionnement technique

- `api/texts.js` : fonction serverless. `GET` renvoie le JSON des textes ;
  `POST` (protege par `ADMIN_PASSWORD`) l'enregistre dans le Blob `site-texts.json`.
- `src/editable/EditableContext.jsx` : charge les textes, gere le mode edition,
  l'authentification et l'enregistrement automatique (cache local `localStorage`).
- `src/editable/Editable.jsx` : composant `<Editable id="...">` qui enveloppe
  chaque texte. Affiche l'override enregistre s'il existe, sinon le texte d'origine.
- `src/editable/AdminBar.jsx` : la barre d'administration cachee.

**Robustesse** : si le Blob ou le mot de passe ne sont pas encore configures,
le site fonctionne normalement et affiche les textes par defaut — rien ne casse.
