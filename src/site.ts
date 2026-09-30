/**
 * Everything the pages state about Mutely and its publisher lives here, so the legal pages
 * and the landing page can never disagree.
 *
 * Values marked REPLACE_ME must be filled in before the site goes live; `npm run build`
 * prints a warning while any remain (see scripts/prerender.mjs).
 */
export const site = {
  name: 'Mutely',
  tagline: 'Your ringer, on autopilot.',
  description:
    'Mutely switches your Android phone to Silent, Vibrate or Loud when you arrive at the places you choose, and restores it when you leave. No account, no tracking.',
  /** Public origin, no trailing slash. Used for canonical URLs and the sitemap. */
  url: 'https://mutely.app', // REPLACE_ME if you use a different domain
  packageName: 'com.mutely.app',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mutely.app',
  /** Legal name of whoever publishes the app on Google Play (person or company). */
  publisher: 'Awais Studio',
  /** Inbox for privacy requests and support. Must be monitored. */
  contactEmail: 'hafiz.awais.8834@gmail.com',
  /** Governing law for the Terms, e.g. "Pakistan" or "the State of California, USA". */
  jurisdiction: 'REPLACE_ME: country or state',
  /** Shown on the Privacy Policy and Terms. Bump when the text changes. */
  legalUpdated: 'October 1, 2026',
} as const;

export function isPlaceholder(value: string): boolean {
  return value.includes('REPLACE_ME');
}
