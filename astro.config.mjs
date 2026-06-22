import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Static output: marketing site + Gemma replay theater are both static-friendly.
// Replays load JSON client-side; any truly dynamic API goes to a separate CF Worker.
// Switch to output: 'server' + @astrojs/cloudflare adapter only if a route needs SSR.
export default defineConfig({
  site: 'https://redteamkitchen.com',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file', // index.html, cortex.html — matches existing CF Pages clean-URL setup
    inlineStylesheets: 'auto',
  },
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    ssr: {
      noExternal: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/xr'],
    },
  },
});
