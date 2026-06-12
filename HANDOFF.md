# Portfolio site — handoff notes (for continuing in Cowork)

This is Samir Bhowmik's academic + artistic portfolio: a static site built with
Astro, intended to be free to host (domain is the only cost).

## What this project is
- **Astro** static site. Content lives as Markdown files; the site is generated from them.
- Domain: **samirbhowmik.cc** (currently still on Bluehost; not yet pointed at the new site).
- GitHub repo: **samirbhowmik/portfolio** (a built copy was deployed there, but
  GitHub Pages builds were failing — see "Where things stand").

## Project structure
- `src/content/projects/` — Works (one .md per project)
- `src/content/publications/` — Writing (book, articles; includes real Zenodo DOIs/PDFs)
- `src/content/teaching/` — Teaching
- `src/content/press/` — Press (marquee items show on homepage)
- `src/content/service/` — Service / contributions
- `src/data/site.json` — name, bio, credentials, links, social, "Now" banner
- `src/pages/` — page templates (index, works, publications, teaching, press, service, about)
- `src/styles/global.css` — all colors + fonts (Space Grotesk, self-hosted). Top
  "STYLE CONTROLS" block changes the whole site at once.
- `public/admin/` — **Decap/Sveltia CMS config already written** (config.yml has
  forms for every content type). Needs an auth method to go live.

## To run it locally
```
npm install
npm run dev      # preview at localhost:4321
npm run build    # outputs to dist/
```

## Where things stand (June 2026)
- The site is fully built and looks good (verified). Content is complete:
  Works (incl. Kinetic tokenization project), real publications with PDF links,
  teaching, press, service, about, book feature, credentials, social links.
- It was deployed to GitHub Pages but **the GitHub Actions build kept failing**.
  A likely cause surfaced late: files had been uploaded nested inside a `site/`
  subfolder in the repo, so `package.json` wasn't at the repo root where the
  build expected it. A pre-built copy was uploaded instead (deploy-from-branch).
- The site renders unstyled at `samirbhowmik.github.io/portfolio/` ONLY because
  it's built for the root domain, not a subpath. At samirbhowmik.cc it looks correct.

## The two open decisions
1. **Hosting:** stay on GitHub Pages, OR move to **Netlify** (recommended).
   Netlify builds automatically (fixes the failing-build problem) and provides
   built-in CMS authentication. Domain + repo stay the same.
2. **Editing (CMS):** the goal is to add/edit content via forms in a browser,
   no code. `public/admin/config.yml` is already written for this. On Netlify,
   Decap CMS auth "just works." On GitHub Pages, it needs a separate auth server
   (or use Sveltia CMS, which is easier there).

## Recommended next steps in Cowork
1. Open this project folder in Cowork.
2. Decide hosting: Netlify is the smoother path (auto-build + CMS auth).
3. Connect the GitHub repo to Netlify; enable Identity + Git Gateway for CMS login.
4. Point samirbhowmik.cc DNS (at Bluehost) to the new host.
5. Replace placeholder images (book cover at public/img/book-cover.jpg; project covers).

## Things to verify before launch
- Replace placeholder social handles in site.json (Instagram, YouTube, Vimeo, Scholar — LinkedIn + ORCID are real).
- Confirm AIA / SAFA credentials are current memberships.
- Verify peer-review status / author order on the in-review publications.
- Add real book cover + project images.
