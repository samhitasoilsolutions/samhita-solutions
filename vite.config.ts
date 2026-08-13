import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

const blogSlugs = fs
  .readdirSync(path.resolve(__dirname, "./src/content/blog"))
  .filter((file) => file.endsWith(".html"))
  .map((file) => file.replace(/\.html$/, ""));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      !process.env.VERCEL &&
      prerender({
        routes: [
          "/",
          "/about",
          "/products",
          "/contact",
          "/blog",
          ...blogSlugs.map((slug) => `/blog/${slug}`),
        ],
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          maxConcurrentRoutes: 1,
          renderAfterTime: 3000,
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssMinify: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
}));
