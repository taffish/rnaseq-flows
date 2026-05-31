#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const curatedPages = [
  "index.html",
  "404.html",
  "flows/index.html",
  "docs/quickstart.html",
  "docs/input-preparation.html",
  "docs/data-sources.html",
  "docs/report-interpretation.html",
  "docs/faq.html",
  "docs/flows/index.html",
  ...fs
    .readdirSync(path.join(root, "docs", "flows"))
    .filter((name) => /^rnaseq-.*-flow\.html$/.test(name))
    .sort()
    .map((name) => path.join("docs", "flows", name)),
  "examples/index.html",
  "examples/yeast-standard-report/index.html",
  "examples/yeast-denovo-standard-report/index.html",
];

const htmlCache = new Map();
const idCache = new Map();
const errors = [];
let localRefCount = 0;

function readHtml(filePath) {
  if (!htmlCache.has(filePath)) {
    htmlCache.set(filePath, fs.readFileSync(filePath, "utf8"));
  }
  return htmlCache.get(filePath);
}

function pageIds(filePath) {
  if (!idCache.has(filePath)) {
    const html = readHtml(filePath);
    idCache.set(
      filePath,
      new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1])),
    );
  }
  return idCache.get(filePath);
}

function isExternal(raw) {
  return (
    raw.startsWith("http://") ||
    raw.startsWith("https://") ||
    raw.startsWith("mailto:") ||
    raw.startsWith("tel:") ||
    raw.startsWith("data:")
  );
}

for (const relPage of curatedPages) {
  const pagePath = path.join(root, relPage);
  if (!fs.existsSync(pagePath)) {
    errors.push(`Missing curated page: ${relPage}`);
    continue;
  }

  const html = readHtml(pagePath);
  const ids = pageIds(pagePath);
  const pageDir = path.dirname(pagePath);

  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const raw = match[1].trim();
    if (!raw || isExternal(raw)) continue;

    if (raw.startsWith("#")) {
      if (raw.length > 1 && !ids.has(raw.slice(1))) {
        errors.push(`${relPage}: missing local anchor ${raw}`);
      }
      continue;
    }

    localRefCount += 1;
    const [target, anchor] = raw.split("#");
    const resolved = path.normalize(path.join(pageDir, target));

    if (!resolved.startsWith(root)) {
      errors.push(`${relPage}: reference escapes repository root: ${raw}`);
      continue;
    }

    if (!fs.existsSync(resolved)) {
      errors.push(`${relPage}: missing ${raw} -> ${path.relative(root, resolved)}`);
      continue;
    }

    if (anchor && resolved.endsWith(".html") && !pageIds(resolved).has(anchor)) {
      errors.push(`${relPage}: missing anchor ${raw}`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `STATIC LINK CHECK OK: ${localRefCount} local refs across ${curatedPages.length} curated pages`,
);
