import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(resolve(root, p), 'utf8');
for (const [path, lang] of [['index.html','en'], ['zh/index.html','zh-Hant']]) {
  const html = read(path);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size, `${path}: unique IDs`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/class="project-card"/g) || []).length, 6);
  assert.ok(html.includes(`lang="${lang}"`));
  assert.ok(html.includes('mailto:wuwu6249@gmail.com'));
  assert.ok(html.includes('data-language="en"') && html.includes('data-language="zh"'));
  assert.ok(html.includes('aria-current="page"'));
  assert.ok(html.includes('id="copy-email"'));
  assert.ok(!/[\p{Extended_Pictographic}\p{Emoji_Presentation}\uFE0F]/u.test(html), `${path}: no emoji glyphs`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (url.startsWith('#')) assert.ok(ids.includes(url.slice(1)), `Missing anchor ${url}`);
    else if (!/^(https:|mailto:)/.test(url)) {
      assert.ok(!url.startsWith('http:'), 'No insecure resources');
      let local = url.split('?')[0].replace(/^\//, '');
      if (!local || local.endsWith('/')) local += 'index.html';
      assert.ok(existsSync(resolve(root, local)), `Missing local target: ${url}`);
    }
  }
  for (const a of html.matchAll(/<a\b[^>]*>/g)) {
    if (a[0].includes('target="_blank"')) assert.match(a[0], /rel="[^"]*noopener/);
  }
}
for (const file of ['assets/site.js','assets/language.js']) {
  const text=read(file);
  assert.ok(!/getUserMedia|eval\(|new Function\(/.test(text));
  assert.ok(!/[\p{Extended_Pictographic}\p{Emoji_Presentation}\uFE0F]/u.test(text));
}
assert.match(read('assets/site.css'), /--bg:#080909/);
assert.match(read('assets/site.css'), /prefers-reduced-motion/);
assert.ok(existsSync(resolve(root,'.nojekyll')));
console.log('PASS: both static locales, email, links, 6 projects, no emoji, preserved dark theme and safe scripts.');
