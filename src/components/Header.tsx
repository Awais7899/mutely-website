import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { site } from '../site';
import { LogoMark } from './Logo';
import { ThemeToggle } from './ThemeToggle';

const LINKS = [
  { to: '/#features', label: 'Features' },
  { to: '/#how-it-works', label: 'How it works' },
  { to: '/#privacy', label: 'Privacy' },
  { to: '/support', label: 'Support' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="container nav" aria-label="Main">
        <Link to="/" className="brand" aria-label={`${site.name} home`}>
          <LogoMark size={34} />
          {site.name}
        </Link>
        <ul className="nav-links">
          {LINKS.map(l => (
            <li key={l.to}>
              {/* NavLink ignores the hash, so section links would all look "current". */}
              {l.to.includes('#') ? (
                <Link to={l.to}>{l.label}</Link>
              ) : (
                <NavLink to={l.to} end>
                  {l.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <ThemeToggle />
          <a
            className="btn btn-primary"
            href={site.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get the app
          </a>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(o => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {open ? (
        <div id="mobile-menu" className="mobile-menu">
          {LINKS.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a
            className="btn btn-primary"
            href={site.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Get the app
          </a>
        </div>
      ) : null}
    </header>
  );
}
