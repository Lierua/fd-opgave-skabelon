// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "static", // ✅ Static build for Netlify
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
});
