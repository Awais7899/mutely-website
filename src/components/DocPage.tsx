import { useEffect, useState, type ReactNode } from 'react';
import { isPlaceholder } from '../site';

export interface DocSection {
  id: string;
  title: string;
  body: ReactNode;
}

/** A site value that still needs filling in shows as a highlighted placeholder. */
export function Fill({ value }: { value: string }) {
  return isPlaceholder(value) ? <span className="placeholder">{value}</span> : <>{value}</>;
}

/** Long-form page (privacy, terms): header, sticky contents with scroll-spy, prose. */
export function DocPage({
  eyebrow,
  title,
  intro,
  summary,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  summary?: ReactNode;
  sections: DocSection[];
}) {
  const [current, setCurrent] = useState(sections[0]?.id);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setCurrent(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -70% 0px' },
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      <div className="doc-hero">
        <div className="container">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </div>
      <div className="container doc-layout">
        <nav className="toc" aria-label="On this page">
          <h2>On this page</h2>
          <ol>
            {sections.map(s => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={current === s.id ? 'current' : undefined}
                  aria-current={current === s.id ? 'location' : undefined}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="prose">
          {summary ? <div className="summary">{summary}</div> : null}
          {sections.map(s => (
            <section key={s.id} style={{ padding: 0 }} aria-labelledby={`${s.id}-h`}>
              <h2 id={s.id}>
                <span id={`${s.id}-h`}>{s.title}</span>
              </h2>
              {s.body}
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
