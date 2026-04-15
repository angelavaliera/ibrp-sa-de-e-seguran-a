#!/usr/bin/env node
/**
 * Post-build prerender script.
 * Spins up a local server from dist/, visits each route with Puppeteer,
 * waits for content to render, and saves the full HTML.
 *
 * Usage: node scripts/prerender.mjs
 */

import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, extname, dirname } from "path";
import puppeteer from "puppeteer";

const DIST = join(process.cwd(), "dist");
const PORT = 4173;

const ROUTES = [
  "/",
  "/faq",
  "/blog",
  "/links",
  "/curso-NR1-gestao",
  "/curso-NR1-terapeutas-PICS",
  "/politica-de-privacidade",
];

// Time (ms) to wait for async content (API calls, animations)
const RENDER_WAIT = 6000;

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

/** Simple static file server that falls back to index.html (SPA). */
function createStaticServer() {
  return createServer((req, res) => {
    let filePath = join(DIST, req.url === "/" ? "index.html" : req.url);

    if (!existsSync(filePath) || filePath.endsWith("/")) {
      filePath = join(DIST, "index.html");
    }

    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    try {
      const content = readFileSync(filePath);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    } catch {
      // Final fallback
      const index = readFileSync(join(DIST, "index.html"));
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(index);
    }
  });
}

async function prerender() {
  console.log("🔄 Starting prerender...\n");

  // 1. Start local server
  const server = createStaticServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`  📡 Server running on http://localhost:${PORT}`);

  // 2. Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const route of ROUTES) {
      const url = `http://localhost:${PORT}${route}`;
      console.log(`\n  🌐 Rendering ${route} ...`);

      const page = await browser.newPage();

      // Navigate and wait for network to be mostly idle
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

      // Additional wait for async data (Sanity API calls, animations)
      await new Promise((r) => setTimeout(r, RENDER_WAIT));

      // Get the full rendered HTML
      const html = await page.content();

      // Determine output path
      let outputPath;
      if (route === "/") {
        outputPath = join(DIST, "index.html");
      } else {
        // Create /faq/index.html so Apache serves it for /faq and /faq/
        const dir = join(DIST, route);
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
        outputPath = join(dir, "index.html");
      }

      writeFileSync(outputPath, html, "utf-8");
      console.log(`  ✅ Saved ${outputPath.replace(DIST, "dist")}`);

      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log("\n🎉 Prerender complete!\n");
}

prerender().catch((err) => {
  console.error("❌ Prerender failed:", err);
  process.exit(1);
});
