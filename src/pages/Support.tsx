import { LifeBuoy, Mail, Trash2 } from 'lucide-react';
import { Fill } from '../components/DocPage';
import { Faq } from '../components/Faq';
import { Reveal } from '../components/Reveal';
import { usePageMeta } from '../components/usePageMeta';
import { FAQ } from '../content/faq';
import { site } from '../site';

export function Support() {
  usePageMeta(
    `Support · ${site.name}`,
    `Help with ${site.name}: setup, troubleshooting, and how to delete your data.`,
  );

  return (
    <>
      <div className="doc-hero">
        <div className="container">
          <span className="eyebrow">Support</span>
          <h1>How can we help?</h1>
          <p>Answers to common questions, fixes for switching problems, and how to reach us.</p>
        </div>
      </div>

      <section style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="support-grid">
            <Reveal className="feature">
              <span className="feature-icon">
                <Mail size={22} />
              </span>
              <h3>Email us</h3>
              <p>
                Tell us your phone model and Android version, and what you expected to happen.
                It helps us fix things faster.
              </p>
              <p style={{ marginTop: 14 }}>
                <a href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`${site.name} support`)}`}>
                  <Fill value={site.contactEmail} />
                </a>
              </p>
            </Reveal>
            <Reveal delay={90} className="feature">
              <span className="feature-icon">
                <LifeBuoy size={22} />
              </span>
              <h3>Not switching?</h3>
              <p>
                Open {site.name} → Settings. Everything under Permissions should say “Allowed”,
                and Battery optimization should be “Unrestricted”. Then check the Recent
                activity log after arriving somewhere.
              </p>
            </Reveal>
            <Reveal delay={180} className="feature">
              <span className="feature-icon">
                <Trash2 size={22} />
              </span>
              <h3>Delete your data</h3>
              <p>
                Everything {site.name} stores is on your phone, so you can remove it yourself
                at any time. <a href="#delete-data">See how</a>.
              </p>
            </Reveal>
          </div>

          <Reveal className="section-head">
            <h2>Frequently asked questions</h2>
          </Reveal>
          <Faq items={FAQ} />

          <div className="prose" style={{ margin: '80px auto 0' }}>
            <h2 id="delete-data">Delete your data</h2>
            <p>
              {site.name} has no accounts and keeps your places, activity log and settings only
              on your phone. We hold no copy. To delete them:
            </p>
            <ul>
              <li>
                <strong>All places:</strong> {site.name} → Settings → Data → Delete all places.
              </li>
              <li>
                <strong>One place:</strong> open it and tap Delete place.
              </li>
              <li>
                <strong>Activity log:</strong> Settings → Recent activity → Clear.
              </li>
              <li>
                <strong>Everything:</strong> uninstall {site.name}. Android removes all of its
                data, and none of it is kept in cloud backups.
              </li>
            </ul>
            <p>
              If the app ever sent a crash report, it contained no name, account or location.
              To ask us to delete crash data anyway, email{' '}
              <a href={`mailto:${site.contactEmail}?subject=${encodeURIComponent('Data deletion request')}`}>
                <Fill value={site.contactEmail} />
              </a>{' '}
              with the approximate date and your phone model.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
