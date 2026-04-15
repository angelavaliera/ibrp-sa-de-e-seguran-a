#!/usr/bin/env node
/**
 * Post-build prerender script.
 * Spins up a local server from dist/, visits each route with Puppeteer,
 * waits for content to render, and saves the full HTML.
 *
 * Handles CORS issues by intercepting Sanity API requests and proxying
 * them through Node.js (which has no CORS restrictions).
 *
 * Usage: node scripts/prerender.mjs
 */

import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, extname } from "path";
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

// Time (ms) to wait after networkidle for final rendering
const RENDER_WAIT = 4000;

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".webp": "image/webp",
};

/** Simple static file server that falls back to index.html (SPA). */
function createStaticServer() {
  return createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    let filePath = join(DIST, url.pathname === "/" ? "index.html" : url.pathname);

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
      const index = readFileSync(join(DIST, "index.html"));
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(index);
    }
  });
}

/**
 * Intercept requests to external APIs (like Sanity) that would be blocked
 * by CORS when running from localhost. Fetch them via Node.js and return
 * the response to the browser.
 */
async function setupRequestInterception(page) {
  await page.setRequestInterception(true);

  page.on("request", async (interceptedRequest) => {
    const url = interceptedRequest.url();

    // Proxy Sanity API requests through Node.js to bypass CORS
    if (url.includes("apicdn.sanity.io") || url.includes("api.sanity.io")) {
      try {
        const response = await fetch(url, {
          method: interceptedRequest.method(),
          headers: {
            ...interceptedRequest.headers(),
            // Remove origin header to avoid CORS issues
            origin: undefined,
          },
        });
        const body = await response.text();
        await interceptedRequest.respond({
          status: response.status,
          contentType: response.headers.get("content-type") || "application/json",
          body,
        });
      } catch (err) {
        console.warn(`  ⚠️  Failed to proxy: ${url}`, err.message);
        await interceptedRequest.abort("failed");
      }
      return;
    }

    // Block analytics/tracking during prerender
    if (
      url.includes("google-analytics.com") ||
      url.includes("googletagmanager.com") ||
      url.includes("gtag")
    ) {
      await interceptedRequest.abort("blockedbyclient");
      return;
    }

    // Let everything else through
    await interceptedRequest.continue();
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

      // Set up request interception for CORS bypass
      await setupRequestInterception(page);

      // Navigate and wait for network to be mostly idle
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

      // Additional wait for async data rendering
      await new Promise((r) => setTimeout(r, RENDER_WAIT));

      // Get the full rendered HTML
      let html = await page.content();

      // Clean up: remove any prerender-specific artifacts
      // Remove data-* attributes added by dev tools
      html = html.replace(/ data-lovable[^=]*="[^"]*"/g, "");

      // Determine output path
      let outputPath;
      if (route === "/") {
        outputPath = join(DIST, "index.html");
      } else {
        const dir = join(DIST, route);
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
        outputPath = join(dir, "index.html");
      }

      writeFileSync(outputPath, html, "utf-8");

      // Quick content check
      const textLength = (await page.evaluate(() => document.body.innerText.length)) || 0;
      console.log(`  ✅ Saved ${outputPath.replace(DIST, "dist")} (${textLength} chars of text)`);

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
