import { Link } from 'react-router-dom';
import { site } from '../site';
import { LogoMark } from './Logo';

/** Read once at load; the footer does not need to tick over at midnight on New Year's. */
const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link to="/" className="brand" aria-label={`${site.name} home`}>
              <LogoMark size={30} />
              {site.name}
            </Link>
            <p>{site.description}</p>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li>
                <Link to="/#features">Features</Link>
              </li>
              <li>
                <Link to="/#how-it-works">How it works</Link>
              </li>
              <li>
                <a href={site.playStoreUrl} target="_blank" rel="noopener noreferrer">
                  Google Play
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li>
                <Link to="/support">Support &amp; FAQ</Link>
              </li>
              <li>
                <Link to="/support#delete-data">Delete your data</Link>
              </li>
              <li>
                <a href={`mailto:${site.contactEmail}`}>Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Use</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {YEAR} {site.publisher}. All rights reserved.
          </span>
          <span>Google Play and the Google Play logo are trademarks of Google LLC.</span>
        </div>
      </div>
    </footer>
  );
}
