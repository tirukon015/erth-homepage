# ERTH — Homepage

Production website for **ERTH** (Electronic Recycling Through Heroes), the Malaysian
e-waste collection service operated by Blue Bee Technologies. The site is a single
long-form homepage covering doorstep pickup, rewards and pricing, what ERTH accepts,
business services, service areas, drop-off options, the recycling process, press
coverage, FAQ and contact.

## Source of truth

The approved design is **`ERTH Homepage (standalone) v14.html`**, kept verbatim at
[`reference/ERTH Homepage (standalone) v14.html`](reference/ERTH%20Homepage%20(standalone)%20v14.html).
That decision was made by the client and is final — v9 to v13 are superseded and are
not used as a design reference. The v14 file is a self-extracting Claude Design bundle:
its fonts, images and markup are embedded as base64 inside `<script type="__bundler/*">`
blocks and unpacked in the browser at runtime.

Everything in `index.html`, `src/` and `public/` derives from that file.

## Technology

Deliberately small: **static HTML, CSS and vanilla JavaScript, bundled by Vite 7.**

The prototype ran on React + Babel loaded from a CDN and a design-tool runtime that
re-rendered inline styles on every state change. None of that is needed for a single
static page, and dropping it removes ~250 kB of JavaScript, a CDN dependency and a
render pass before first paint. What ships instead is 3.7 kB of JavaScript that only
handles interaction.

| Concern | Where |
| --- | --- |
| Markup | `index.html` |
| Fonts (`@font-face`) | `src/styles/fonts.css` |
| Resets, globals, keyframes, a11y | `src/styles/base.css` |
| Hover, open/closed state, breakpoints | `src/styles/components.css` |
| Interaction | `src/main.js` |
| Images | `src/assets/img/` (hashed by Vite) |
| Fonts, icons, robots, sitemap | `public/` (stable URLs) |
| Post-build verification | `scripts/check-build.mjs` |
| One-off asset pipeline | `tools/` |

## Development

```bash
npm install       # install dependencies
npm run dev       # dev server on http://localhost:5173
npm run build     # production build into dist/ + post-build checks
npm run preview   # serve the built dist/
npm run lint      # ESLint over the JavaScript
npm run check     # run the post-build checks against an existing dist/
npm run assets    # regenerate src/assets/img and public/fonts from the v14 bundle
npm run icons     # regenerate favicons and the Open Graph image
```

`npm run build` fails if a referenced asset is missing from `dist/`, an in-page link or
`aria-controls` points at an id that does not exist, a required `<head>` tag is absent,
the JSON-LD does not parse, an `<img>` has no `alt` or no intrinsic size, there is not
exactly one `<h1>`, or any prototype artefact (`{{ binding }}`, `sc-camel-*`,
`style-hover`, a raw bundler UUID) survived into the output.

## Implementation decisions

**Inline styles are kept, on purpose.** In v14 the inline `style` attributes *are* the
design specification — every dimension, colour and clamp() lives there. Rewriting a
thousand of them into class names would have introduced visual drift for no functional
gain, so the markup is preserved and only the parts a static file cannot express were
moved into CSS:

- `style-hover="…"` attributes became real `:hover` rules (with `!important`, since the
  elements they target carry inline styles — the prototype's own generated stylesheet
  did the same).
- Open/closed state that v14 expressed by rewriting inline `display` is now `hidden`,
  `aria-expanded` and a couple of classes, with CSS deciding the appearance.
- The desktop/mobile split that v14 computed from `window.innerWidth < 1080` in
  JavaScript is now a media query at the same 1080px breakpoint, so the right layout is
  painted on the first frame instead of after hydration.

**Fixes applied to the prototype.** The layout is otherwise pixel-identical to v14 at
1440px (verified section by section), with these deliberate exceptions:

- v14's page wrapper `<div>` closed early, after section 07, so sections 08–20, the
  terms block and the footer never inherited `color:#F2F5F2`. The heading *"Recognized in
  Malaysia and around the world."* rendered black on a near-black background. The colours
  now live on `<body>`.
