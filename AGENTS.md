# Disciple's Creed — Project Guide

This file orients any AI or developer working on the site. Read it before making changes.

## What this is

A Christian discipleship ministry website for a trainer who disciples people. It has three jobs, in priority order:

1. **Explain what the ministry is** — its vision and convictions.
2. **Show the trainings he does** — the core resource, and the reason most people visit.
3. **Give a next step** — reach out, start discipleship, or support the ministry.

Every page should serve one of those three. The name plays on the Apostles' Creed, so the brand leans on a clear, stated set of convictions about what discipleship is.

## Stack

- **Astro** (latest) with **TypeScript**
- **Tailwind CSS** — added via the official `astro add tailwind` path so the version/wiring matches current Astro docs. Do not hand-write a stale integration config.
- **Markdown content collections** for trainings and resources (typed via `src/content.config.ts`)
- **No CMS.** Content is edited directly as Markdown files by a solo maintainer. Keep that workflow simple — adding a training should mean adding one `.md` file, never touching components.
- **Deploy:** Cloudflare Pages or Netlify (free tier). Static output.

## Routes / site structure

- `/` — Home: one-line vision, what Disciple's Creed is, strongest CTA, a few entry points into trainings.
- `/about` — the ministry's story and the founder's background.
- `/creed` — "What We Believe." The spine of the brand: what discipleship means here and the convictions behind the trainings.
- `/trainings` — listing of all trainings (from the collection).
- `/trainings/[slug]` — individual training detail pages.
- `/resources` — hub of articles, videos, downloads, recommended reading.
- `/connect` — contact, how to start, how to support.

## Content model

### `trainings` collection (`src/content/trainings/*.md`)

Frontmatter schema:

- `title` (string, required)
- `summary` (string, required) — one or two sentences for cards and meta description
- `audience` (string) — who it's for (e.g. "New believers", "Small group leaders")
- `format` (enum: `one-on-one` | `cohort` | `workshop` | `self-paced`)
- `duration` (string, optional — e.g. "8 weeks", "Half day")
- `topics` (string[], optional — tags)
- `featured` (boolean, default false)
- `order` (number, optional — for manual sort; lower = earlier)
- `heroImage` (string, optional — path under `src/assets/`)
- `cta` (string, optional — how to join; falls back to a site-wide default)

Body = full Markdown description.

### `resources` collection (`src/content/resources/*.md`)

Frontmatter schema:

- `title` (string, required)
- `type` (enum: `article` | `video` | `download` | `reading`)
- `summary` (string, required)
- `date` (date, required)
- `url` (string, optional — external link or file for video/download/reading types)
- `topics` (string[], optional)

Body = article content (for `type: article`) or notes/description for the others.

## Design direction

Reverent but modern. Trustworthy, warm, uncluttered. Avoid anything that reads as a stock church template — no harsh blues, no clip-art crosses, no gradients-for-the-sake-of-it. Lean on good typography and generous whitespace.

Tokens (wired as CSS variables / Tailwind theme values in `src/styles/global.css`) — dark charcoal + gold palette:

- **Background:** `#0E0E0E` — page background; also the `background-color` fallback behind the SVG watermark
- **Surface / cards:** `#17150F` (`surface` token — card backgrounds, form inputs, tinted section fills)
- **Body text:** `#ECE8E1` (`parchment` token — off-white for readable contrast on dark backgrounds; also used as text on dark button/footer surfaces)
- **Muted text:** `#9A9384` (`muted` token — secondary copy, captions, metadata)
- **Ink / darkest surface:** `#0E0E0E` (`ink` token — footer background, skip-link focus background)
- **Gold / accent:** `#C6A15C` (`gold` — links, CTA button background, type labels, emphasis)
- **Gold-bright / hover:** `#E0C079` (`gold-bright` — button hover state, card border hover)
- **Gold-deep / borders:** `#8C6A32` (`gold-deep` — card borders, section dividers, form input borders)

SVG background: `/images/dc-watermark.svg` — `background-attachment: fixed`, `background-size: cover`, centered, with `#0E0E0E` color fallback so edges blend seamlessly.

Type pairing (Google Fonts, swappable, loaded in `src/layouts/Layout.astro`):

- **Headings / display:** Fraunces — warm, characterful serif for the "creed/timeless" feel (`font-serif`)
- **Body / UI:** Inter — clean, highly readable sans (`font-sans`, default)

Keep line length comfortable (~65ch), use real vertical rhythm, and make the CTA visually distinct on every page.

## Build phases (suggested order)

1. **Setup** — scaffold Astro + TypeScript + Tailwind, wire fonts and the color tokens above. Confirm a clean `npm run build`. ✅ Done.
2. **Shell** — global layout, nav, footer, the design system. Get one page looking right before building others.
3. **Core pages** — Home, About, Creed.
4. **Trainings** — content collection + listing + detail template. Seed with the owner's real trainings.
5. **Resources** — collection + hub page.
6. **Connect + polish** — contact form (Netlify Forms or a simple service), SEO meta, sitemap, accessibility pass, performance, deploy.

Work one phase at a time. Don't scaffold all pages at once — get the shell and one page right first.

## TODO — needs the owner's input (placeholders for now)

- [ ] Founder's name and bio
- [ ] The actual trainings (titles, audiences, formats, descriptions)
- [ ] The creed / statement of beliefs text
- [x] Logo — received and wired into the Header (icon) and Footer (full lockup). `src/assets/logo-source.png` is the original full-resolution render; `logo-icon.png` and `logo-lockup.png` are cropped derivatives used on the site
- [x] Color confirmation — tokens above are sampled directly from the logo, no longer placeholders. Font pairing (Fraunces/Inter) is still the original placeholder choice, not yet confirmed
- [ ] Contact destination (email address) and whether to collect an email list — the `/connect` form posts via Netlify Forms; set up email notifications for submissions in the Netlify dashboard once deployed
- [ ] Giving/support platform (e.g. Tithe.ly, PayPal, a partnering church's giving page) for the "Support the Ministry" section on `/connect`
- [ ] Production domain — needed before adding canonical URLs / `@astrojs/sitemap` (requires `site` in `astro.config.mjs`) and before deploying

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
