/**
 * Post-build step. The site is a client-rendered SPA, but every route gets its own
 * dist/<route>/index.html with the right <title>, description and canonical URL, so:
 *   - /privacy, /terms and /support return 200 on any static host, no rewrite rules needed;
 *   - link previews and search engines see the correct page metadata;
 *   - 404.html serves unknown paths (GitHub Pages, Netlify and Cloudflare Pages use it).
 * Also writes sitemap.xml and robots.txt, and warns while src/site.ts has REPLACE_ME values.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const siteSource = await readFile(join(root, 'src/site.ts'), 'utf8');
const pick = key => siteSource.match(new RegExp(`${key}:\\s*'([^']*)'`))?.[1] ?? '';
const SITE_URL = pick('url').replace(/\/$/, '');
const NAME = pick('name');

/** Keep in sync with the <Route>s in src/App.tsx and each page's usePageMeta call. */
const ROUTES = [
  {
    path: '/',
    title: `${NAME}: ${pick('tagline')}`,
    description: pick('description'),
  },
  {
    path: '/privacy',
    title: `Privacy Policy · ${NAME}`,
    description: `How ${NAME} handles your location and data: everything stays on your phone.`,
  },
  {
    path: '/terms',
    title: `Terms of Use · ${NAME}`,
    description: `The terms for using the ${NAME} app and website.`,
  },
  {
    path: '/support',
    title: `Support · ${NAME}`,
    description: `Help with ${NAME}: setup, troubleshooting, and how to delete your data.`,
  },
];

const escape = s =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function withMeta(html, { path, title, description }) {
  const url = `${SITE_URL}${path}`;
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${escape(description)}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${escape(title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${escape(description)}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`);
}

const template = await readFile(join(dist, 'index.html'), 'utf8');

for (const route of ROUTES) {
  const out = route.path === '/' ? join(dist, 'index.html') : join(dist, route.path, 'index.html');
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, withMeta(template, route));
}

await writeFile(
  join(dist, '404.html'),
  withMeta(template, {
    path: '/404',
    title: `Page not found · ${NAME}`,
    description: pick('description'),
  }).replace('<head>', '<head>\n    <meta name="robots" content="noindex" />'),
);

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(r => `  <url><loc>${SITE_URL}${r.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`,
);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`prerender: wrote ${ROUTES.length} routes, 404.html, sitemap.xml, robots.txt`);

// Only property lines (`key: 'value', // …`), not comments or code that mention the marker.
const placeholders = siteSource
  .split('\n')
  .filter(line => /^\s*\w+:\s*'/.test(line) && line.includes('REPLACE_ME'))
  .map(line => line.trim());
if (placeholders.length > 0) {
  console.warn(
    `\n⚠️  src/site.ts still has ${placeholders.length} REPLACE_ME value(s). Fill them in before publishing:\n` +
      placeholders.map(l => `   ${l}`).join('\n') +
      '\n',
  );
}
