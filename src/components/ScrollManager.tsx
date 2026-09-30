import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router does not scroll on navigation: go to the #section when the URL has one,
 * otherwise to the top of the new page.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target page has rendered.
      const id = decodeURIComponent(hash.slice(1));
      const frame = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' });
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
