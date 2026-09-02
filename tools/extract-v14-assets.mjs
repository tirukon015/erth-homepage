/**
 * Regenerates every font and image used by the production homepage from the
 * approved source of truth, `reference/ERTH Homepage (standalone) v14.html`.
 *
 * The v14 file is a self-extracting Claude Design bundle: its resources live in
 * a `<script type="__bundler/manifest">` block as base64 keyed by UUID. This
 * script decodes that manifest, writes the fonts verbatim, and re-encodes the
 * photographic/illustrative images to WebP (the logos and small marks stay PNG
 * so their flat colour and transparency survive untouched).
 *
 * Run with `npm run assets`. It is not part of `npm run build` — the output is
 * committed so builds stay deterministic and dependency-light.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(root, 'reference', 'ERTH Homepage (standalone) v14.html');
const FONT_DIR = join(root, 'public', 'fonts');
const IMG_DIR = join(root, 'src', 'assets', 'img');

/** UUID -> production filename. Names describe what the asset is, not where it came from. */
export const FONTS = {
  'f237ee16-e1de-4f7f-9365-0c22f9a18f7d': 'archivo-latin.woff2',
  '3df997e1-e72f-4a5b-8e92-508db70e334b': 'archivo-latin-ext.woff2',
  'aaf2143d-ae0a-4197-b45a-5ccb33afa0b0': 'archivo-vietnamese.woff2',
  '3f7b778e-1c28-4e14-95e5-e79a66f956f6': 'plex-sans-latin.woff2',
  '66edf59d-96e3-45c2-aa3d-e10885f5e9be': 'plex-sans-latin-ext.woff2',
  '7332b9fd-30f0-4a89-abbc-02ab6a3a3cd7': 'plex-sans-cyrillic-ext.woff2',
  '8515d92c-77ad-44cc-a977-be2d8e28fddd': 'plex-sans-greek.woff2',
  '880f2f3b-6150-45fc-a363-3bebd43f5a55': 'plex-sans-vietnamese.woff2',
  'cf8d7422-85f9-4b3e-b867-11b9320fc7c1': 'plex-sans-cyrillic.woff2',
  '362c09ec-534e-45f5-b8fb-98dc90e28f89': 'plex-mono-400-latin.woff2',
  '42f96bce-178d-484c-98a8-3c796048262b': 'plex-mono-400-latin-ext.woff2',
  '6b2a7d04-87af-4dca-9431-27bc7505639e': 'plex-mono-400-cyrillic-ext.woff2',
  'b493ae9a-e9ef-41dd-9a14-9af86998a030': 'plex-mono-400-greek.woff2',
  'e8ea51b7-1ace-430d-a57f-74e6158715e4': 'plex-mono-400-vietnamese.woff2',
  'c4046d10-1b42-45e4-80a9-5b78b8892d8a': 'plex-mono-500-latin.woff2',
  '88274b09-e516-42bc-812d-43b5d9a954c0': 'plex-mono-500-latin-ext.woff2',
  '4a7edbdd-7968-453a-a2e3-e3ffc7f050a5': 'plex-mono-500-cyrillic-ext.woff2',
  '9ffe5e0d-6495-4268-8345-285111b3cda3': 'plex-mono-500-greek.woff2',
  '539a2e3a-e305-476a-b75e-ab680f007b8f': 'plex-mono-500-vietnamese.woff2'
};

/**
 * `webp` entries are photos/illustrations that re-encode cleanly and save
 * megabytes. `keep` entries are logos, marks and rating glyphs where the
 * original file is already small and lossless.
 */
