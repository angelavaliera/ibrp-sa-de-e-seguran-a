import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from "vite-plugin-prerender";

const Renderer = require("@prerenderer/renderer-puppeteer");

const ROUTES_TO_PRERENDER = [
  "/",
  "/faq",
  "/blog",
  "/links",
  "/curso-NR1-gestao",
  "/curso-NR1-terapeutas-PICS",
  "/politica-de-privacidade",
];

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
      vitePrerender({
        staticDir: path.join(__dirname, "dist"),
        routes: ROUTES_TO_PRERENDER,
        renderer: new Renderer({
          headless: true,
          renderAfterTime: 5000,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        }),
        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          keepClosingSlash: true,
          sortAttributes: true,
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
