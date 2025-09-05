// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://example.com",
  integrations: [ sitemap()],
  vite: {
    build: {
      rollupOptions: {
        input: {
          main: '/js/main.js',
        },
      },
    },
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
