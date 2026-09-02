import { defineConfig } from 'vite';

export default defineConfig({
  // The site is one static page, so there is nothing to code-split and no
  // reason to leave a JS chunk manifest behind.
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
    assetsInlineLimit: 2048,
    reportCompressedSize: true
  },
  server: {
    port: 5173,
    open: false
  }
});