- The booking dialog contained an `<iframe>` whose `src` was an unresolved binding, which
  404'd on every page load. No booking form URL is configured, so the iframe is gone and
  the contact-channel list (v14's own fallback) is the dialog body.
- Six links pointed at the section they were already inside. They now resolve to the
  action they describe — WhatsApp for "Submit an unlisted device", "Request a Black Box"
  and "Choose Data Protection"; the booking dialog for "Book Your Collection"; `#process`
  for "Detailed how it works"; the FAQ list for "View all FAQ".
- Grid tracks declared as `minmax(330px, 1fr)` are now `minmax(min(330px, 100%), 1fr)`,
  and two `grid-column: span 2` cells release the span below 400px, so nothing forces
  horizontal scrolling on a 320px screen.

**Accessibility.** Skip link, `<main>`/`<nav>`/`<footer>`/`<aside>` landmarks, accessible
names on the sections that carry no heading, a visible focus ring on every interactive
element, `aria-expanded`/`aria-controls` on all disclosures and dropdowns, Escape and
focus-trapping in both dialogs with focus restored to the opener, keyboard-operable nav
dropdowns, underlines on inline links whose colour alone did not distinguish them, and
`prefers-reduced-motion` honoured. `axe-core` reports zero violations in the default,
mobile, menu-open, dialog-open and disclosure-open states.

**Performance.** Fonts and images are self-hosted — no third-party requests at all.
Photographic and illustrative assets were re-encoded to WebP and the largest ones get
`srcset` variants, taking the image payload from 12.0 MB to 2.7 MB. Every `<img>` carries
intrinsic `width`/`height` so nothing shifts as images arrive; below-the-fold images are
lazy, the hero backdrop is `fetchpriority="high"`, and the two Latin font subsets are
preloaded.

**SEO.** Title, meta description, canonical, robots directives, Open Graph and Twitter
cards, `lang="en-MY"`, `robots.txt`, `sitemap.xml`, a web manifest, a full favicon set and
three JSON-LD blocks (`Organization`+`RecyclingCenter`, `FAQPage`, `WebSite`) — the first
two carried over from v14, the third added to state the site name and alternate name
called for in `reference/requirements-v2.txt`. All page content is in the static HTML;
nothing depends on JavaScript to be crawlable.

## Deployment

Vercel, building from this repository.

- Framework preset: **Vite** · Build command: `npm run build` · Output directory: `dist`
- `vercel.json` sets long-lived immutable caching for `/assets/*` and `/fonts/*` plus
  `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and `Permissions-Policy`.

The canonical URL, `og:url`, `robots.txt` and `sitemap.xml` all point at
`https://erth.app/`, as specified in v14 and in the requirements. Those values are
intentionally independent of the deployment URL; when the custom domain is attached to
this Vercel project they are already correct.

## Repository layout

```
index.html                    production markup
src/main.js                   interaction layer
src/styles/                   fonts.css, base.css, components.css (via main.css)
src/assets/img/               images used by the page
public/                       fonts, favicons, og-image, robots.txt, sitemap.xml, manifest
scripts/check-build.mjs       post-build verification, runs as part of npm run build
tools/extract-v14-assets.mjs  regenerates fonts and images from the v14 bundle
tools/generate-icons.mjs      regenerates favicons and the Open Graph image
reference/                    v14 (source of truth), requirements, compliance documents
archive/                      superseded prototypes and design-tool runtime, kept for history
```

`reference/` and `archive/` are documentation only — nothing in the build reads from them
except `npm run assets`, which reads the v14 bundle.

## Content

All copy, figures, awards, press links, pricing and terms come from v14 and
`reference/requirements-v2.txt`. Nothing was invented or embellished. Two sections
(`#gallery`, and the outlet logos in `#press`) are intentional placeholders in v14 — they
are labelled as awaiting photography and are carried through as-is.