export const IMAGES = {
  'ce38ec16-134b-474f-acab-48250180a282': { name: 'erth-mark', mode: 'keep' },
  '7aae1720-f187-4602-9043-9307d8975bf7': { name: 'erth-wordmark', mode: 'keep' },
  'd4b3c507-cee0-4526-8630-b28d4b475d0b': { name: 'erth-logo-stacked', mode: 'webp', quality: 92 },
  'd7b9d78b-405d-458d-b159-47730bb059ee': { name: 'erth-glyph-watermark', mode: 'webp', quality: 88 },
  'c38bf257-368d-4bb4-9b13-a50d25e3847e': { name: 'hero-backdrop', mode: 'webp', quality: 66, widths: [960, 1280, 1800] },
  '905f2bbf-46ab-4225-9d27-05c6b521a45c': { name: 'hero-device-cluster', mode: 'webp', quality: 84, widths: [720, 1300] },
  'c128b34a-2bd8-4e14-b1ea-74c991faf9f0': { name: 'rewards-illustration', mode: 'webp', quality: 86, widths: [640, 1402] },
  '9aa376f5-c77d-43d0-8a76-57b0e364c747': { name: 'accepted-devices', mode: 'webp', quality: 88 },
  'daa4739b-c5c7-4e1f-8964-b09f64e208e8': { name: 'hero-collection-centre', mode: 'webp', quality: 80, widths: [768, 1280] },
  'fe2fd662-a3be-46eb-b698-cfcd1ce7c9ad': { name: 'home-collection', mode: 'webp', quality: 78, widths: [768, 1484] },
  'fa02171d-caba-4f6a-8605-9455863a5536': { name: 'operations-sorting', mode: 'webp', quality: 78, widths: [768, 1536] },
  '1cbd9a50-7671-4e01-b940-0ecbcee077ea': { name: 'award-plaque-2021', mode: 'webp', quality: 82 },
  '7e21ad45-681a-4d28-bf40-7af72a5639b0': { name: 'logo-jabatan-alam-sekitar', mode: 'keep' },
  '0c467d7d-2d74-4f02-a53d-17e169227a50': { name: 'rating-five-stars', mode: 'keep' },
  '1f9cea0d-7f4f-4185-8be7-bb342672622c': { name: 'logo-maxis', mode: 'keep' },
  '88926df1-ae6b-4af3-989f-fa5e947d3802': { name: 'logo-panasonic', mode: 'keep' },
  'c19567c0-16dd-4422-a2a7-9c6a3407e607': { name: 'logo-u-mobile', mode: 'keep' },
  '0840859b-4e8d-4dbb-8e8e-411066b3f83c': { name: 'logo-united-nations-malaysia', mode: 'keep' },
  'a4f9a3e1-84f2-4495-9f40-86cd7044357e': { name: 'logo-dell', mode: 'keep' },
  'b990f797-7177-46ad-93f4-41559fa99403': { name: 'logo-hong-leong', mode: 'keep' },
  '12f1efec-74bb-42d4-8bd5-c377d8a7f18b': { name: 'logo-shell', mode: 'keep' },
  'bb4416fe-948d-4c48-96fa-0c0601cea9db': { name: 'logo-ntt', mode: 'keep' },
  '70de7a0c-444a-4ef7-b307-98725976e1b2': { name: 'logo-khazanah-nasional', mode: 'keep' },
  '85fb3e3a-a873-4f20-b30b-753641966f1b': { name: 'logo-gobi-partners', mode: 'keep' },
  'c52c83b1-f9c7-4359-b1c3-b2f57f1b123c': { name: 'logo-quest-ventures', mode: 'keep' },
  'ed019be5-7691-4764-9ed6-ef9d7dbe66ad': { name: 'logo-scaleup-malaysia', mode: 'keep' }
};

const EXT_BY_MIME = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'font/woff2': 'woff2'
};

export function readManifest(source = SOURCE) {
  const html = readFileSync(source, 'utf8');
  const match = html.match(/<script type="__bundler\/manifest">([\s\S]*?)<\/script>/);
  if (!match) throw new Error(`No bundler manifest found in ${source}`);
  return JSON.parse(match[1]);
}

async function main() {
  const manifest = readManifest();
  rmSync(FONT_DIR, { recursive: true, force: true });
  rmSync(IMG_DIR, { recursive: true, force: true });
  mkdirSync(FONT_DIR, { recursive: true });
  mkdirSync(IMG_DIR, { recursive: true });

  let bytesIn = 0;
  let bytesOut = 0;

  for (const [uuid, filename] of Object.entries(FONTS)) {
    const entry = manifest[uuid];
    if (!entry) throw new Error(`Font ${uuid} missing from the v14 manifest`);
    const buffer = Buffer.from(entry.data, 'base64');
    writeFileSync(join(FONT_DIR, filename), buffer);
    bytesIn += buffer.length;
    bytesOut += buffer.length;
  }

  for (const [uuid, spec] of Object.entries(IMAGES)) {
    const entry = manifest[uuid];
    if (!entry) throw new Error(`Image ${uuid} missing from the v14 manifest`);
    const buffer = Buffer.from(entry.data, 'base64');
    bytesIn += buffer.length;

    if (spec.mode === 'webp') {
      const meta = await sharp(buffer).metadata();
      // The widest variant keeps the bare name so markup can use it as `src`;
      // narrower variants get a `-<width>w` suffix and are offered via srcset.
      const widths = spec.widths ?? [meta.width];
      for (const width of widths) {
        const isWidest = width === Math.max(...widths);
        const pipeline = width < meta.width ? sharp(buffer).resize({ width }) : sharp(buffer);
        const out = await pipeline.webp({ quality: spec.quality, effort: 6 }).toBuffer();
        const filename = isWidest ? `${spec.name}.webp` : `${spec.name}-${width}w.webp`;
        writeFileSync(join(IMG_DIR, filename), out);
        bytesOut += out.length;
      }
    } else {
      const ext = EXT_BY_MIME[entry.mime];
      if (!ext) throw new Error(`Unhandled mime ${entry.mime} for ${uuid}`);
      writeFileSync(join(IMG_DIR, `${spec.name}.${ext}`), buffer);
      bytesOut += buffer.length;
    }
  }

  const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
  console.log(`Extracted ${Object.keys(FONTS).length} fonts and ${Object.keys(IMAGES).length} images`);
  console.log(`Source ${mb(bytesIn)} -> production ${mb(bytesOut)}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
