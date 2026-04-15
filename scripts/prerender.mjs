#!/usr/bin/env node
/**
 * Post-build prerender script.
 * Spins up a local server from dist/, visits each route with Puppeteer
 * (with CORS disabled), waits for content to render, and saves the full HTML.
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

const RENDER_WAIT = 5000;

const MIME_TYPES = {
  ".html": "text/html", ".js": "application/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".woff": "font/woff", ".woff2": "font/woff2", ".webp": "image/webp",
};

function createStaticServer() {
  return createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    let filePath = join(DIST, url.pathname === "/" ? "index.html" : url.pathname);
    if (!existsSync(filePath) || filePath.endsWith("/")) filePath = join(DIST, "index.html");
    const ext = extname(filePath);
    try {
      const content = readFileSync(filePath);
      res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
      res.end(content);
    } catch {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(readFileSync(join(DIST, "index.html")));
    }
  });
}

async function prerender() {
  console.log("🔄 Starting prerender...\n");

  const server = createStaticServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`  📡 Server running on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
    ],
  });

  try {
    for (const route of ROUTES) {
      const url = `http://localhost:${PORT}${route}`;
      console.log(`\n  🌐 Rendering ${route} ...`);

      const page = await browser.newPage();

      // Block analytics during prerender
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const u = req.url();
        if (u.includes("google-analytics.com") || u.includes("googletagmanager.com")) {
          req.abort("blockedbyclient");
        } else {
          req.continue();
        }
      });

      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
      await new Promise((r) => setTimeout(r, RENDER_WAIT));

      let html = await page.content();
      html = html.replace(/ data-lovable[^=]*="[^"]*"/g, "");

      let outputPath;
      if (route === "/") {
        outputPath = join(DIST, "index.html");
      } else {
        const dir = join(DIST, route);
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
        outputPath = join(dir, "index.html");
      }

      writeFileSync(outputPath, html, "utf-8");
      const textLength = (await page.evaluate(() => document.body.innerText.length)) || 0;
      console.log(`  ✅ Saved ${outputPath.replace(DIST, "dist")} (${textLength} chars)`);

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
