# CV web — Sergio Núñez Meneses

CV personnel en HTML/CSS statique, déployé sur GitHub Pages.

- **URL déployée :** https://sergio-nunez-meneses.github.io/web-cv
- **Dépôt :** https://github.com/sergio-nunez-meneses/web-cv (public)

---

## Structure des fichiers

```
index.html              — document unique, tout le CV
public/
  css/
    style.css           — feuille principale (imports + tous les styles)
    fonts.css           — @font-face Bad Script (400) + Lato (100, 300, 400, 700, 900)
    vars.css            — variables typo (dont --font-footer), espacement, page, photo
    colors.css          — palette active (noir/blanc chaud)
  fonts/                — fichiers .woff2 auto-hébergés (Lato + Bad Script)
    bad-script-400.woff2
  img/
    profile.jpg         — photo de profil (versionnée)
    photo.png           — ancienne photo (non versionnée, .gitignore)
  js/
    script.js           — initYear() + initStickyHeader() + initArtworkToggle()
  pdf/
    cv-sergio-nunez-meneses.pdf — export PDF page unique (généré par build-pdf, versionné)
  favicon.svg           — favicon <♪> (fond noir, texte blanc)
```

---

## Architecture CSS (`style.css`)

Les sections sont numérotées et délimitées par des commentaires alignés à 66 caractères :

```
1.  Imports (fonts.css, colors.css, vars.css)
2.  Reset & base
3.  Titre de section partagé (.cv__section-title)
4.  Styles partagés d'éléments (.item__*)
5.  Conteneur page CV (.cv — grille principale)
6.  En-tête (.cv__header, .cv__header-sentinel, .cv__header--sticky)
7.  Parcours universitaire (.cv__degrees, .cv__training)
8.  Emplois (.cv__jobs)
9.  Stages (.cv__internships)
10. Résidences et communications (.cv__communications)
11. Publications — auteurs (.publications__authors, au sein de .cv__communications)
12. Création artistique (.cv__artwork, .artwork__*)
13. Compétences (.cv__skills)
14. Pied de page (.cv__footer, .cv__footer-actions, .cv__artwork-toggle, .cv__pdf-download, .cv__signature)
15. Design responsive (breakpoints : 376, 420, 480, 576, 600, 700, 768, 820px)
```

### Classes d'effet visuel

- `.item__highlight` — surligneur jaune (`#faff00`) en dégradé vers le bas, largeur = texte
- `.link__highlight` — surligneur violet (`rgba(148, 0, 255, 0.5)`) pour les liens externes
- Ces deux classes utilisent `background-image: linear-gradient(...)` + `width: fit-content`
- `.hide` — utilitaire `display: none` (section 4), utilisé par le toggle de la création artistique

### Grille CSS

```css
grid-template-areas:
  "header         header"
  "degrees        training"
  "internships    internships"
  "jobs           jobs"
  "communications communications"
  "artwork        artwork"
  "skills         skills"
  "footer         footer";
grid-template-columns: 1fr 1fr;
```

### Sentinel header

`.cv__header-sentinel` occupe `grid-area: header` avec `align-self: end; height: 0`. Il reste dans le flux lorsque `.cv__header` passe en `position: fixed`, ce qui permet à `sentinel.offsetTop` de servir de seuil de scroll stable sans recalcul.

### Création artistique (toggle)

`.cv__artwork` est masquée par défaut via la classe `.hide`. Le bouton `.cv__artwork-toggle` du footer (police `--font-footer`) bascule `.hide` et alterne son libellé entre « Voir mes créations artistiques » et « Masquer mes créations artistiques » (`initArtworkToggle()` dans `script.js`). Sous 700px, le footer passe en colonne et la signature s'aligne à droite.

### Export PDF

Le lien `.cv__pdf-download` (sous le toggle, dans `.cv__footer-actions`) télécharge `public/pdf/cv-sergio-nunez-meneses.pdf`, généré en local et versionné (pas de build ni de CI).

Le générateur est un outil externe au projet :
- dépôt : https://github.com/sergio-nunez-meneses/build-pdf (`~/WebstormProjects/build-pdf`), Puppeteer (`puppeteer-core` + Chrome installé)
- `.env` de l'outil : `WEB_CV_ROOT` = racine de ce projet
- commande : `build-pdf` (lien `/usr/local/bin/build-pdf` → lanceur `/opt/build-pdf/build-pdf` → `npm run build:pdf`)

Rendu : mise en page **web** (media `screen`) sur une page unique de 210mm de large, hauteur mesurée sur `.cv` ; création artistique affichée, actions du footer masquées (`visibility: hidden`, la signature reste à droite). PDF vectoriel (texte sélectionnable, liens cliquables).

Pas de `@media print` : l'impression passe par le PDF ; Ctrl+P imprime la page web telle quelle.

---

## Workflow Git

```
main ← release ← feature/refacto branches
```

- Toujours proposer le **message de commit** avant de commiter
- Toujours proposer le **titre + description de PR** avant d'ouvrir la PR
- Ne jamais commiter ni ouvrir une PR sans validation de Sergio
- Avant une PR vers `release` : si `index.html`, le CSS ou `profile.jpg` ont changé, relancer `build-pdf` et commiter le PDF

### Format des commits

`:<gitmoji>: <Verbe> <résultat orienté utilisateur>`

Exemples : `:lipstick:`, `:recycle:`, `:memo:`, `:iphone:`, `:rocket:`

### Format des PR

```
Titre : :<gitmoji>: <titre court>

Description :
<phrase d'intro>

- bullet passif 1
- bullet passif 2
...

🤖 Generated with [Claude Code](https://claude.ai/code)
```

---

## Contraintes à respecter

- Ne pas consulter les liens ni leurs contenus (données personnelles)
- `public/img/` : seul `profile.jpg` est versionné (`public/img/*` + `!public/img/profile.jpg` dans `.gitignore`)
