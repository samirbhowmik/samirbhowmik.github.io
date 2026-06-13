import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The CMS writes empty strings ("") for blank optional fields, which a strict
// .url() check rejects and which breaks the build. Treat "" / null as "not set".
const urlOpt = z.preprocess((v) => (v === '' || v == null ? undefined : v), urlOpt);

/**
 * PROJECTS — one Markdown file per work, in src/content/projects/.
 * The frontmatter fields here are the single source of truth.
 * The corpus view filters/searches on them; the graph view draws
 * edges wherever two projects share a theme or a collaborator.
 * Add a project = add a file. It appears everywhere automatically.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    // Free-form short kinds: installation, performance, film, research, etc.
    type: z.array(z.string()).default([]),
    // The conceptual threads. SHARED themes become graph edges, so keep
    // the vocabulary consistent (e.g. always "infrastructure", not also
    // "infrastructures"). This is the one discipline the system asks of you.
    themes: z.array(z.string()).default([]),
    // Names exactly as you want them shown. Shared collaborators = edges.
    collaborators: z.array(z.string()).default([]),
    venue: z.string().optional(),
    // Institutional / venue page link (Helsinki Biennial, Venice Biennale, etc.)
    venueUrl: urlOpt,
    // Embeds, not hosted files. Paste the watch URL; the page builds the embed.
    video: urlOpt,
    // Cover image path in /public, e.g. "/img/paperwork.jpg". Shown as the
    // single image under the title when there's no gallery.
    cover: z.string().optional(),
    // Gallery shown under the title as a carousel (arrows to move back/forth).
    // Each item: a path in /public, optional alt text, optional caption.
    // e.g. - src: "/img/lost-islands-1.jpg"
    //        alt: "Installation view, Helsinki Biennial 2021"
    //        caption: "Helsinki Biennial 2021"
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string().optional(),
      caption: z.string().optional(),
    })).default([]),
    // Optional pointer to a related publication entry id (filename w/o .md)
    publication: z.string().optional(),
    // External links for the project (live demo/site and source code).
    liveUrl: urlOpt,
    repoUrl: urlOpt,
    // One-line summary used in cards and OG description.
    summary: z.string(),
    // Set true to surface on the landing strata / featured rail.
    featured: z.boolean().default(false),
    // Mark as a research project: appears under Research (after essays), not Art.
    research: z.boolean().default(false),
    // Lower numbers sort first within a year when you want manual control.
    order: z.number().default(0),
  }),
});

/**
 * PUBLICATIONS — the book, articles, chapters, talks.
 * Woven into projects rather than dumped in a CV tab: a project can
 * point to a publication, and a publication can point back to projects.
 */
const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    kind: z.enum(['book', 'chapter', 'article', 'talk', 'essay', 'review', 'other']),
    venue: z.string().optional(), // journal, press, conference
    authors: z.array(z.string()).default(['Samir Bhowmik']),
    url: urlOpt,
    doi: z.string().optional(),
    // Direct link to a downloadable PDF (e.g. a Zenodo record's file/landing
    // page). Shows a "PDF ↓" link on the Writing page.
    pdf: urlOpt,
    // Cover image path in /public, e.g. "/img/book-cover.jpg" — used to feature
    // the book on the homepage and publications page.
    cover: z.string().optional(),
    themes: z.array(z.string()).default([]),
    // ids of related projects (filenames without .md)
    relatedProjects: z.array(z.string()).default([]),
    forthcoming: z.boolean().default(false),
    summary: z.string().optional(),
  }),
});

/**
 * TEACHING — courses created/taught, plus supervision. One file per course.
 */
const teaching = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teaching' }),
  schema: z.object({
    title: z.string(),
    institution: z.string(),
    level: z.string().optional(),      // doctoral, MA, BA, etc.
    credits: z.string().optional(),
    years: z.string().optional(),       // "2021–present"
    role: z.string().optional(),        // creator & lead instructor, co-creator
    partners: z.array(z.string()).default([]),
    summary: z.string().optional(),
    order: z.number().default(0),
    // Course/blog links: each { label, url }.
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    // Cross-links to editorial/publication ids (e.g. the books a seminar produced).
    related: z.array(z.string()).default([]),
  }),
});

/**
 * PRESS — media mentions and features. One file per item. The `marquee`
 * flag surfaces an outlet in the homepage "As featured in" strip.
 */
const press = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/press' }),
  schema: z.object({
    // 'media' coverage, 'interview', or 'talk' (lectures & talks)
    category: z.enum(['media', 'interview', 'talk']).default('media'),
    outlet: z.string(),                 // outlet, host, or venue
    title: z.string().optional(),       // headline / description, if specific
    year: z.number().optional(),
    date: z.string().optional(),        // human date, e.g. "29 Jan 2022"
    url: urlOpt,
    marquee: z.boolean().default(false),// show in the homepage strip
    order: z.number().default(0),
  }),
});

/**
 * SERVICE — editorial roles, research leadership, networks, public
 * engagement, supervision. Grouped by category on the page.
 */
const service = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/service' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['editorial', 'leadership', 'networks', 'engagement', 'supervision', 'other']),
    org: z.string().optional(),
    years: z.string().optional(),
    url: urlOpt,
    summary: z.string().optional(),
    order: z.number().default(0),
    // Cross-links: project ids and/or publication ids this role connects to.
    relatedProjects: z.array(z.string()).default([]),
    relatedPubs: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, publications, teaching, press, service };
