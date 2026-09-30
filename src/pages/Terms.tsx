import { Link } from 'react-router-dom';
import { DocPage, Fill, type DocSection } from '../components/DocPage';
import { usePageMeta } from '../components/usePageMeta';
import { site } from '../site';

const sections: DocSection[] = [
  {
    id: 'agreement',
    title: 'Agreement',
    body: (
      <p>
        These terms apply to the {site.name} Android app and this website, provided by{' '}
        <strong>
          <Fill value={site.publisher} />
        </strong>
        . By installing or using {site.name} you agree to them. If you do not agree, please do
        not use the app. Our <Link to="/privacy">Privacy Policy</Link> explains how data is
        handled.
      </p>
    ),
  },
  {
    id: 'license',
    title: 'Your license',
    body: (
      <p>
        We grant you a personal, non-exclusive, non-transferable license to use {site.name} on
        Android devices you own or control, under these terms and the Google Play terms of
        service. You may not copy, modify, reverse engineer, resell or redistribute the app
        except where the law allows it.
      </p>
    ),
  },
  {
    id: 'how-it-works',
    title: 'What Mutely does, and its limits',
    body: (
      <>
        <p>
          {site.name} changes your ringer mode when Android reports that you have entered or
          left a place you saved. Detection depends on Android, Google Play services, your
          permissions, battery settings, device manufacturer and signal. As a result:
        </p>
        <ul>
          <li>Switching can be delayed by several minutes, or occasionally missed.</li>
          <li>It may stop if you revoke permissions, turn location off or restrict the app.</li>
          <li>
            While your phone is on Silent or Vibrate, you may miss calls, alarms from other
            apps, or notifications.
          </li>
        </ul>
        <p>
          <strong>
            Do not rely on {site.name} where missing a call or alert could cause harm, loss or
            safety risks.
          </strong>{' '}
          You remain responsible for your phone's sound settings and for following the rules
          of the places you visit.
        </p>
      </>
    ),
  },
  {
    id: 'your-responsibilities',
    title: 'Your responsibilities',
    body: (
      <ul>
        <li>Use {site.name} lawfully and only on devices you are allowed to configure.</li>
        <li>Do not use it to interfere with another person's device or to track anyone.</li>
        <li>Keep your device and its software reasonably up to date.</li>
      </ul>
    ),
  },
  {
    id: 'third-party',
    title: 'Third-party services',
    body: (
      <p>
        {site.name} relies on Google Play services, Google Maps and, for crash reports,
        Sentry. Their terms and privacy policies govern your use of those services. We are not
        responsible for their availability or behaviour.
      </p>
    ),
  },
  {
    id: 'price-and-changes',
    title: 'Price and changes to the app',
    body: (
      <p>
        {site.name} is currently free. We may add, change or remove features, or offer paid
        features in the future. If we ever introduce paid features, they will be clearly
        described before you buy, and purchases will be handled by Google Play.
      </p>
    ),
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    body: (
      <p>
        {site.name}, its logo, design and code belong to{' '}
        <Fill value={site.publisher} /> or its licensors. Google Play and the Google Play logo
        are trademarks of Google LLC. The Poppins typeface is used under the SIL Open Font
        License.
      </p>
    ),
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer',
    body: (
      <p>
        To the extent the law allows, {site.name} is provided “as is” and “as available”,
        without warranties of any kind, express or implied, including fitness for a
        particular purpose and uninterrupted or error-free operation. Some jurisdictions do
        not allow excluding certain warranties, so parts of this section may not apply to you.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: (
      <p>
        To the extent the law allows, we are not liable for indirect, incidental, special or
        consequential damages, or for missed calls, messages or alerts, arising from your use
        of {site.name}. Our total liability for any claim relating to the app is limited to
        the amount you paid for it, if anything. Nothing in these terms limits liability that
        cannot be limited by law.
      </p>
    ),
  },
  {
    id: 'termination',
    title: 'Ending these terms',
    body: (
      <p>
        You can stop using {site.name} at any time by uninstalling it. We may suspend or end
        your license if you break these terms. Sections that by their nature should survive
        (such as the disclaimer and limitation of liability) continue after termination.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of <Fill value={site.jurisdiction} />, without
        regard to conflict-of-law rules. Mandatory consumer protections of the country you
        live in still apply.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>
        We may update these terms as the app changes. We will post the new version here with a
        new date. Continuing to use {site.name} after an update means you accept it.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Questions about these terms:{' '}
        <a href={`mailto:${site.contactEmail}`}>
          <Fill value={site.contactEmail} />
        </a>
      </p>
    ),
  },
];

export function Terms() {
  usePageMeta(`Terms of Use · ${site.name}`, `The terms for using the ${site.name} app and website.`);
  return (
    <DocPage
      eyebrow="Legal"
      title="Terms of Use"
      intro={`Last updated ${site.legalUpdated}`}
      sections={sections}
    />
  );
}
