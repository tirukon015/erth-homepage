/**
 * Post-build verification. Runs as part of `npm run build`, so a broken asset
 * path, a dead in-page link, a missing meta tag or a leftover prototype
 * artefact fails the build rather than reaching production.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const failures = [];
const fail = (message) => failures.push(message);

if (!existsSync(join(dist, 'index.html'))) {
  console.error('✗ dist/index.html is missing — did the build run?');
  process.exit(1);
}
const html = readFileSync(join(dist, 'index.html'), 'utf8');

/* ---- required files ---------------------------------------------------- */
for (const file of ['robots.txt', 'sitemap.xml', 'favicon.ico', 'og-image.jpg', 'site.webmanifest', 'apple-touch-icon.png']) {
  if (!existsSync(join(dist, file))) fail(`missing from dist: ${file}`);
}

/* ---- every referenced local file resolves ------------------------------- */
const references = new Set();
for (const [, value] of html.matchAll(/\s(?:src|href)="(\/[^"]+)"/g)) references.add(value);
for (const [, srcset] of html.matchAll(/\ssrcset="([^"]+)"/g)) {
  for (const candidate of srcset.split(',')) {
    const url = candidate.trim().split(/\s+/)[0];
    if (url.startsWith('/')) references.add(url);
  }
}
for (const reference of references) {
  if (!existsSync(join(dist, reference.replace(/^\//, '').split('#')[0]))) {
    fail(`referenced file not in dist: ${reference}`);
  }
}

/* ---- no prototype artefacts survived the conversion --------------------- */
for (const [pattern, label] of [
  [/\{\{/, 'unresolved {{ binding }}'],
  [/sc-camel-/, 'sc-camel-* attribute'],
  [/style-hover=/, 'style-hover attribute'],
  [/data-screen-label=/, 'data-screen-label attribute'],
  [/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, 'raw bundler UUID'],
  [/<x-dc/, 'x-dc element']
]) {
  if (pattern.test(html)) fail(`prototype artefact left in the output: ${label}`);
}

/* ---- head essentials ---------------------------------------------------- */
for (const [pattern, label] of [
  [/<html lang="en-MY">/, 'lang attribute'],
  [/<title>[^<]+<\/title>/, '<title>'],
  [/<meta name="description" content="[^"]{80,}"/, 'meta description'],
  [/<link rel="canonical" href="https:\/\/erth\.app\/">/, 'canonical link'],
  [/<meta name="robots"/, 'robots meta'],
  [/<meta property="og:image"/, 'og:image'],
  [/<meta name="twitter:card"/, 'twitter:card'],
  [/rel="icon"/, 'favicon link'],
  [/rel="manifest"/, 'web manifest link']
]) {
  if (!pattern.test(html)) fail(`missing from <head>: ${label}`);
}

/* ---- structured data parses -------------------------------------------- */
const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
if (ldBlocks.length < 3) fail(`expected 3 JSON-LD blocks, found ${ldBlocks.length}`);
for (const [, json] of ldBlocks) {
  try {
    JSON.parse(json);
  } catch (error) {
    fail(`invalid JSON-LD: ${error.message}`);
  }
}

/* ---- document outline and links ---------------------------------------- */
const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
if (h1Count !== 1) fail(`expected exactly one <h1>, found ${h1Count}`);
if (!/<main id="main"[^>]*>/.test(html)) fail('missing <main> landmark');
if (!/<footer/.test(html)) fail('missing <footer> landmark');

const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.has(target)) fail(`dead in-page link: #${target}`);
}
for (const [, target] of html.matchAll(/aria-controls="([^"]+)"/g)) {
  if (!ids.has(target)) fail(`aria-controls with no target: ${target}`);
}

/* ---- images ------------------------------------------------------------- */
for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
  if (!/\salt="/.test(tag)) fail(`<img> without alt: ${tag.slice(0, 90)}…`);
  if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) {
    fail(`<img> without intrinsic size: ${tag.slice(0, 90)}…`);
  }
}

/* ---- weight budget ------------------------------------------------------ */
const walk = (directory) =>
  readdirSync(directory).flatMap((entry) => {
    const full = join(directory, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
const totalBytes = walk(dist).reduce((sum, file) => sum + statSync(file).size, 0);
const htmlBytes = Buffer.byteLength(html);

if (failures.length) {
  console.error('\nBuild check failed:');
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

const kb = (n) => `${(n / 1024).toFixed(1)} kB`;
console.log('\nBuild check passed');
console.log(`  html ${kb(htmlBytes)} · dist total ${(totalBytes / 1024 / 1024).toFixed(2)} MB · ${ldBlocks.length} JSON-LD blocks · ${ids.size} ids`);
