import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '../site';

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) {
    el.setAttribute(attr, value);
  }
}

/**
 * Keeps the title, description and canonical URL in step with client-side navigation.
 * The prerender script writes the same values into each route's static HTML.
 */
export function usePageMeta(title: string, description: string = site.description) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', `${site.url}${pathname === '/' ? '/' : pathname}`);
  }, [title, description, pathname]);
}
