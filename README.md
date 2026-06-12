# Samir Bhowmik — portfolio

A zero-maintenance academic + artistic portfolio. Static site, hosted free on
GitHub Pages. The only recurring cost is your domain.

**One idea to remember:** everything is generated from Markdown files. The
graph, the filters, the project pages, the publications list — all built from
the same metadata. Add a project = add one file. It appears everywhere,
connected automatically.

---

## Run it locally

You need [Node.js](https://nodejs.org) (v20+). Then:

```bash
npm install      # once
npm run dev      # starts a live preview at http://localhost:4321
```

Edit a file, save, the browser updates. `Ctrl+C` to stop.

```bash
npm run build    # produces the final site in dist/ (what gets deployed)
```

If you make a mistake in a project's frontmatter (e.g. a missing required
field), `npm run build` and `npm run dev` will tell you exactly which file and
field — broken pages can't deploy. That's a feature.

---

## Adding a work

Create a new file in `src/content/projects/`, e.g. `my-new-work.md`:

```markdown
---
title: My New Work
year: 2026
type: [installation, performance]
themes: [energy, ecology]          # SHARED themes become graph connections
collaborators: [Some Person]        # SHARED collaborators become connections
venue: Some Biennial                # optional — omit the line if none
video: https://vimeo.com/123456789  # optional — paste the watch URL
cover: /img/my-new-work.jpg         # optional — put image in public/img/
summary: One sentence describing the work.
featured: true                      # true = shows on homepage
---

Write the full description here in plain Markdown.
```

**Important:** for optional fields you don't have, *delete the whole line*
rather than leaving it blank. `venue:` with nothing after it will fail the
build; just remove it.

**Keep theme words consistent.** "infrastructure" and "infrastructures" are
treated as two different themes and won't connect. Reuse existing theme words
when you can — that's what builds the network.

## Adding a publication / the book

Create a file in `src/content/publications/`. See
`terra-performing-book.md` for the book example. Set `forthcoming: true` until
it's out. List related project filenames in `relatedProjects:` to wire it into
those project pages and the graph.

## Editing your name, bio, and links

`src/data/site.json` — name, tagline, bio, and your YouTube/Vimeo/email links.

## Videos

Never host video here. Paste a YouTube or Vimeo **watch URL** into a project's
`video:` field and the embed is built automatically (privacy-friendly mode).

---

## Deploy to GitHub Pages (free)

1. Create a GitHub repo and push this folder to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source →
   GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on
   every push. First push triggers it automatically.
4. **Custom domain:** the `public/CNAME` file already contains
   `samirbhowmik.cc`. At your domain registrar, point the apex domain to
   GitHub Pages:
   - Four `A` records to `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - (Optional) a `CNAME` record for `www` → `yourusername.github.io`
5. Back in **Settings → Pages**, set the custom domain to `samirbhowmik.cc`
   and enable **Enforce HTTPS** once the certificate provisions (can take an
   hour).

After that, editing your site = edit a Markdown file, commit, push. It
redeploys itself in ~1 minute. No servers, no database, no maintenance.

---

## What's where

```
src/
  content/
    projects/        ← one .md per work (your main content)
    publications/    ← the book, essays, talks
  data/site.json     ← your name, bio, links
  content.config.ts  ← the schema (defines allowed frontmatter fields)
  pages/
    index.astro      ← homepage (stratigraphic descent + featured)
    works.astro      ← the filterable corpus
    network.astro    ← the interactive graph
    publications.astro
    about.astro
    works/[id].astro ← auto-generates a page per project
    graph.json.ts    ← builds graph data from your content
  layouts/Base.astro ← header, footer, OG/meta tags
  components/         ← VideoEmbed
  styles/global.css  ← all styling, incl. the stratigraphic palette
public/
  CNAME              ← your domain
  img/               ← cover images + OG image
```

## The stratigraphic homepage

The homepage descends through colored strata (surface → deep) as you scroll —
surface=identity, then practice, research, substrate — before opening into the
corpus and network. To adjust the layers, edit the `.strata` section in
`src/pages/index.astro`. It's pure CSS sticky-scroll; no JavaScript. To make
each layer reveal text or start a video as it enters view, add an
`IntersectionObserver` (≈15 lines) — noted as the next step in our discussion.
