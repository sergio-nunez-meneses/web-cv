# CV web — Sergio Núñez Meneses

CV personnel en HTML/CSS statique, déployé sur GitHub Pages.

- **URL déployée :** https://sergio-nunez-meneses.github.io/web-cv
- **Dépôt :** https://github.com/sergio-nunez-meneses/web-cv (public)
- **Version courante :** v0.1.0 (tag sur `main`), v0.1.0rc1 (tag sur `release`)

---

## Structure des fichiers

```
index.html              — document unique, tout le CV
public/
  css/
    style.css           — feuille principale (imports + tous les styles)
    fonts.css           — @font-face Bad Script (400) + Lato (100, 300, 400, 700, 900)
    vars.css            — variables typo (dont --font-signature), espacement, page, photo
    colors.css          — palette active (noir/blanc chaud)
  fonts/                — fichiers .woff2 auto-hébergés (Lato + Bad Script)
    bad-script-400.woff2
  img/
    profile.jpg         — photo de profil (versionnée)
    photo.png           — ancienne photo (non versionnée, .gitignore)
  js/
    script.js           — initYear() + initStickyHeader()
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
10. Distinctions (.cv__awards)
11. Publications (.cv__publications)
12. Compétences (.cv__skills)
13. Pied de page (.cv__footer, .cv__signature)
14. Impression (@media print)
15. Design responsive (breakpoints : 376, 420, 480, 576, 600, 768, 820px)
```

### Classes d'effet visuel

- `.item__highlight` — surligneur jaune (`#faff00`) en dégradé vers le bas, largeur = texte
- `.link__highlight` — surligneur violet (`rgba(148, 0, 255, 0.5)`) pour les liens externes
- Ces deux classes utilisent `background-image: linear-gradient(...)` + `width: fit-content`

### Grille CSS

```css
grid-template-areas:
  "header       degrees"
  "training     internships"
  "jobs         jobs"
  "awards       awards"
  "publications publications"
  "skills       skills"
  "footer       footer";
grid-template-columns: 1fr 0.8fr;
```

### Sentinel header

`.cv__header-sentinel` occupe `grid-area: header` avec `align-self: end; height: 0`. Il reste dans le flux lorsque `.cv__header` passe en `position: fixed`, ce qui permet à `sentinel.offsetTop` de servir de seuil de scroll stable sans recalcul.

---

## Workflow Git

```
main ← release ← feature/refacto branches
```

- Toujours proposer le **message de commit** avant de commiter
- Toujours proposer le **titre + description de PR** avant d'ouvrir la PR
- Ne jamais commiter ni ouvrir une PR sans validation de Sergio

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
- `@media print` est la section 14 de `style.css` ; la section 15 (Design responsive) la suit — à réorganiser si nécessaire

---

## Tâches en suspens (non bloquantes)

### Branche `refacto/print` (créée, vide — travaux à venir)

Problèmes d'impression identifiés mais non résolus :

| Problème | Navigateur | État |
|---|---|---|
| Fond noir en impression | Firefox 54 | Fix partiel : `background-color: #ffffff` + opacité grille 0.4 dans `@media print` |
| Quadrillé : traits verticaux seulement | Safari 26.5 | Non résolu |
| `link__highlight` trop fin (5px) en impression | Tous | Override `9px` prévu dans `@media print` |

Note : `print-color-adjust: exact` n'est pas supporté avant Firefox 97 → couleurs semi-transparentes composées sur noir en FF54.

### Futures améliorations

1. **Impression / export PDF** — affiner `@media print` ou ajouter un bouton d'export JS (`window.print()`)
2. **`@page` print** — tester `size: A4; margin: 0` avec `padding` sur `.cv` pour tenir sur 1 page
