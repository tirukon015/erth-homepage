/**
 * Builds the favicon set, the Apple touch icon and the Open Graph image from
 * the ERTH brand assets that ship inside v14. Nothing here is invented: the
 * logo is the supplied ERTH logo and the backdrop is the supplied hero texture.
 *
 * Run with `npm run icons`. Output is committed under public/.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const IMG = join(root, 'src', 'assets', 'img');
const OUT = join(root, 'public');
const INK = '#050505';

mkdirSync(OUT, { recursive: true });

async function squareIcon(size) {
  const logo = await sharp(join(IMG, 'erth-logo-stacked.webp'))
    .resize({ width: Math.round(size * 0.88), height: Math.round(size * 0.7), fit: 'inside' })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: INK } })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toBuffer();
}

for (const size of [32, 192, 512]) {
  writeFileSync(join(OUT, `favicon-${size}.png`), await squareIcon(size));
}
writeFileSync(join(OUT, 'apple-touch-icon.png'), await squareIcon(180));

// A .ico so older crawlers and pinned tabs resolve /favicon.ico rather than 404.
const png32 = await squareIcon(32);
const ico = Buffer.concat([
  Buffer.from([0, 0, 1, 0, 1, 0, 32, 32, 0, 0, 1, 0, 32, 0]),
  (() => { const b = Buffer.alloc(8); b.writeUInt32LE(png32.length, 0); b.writeUInt32LE(22, 4); return b; })(),
  png32
]);
writeFileSync(join(OUT, 'favicon.ico'), ico);

// Open Graph / Twitter card: brand backdrop, ERTH logo, nothing claimed in text.
const backdrop = await sharp(join(IMG, 'hero-backdrop.webp'))
  .resize({ width: 1200, height: 630, fit: 'cover' })
  .modulate({ brightness: 0.55 })
  .toBuffer();
const ogLogo = await sharp(join(IMG, 'erth-logo-stacked.webp'))
  .resize({ width: 620, height: 380, fit: 'inside' })
  .toBuffer();
const og = await sharp({ create: { width: 1200, height: 630, channels: 4, background: INK } })
  .composite([
    { input: backdrop, blend: 'over' },
    { input: Buffer.from(`<svg width="1200" height="630"><rect width="1200" height="630" fill="${INK}" opacity="0.55"/></svg>`), blend: 'over' },
    { input: ogLogo, gravity: 'center' }
  ])
  .jpeg({ quality: 88 })
  .toBuffer();
writeFileSync(join(OUT, 'og-image.jpg'), og);

console.log('Wrote favicon-32/192/512, favicon.ico, apple-touch-icon.png, og-image.jpg');
