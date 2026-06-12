import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    // Embeds, not hosted files. Paste the watch URL; the page builds the embed.
    video: z.string().url().optional(),
    // Cover image path in /public, e.g. "/img/paperwork.jpg"
    cover: z.string().optional(),
    // Optional pointer to a related publication entry id (filename w/o .md)
    publication: z.string().optional(),
    // External links for the project (live demo/site and source code).
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    // One-line summary used in cards and OG description.
    summary: z.string(),
    // Set true to surface on the landing strata / featured rail.
    featured: z.boolean().default(false),
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
    kind: z.enum(['book', 'chapter', 'article', 'talk', 'essay', 'other']),
    venue: z.string().optional(), // journal, press, conference
    authors: z.array(z.string()).default(['Samir Bhowmik']),
    url: z.string().url().optional(),
    doi: z.string().optional(),
    // Direct link to a downloadable PDF (e.g. a Zenodo record's file/landing
    // page). Shows a "PDF ↓" link on the Writing page.
    pdf: z.string().url().optional(),
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
  }),
});

/**
 * PRESS — media mentions and features. One file per item. The `marquee`
 * flag surfaces an outlet in the homepage "As featured in" strip.
 */
const press = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/press' }),
  schema: z.object({
    outlet: z.string(),                 // New York Times, E-flux, Monocle...
    title: z.string().optional(),       // headline, if a specific article
    year: z.number().optional(),
    url: z.string().url().optional(),
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
    url: z.string().url().optional(),
    summary: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { projects, publications, teaching, press, service };
