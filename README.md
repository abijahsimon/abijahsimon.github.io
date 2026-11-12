# Abijah Simon — portfolio site

Static site built with [Astro](https://astro.build). No UI framework; plain CSS and one script.

## Run it

Needs Node 22.23.4 or newer (Node 24 is installed via nvm; `.nvmrc` selects it).

```
nvm use
npm run dev      # http://localhost:4321
npm run build    # writes dist/
```

## Where things are

| What | Where |
| --- | --- |
| All copy, colours, image lists, notes | `src/data/projects.js` |
| Images (exported, web-ready) | `src/assets/work/` |
| Home page | `src/pages/index.astro` |
| Case-study template | `src/pages/work/[slug].astro` |
| Styles | `src/styles/global.css` |
| Behaviour (column, cross-section, notes, lightbox) | `src/scripts/site.js` |

To add or change a project, edit `src/data/projects.js`. Images are referenced by file name without the extension.
Note positions (`x`, `y`) are percentages across the image.

## Publishing

The site is published to GitHub Pages at https://abijahsimon.github.io/ by `.github/workflows/deploy.yml`.
The workflow runs on every push to `main` and always publishes the newest commit on `main`, so a late or
out-of-order run can never roll the site back. (In the first minutes after the repository was created, one
push run started ten minutes late and two pushes started none; since then runs start within seconds.)
To start a run by hand:

```
gh workflow run deploy.yml --ref main
```

## Images

The images in `src/assets/work/` are web-ready exports. The scripts that produce them from the original
project files are kept outside this repository.
