import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'mutely-theme';

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** The theme currently on screen: the visitor's saved choice, else the system's. */
function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  return set === 'light' || set === 'dark' ? set : systemTheme();
}

/**
 * Flips light/dark and remembers the choice. index.html applies a saved choice before
 * first paint, so there is no flash on load.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document === 'undefined' ? 'light' : currentTheme(),
  );

  // Follow the system while the visitor has not chosen.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (!document.documentElement.dataset.theme) {
        setTheme(systemTheme());
      }
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the choice still applies for this visit.
    }
    setTheme(next);
  };

  const Icon = theme === 'dark' ? Sun : Moon;
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <Icon size={19} />
    </button>
  );
}
