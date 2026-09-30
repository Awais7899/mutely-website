# Mutely website

Marketing site and legal pages for the [Mutely](https://play.google.com/store/apps/details?id=com.mutely.app)
Android app: landing page, Privacy Policy, Terms of Use, Support/FAQ and a 404 page.

React 19 + TypeScript + Vite, React Router, `lucide-react` icons, Poppins self-hosted via
`@fontsource` (no requests to Google Fonts). Light and dark themes follow the visitor's
system, with a toggle that is remembered.

## Before publishing

Fill in every `REPLACE_ME` in [`src/site.ts`](src/site.ts): publisher legal name, a
monitored contact email, governing-law jurisdiction, and the real domain. Until then the
pages show those values highlighted and `npm run build` prints a warning.

Keep the Privacy Policy in step with the app. The comment at the top of
[`src/pages/Privacy.tsx`](src/pages/Privacy.tsx) lists the app facts it relies on (on-device
storage, no backups, Google Play services, Google Maps, scrubbed Sentry crash reports,
release permissions). If the app starts sending new data anywhere, update the policy and
`legalUpdated` in `site.ts` first.

## Develop

```sh
npm install
npm run dev        # http://localhost:5173
npm run lint
npm run typecheck
```

## Build and deploy

```sh
npm run build      # outputs dist/
npm run preview    # serve dist/ locally
```

`scripts/prerender.mjs` runs after `vite build` and writes a real HTML file per route
(`dist/privacy/index.html`, …) with the correct title, description and canonical URL, plus
`404.html`, `sitemap.xml` and `robots.txt`. `dist/` is therefore a plain static site: upload
it to Netlify, Vercel, Cloudflare Pages, GitHub Pages or any static host. No rewrite rules
are needed.

When adding a page, add its `<Route>` in `src/App.tsx` **and** its entry in `ROUTES` in
`scripts/prerender.mjs`.

## Linking from the app and Play Console

- App: set `PRIVACY_POLICY_URL` (see the app's README "Secrets") to `https://<domain>/privacy`.
- Play Console → App content → Privacy policy: the same URL.
- Store listing → Website: `https://<domain>/`, and support email = `site.contactEmail`.
