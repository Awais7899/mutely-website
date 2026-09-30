import { site } from '../site';

/**
 * Link to the Play Store listing. Drawn in HTML so it follows the site's type; swap in
 * Google's official badge artwork (play.google.com/intl/en_us/badges) if you prefer.
 */
export function PlayButton() {
  return (
    <a
      className="play-btn"
      href={site.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get Mutely on Google Play"
    >
      <svg width="26" height="28" viewBox="0 0 26 28" aria-hidden="true">
        <path d="M1.2 0.6 14.3 13.9 1.2 27.3C0.7 27 0.4 26.4 0.4 25.7V2.2C0.4 1.5 0.7 0.9 1.2 0.6Z" fill="#00D7FE" />
        <path d="M18.7 9.4 14.3 13.9 1.2 0.6C1.6 0.4 2.2 0.4 2.8 0.7L18.7 9.4Z" fill="#00F076" />
        <path d="M18.7 18.5 2.8 27.2C2.2 27.5 1.6 27.5 1.2 27.3L14.3 13.9 18.7 18.5Z" fill="#FF3A44" />
        <path d="M24 12.3C25.3 13 25.3 14.9 24 15.6L18.7 18.5 14.3 13.9 18.7 9.4 24 12.3Z" fill="#FFD500" />
      </svg>
      <span>
        <small>GET IT ON</small>
        <strong>Google Play</strong>
      </span>
    </a>
  );
}
