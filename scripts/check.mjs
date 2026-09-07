import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const css = readFileSync(resolve(root, 'assets/site.css'), 'utf8');
const js = readFileSync(resolve(root, 'assets/site.js'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(ids.length, new Set(ids).size, 'IDs must be unique');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Exactly one primary heading');
assert.equal((html.match(/class="project-card"/g) || []).length, 6, 'Six project/practice entries');
for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const url = match[1];
  if (url.startsWith('#')) assert.ok(ids.includes(url.slice(1)), `Missing anchor ${url}`);
  else if (!url.startsWith('https://')) {
    assert.ok(!url.startsWith('http:'), 'No insecure resources');
    assert.ok(existsSync(resolve(root, url.split('?')[0])), `Missing asset ${url}`);
  }
}
for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
  assert.match(match[0], /rel="[^"]*noopener/, 'External tabs need noopener');
}
assert.match(html, /lang="zh-Hant"/);
assert.match(html, /name="portfolio-version" content="2.0.0"/);
assert.match(html, /rel="canonical" href="https:\/\/yuchan27.github.io\/"/);
assert.match(css, /--bg:#080909/);
assert.match(css, /prefers-reduced-motion/);
assert.match(js, /IntersectionObserver/);
assert.ok(!/getUserMedia|eval\(|new Function\(/.test(js), 'No microphone or arbitrary execution');
assert.ok(existsSync(resolve(root, '.nojekyll')), 'Bypass Jekyll');
assert.ok(existsSync(resolve(root, '404.html')), 'Custom 404 page');
assert.match(readFileSync(resolve(root, 'robots.txt'), 'utf8'), /Sitemap:/);
console.log('PASS: HTML structure, 6 entries, anchors, local assets, metadata, motion preference, safe links and Pages entrypoint.');
