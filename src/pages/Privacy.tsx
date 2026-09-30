import { Link } from 'react-router-dom';
import { DocPage, Fill, type DocSection } from '../components/DocPage';
import { usePageMeta } from '../components/usePageMeta';
import { site } from '../site';

/*
 * Keep this in step with the app. Facts it relies on (StatusRoute repo):
 * - Location, places, activity log and settings are stored only on the device
 *   (PlaceStore.kt, AsyncStorage); allowBackup=false and data_extraction_rules.xml exclude
 *   everything from cloud backup and device transfer.
 * - The only network traffic: Google Maps tiles (place editor), Google Play services
 *   (location, geofencing), Sentry crash reports when a DSN is configured (sentry.ts),
 *   with coordinates and place names removed (scrub.ts) and sendDefaultPii off.
 * - Release permissions: see the table below (from the merged release manifest). WAKE_LOCK
 *   and FOREGROUND_SERVICE come from androidx.work, not from Mutely's own code.
 */

const sections: DocSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          {site.name} (package <code>{site.packageName}</code>) is published by{' '}
          <strong>
            <Fill value={site.publisher} />
          </strong>{' '}
          (“we”, “us”). This policy explains what the {site.name} Android app and this website
          do with information about you. Questions:{' '}
          <a href={`mailto:${site.contactEmail}`}>
            <Fill value={site.contactEmail} />
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'information-on-your-device',
    title: 'Information that stays on your device',
    body: (
      <>
        <p>
          To do its one job, switching your ringer when you arrive at a place, {site.name} uses
          the following. <strong>All of it is stored only on your phone.</strong> We do not
          operate a server, and none of it is sent to us.
        </p>
        <ul>
          <li>
            <strong>Precise location, including in the background.</strong> Used only to
            detect when you arrive at or leave the places you save, even while the app is
            closed, and to show your position on the map and the distance to your places in
            the app. {site.name} does not record the route you travel.
          </li>
          <li>
            <strong>Places you save:</strong> the name you give each place, its map position,
            radius, ringer mode and whether it is on.
          </li>
          <li>
            <strong>Activity log:</strong> your 20 most recent arrivals and departures and the
            mode that was applied, so you can check that switching works. Older entries are
            deleted automatically.
          </li>
          <li>
            <strong>Ringer state:</strong> your current ringer mode, and the mode you had before
            arriving so it can be restored when you leave.
          </li>
          <li>
            <strong>Preferences:</strong> theme, animation setting, default mode and radius, and
            whether automation is paused.
          </li>
        </ul>
        <p>
          This data lives in the app's private storage, which other apps cannot read. It is
          excluded from Android cloud backups and device-to-device transfers, so it is not
          copied to your Google account.
        </p>
      </>
    ),
  },
  {
    id: 'information-that-leaves',
    title: 'Information that leaves your device',
    body: (
      <>
        <p>{site.name} has no advertising, analytics or tracking tools. Only these services receive data:</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>When</th>
                <th>What it receives</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Google Play services</strong> (location and geofencing)
                </td>
                <td>Whenever places are active</td>
                <td>
                  Android's location system detects arrivals for {site.name}. Google may process
                  location data under your device's location settings and the{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Google Privacy Policy
                  </a>
                  .
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Google Maps</strong>
                </td>
                <td>While the map is shown in the place editor</td>
                <td>
                  Map requests for the area you view, plus standard technical data such as your
                  IP address, under the{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Google Privacy Policy
                  </a>
                  .
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Sentry</strong> (crash reporting)
                </td>
                <td>Only if the app hits an error</td>
                <td>
                  The error message and technical details such as app version, device model and
                  Android version. Coordinates and place names are removed before sending, and no
                  screenshots, contacts or identifiers are attached. Sentry may see your IP
                  address when the report is sent. See the{' '}
                  <a href="https://sentry.io/privacy/" target="_blank" rel="noopener noreferrer">
                    Sentry Privacy Policy
                  </a>
                  .
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 16 }}>
          If you use <strong>Share {site.name}</strong>, Android's share sheet sends only the
          message you see to the app you pick.
        </p>
        <p>
          We do not sell, rent or trade your information, and we do not share it for
          advertising.
        </p>
      </>
    ),
  },
  {
    id: 'permissions',
    title: 'Permissions and why',
    body: (
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Permission</th>
              <th>Why {site.name} asks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Precise location</td>
              <td>Detect when you arrive at or leave a saved place. Approximate location is too coarse to do this.</td>
            </tr>
            <tr>
              <td>Background location (“Allow all the time”)</td>
              <td>Keep switching while the app is closed. Used for nothing else.</td>
            </tr>
            <tr>
              <td>Do Not Disturb access</td>
              <td>Required by Android to switch your phone to Silent. Vibrate and Loud work without it.</td>
            </tr>
            <tr>
              <td>Run at startup</td>
              <td>Re-register your places after your phone restarts, so switching carries on.</td>
            </tr>
            <tr>
              <td>Internet and network state</td>
              <td>Load map tiles and send crash reports.</td>
            </tr>
            <tr>
              <td>Keep awake / foreground service</td>
              <td>
                Declared by WorkManager, a standard Android library that one of {site.name}'s
                components includes for short background tasks. {site.name} does not run a
                persistent foreground service or notification.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'retention-and-deletion',
    title: 'Keeping and deleting your data',
    body: (
      <>
        <p>
          Data on your device is kept until you delete it or uninstall the app. You can:
        </p>
        <ul>
          <li>
            Delete one place from its edit screen, or all places from{' '}
            <strong>Settings → Data → Delete all places</strong>.
          </li>
          <li>
            Clear the activity log from <strong>Settings → Recent activity → Clear</strong>.
          </li>
          <li>Pause switching, or revoke location or Do Not Disturb access in Android settings.</li>
          <li>Uninstall {site.name}, which removes all of its data from your phone.</li>
        </ul>
        <p>
          Crash reports are kept by Sentry for a limited period and then deleted. Because they
          carry no name or account, we cannot link them to you, but if you believe a report
          includes your information, email us and we will delete what we can identify. More
          at <Link to="/support#delete-data">Delete your data</Link>.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <p>
        Your places never leave the app's private storage, and nothing is sent to a server we
        run. Crash reports travel over encrypted connections (HTTPS). No method of storage or
        transmission is perfectly secure, but keeping data on the device is the strongest
        protection we can offer.
      </p>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        {site.name} is a general-audience utility and is not directed at children under 13.
        It does not knowingly collect personal information from children, and it stores no
        personal information off the device in any case.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: (
      <p>
        Depending on where you live (for example under the GDPR or CCPA), you may have the right
        to access, correct or delete personal information and to object to its processing.
        Since the data {site.name} uses stays on your phone, you control it directly in the
        app. For anything else, email{' '}
        <a href={`mailto:${site.contactEmail}`}>
          <Fill value={site.contactEmail} />
        </a>{' '}
        and we aim to reply within 30 days.
      </p>
    ),
  },
  {
    id: 'website',
    title: 'This website',
    body: (
      <p>
        This site sets no cookies and uses no analytics. Its fonts are served from this site,
        not from a third party. It remembers your light or dark theme choice in your browser's
        local storage, which never leaves your browser. Our hosting provider may keep standard
        server logs (such as IP addresses) for security.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        If {site.name} starts handling data differently, we will update this page and the date
        at the top before the change ships.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        <strong>
          <Fill value={site.publisher} />
        </strong>
        <br />
        Email:{' '}
        <a href={`mailto:${site.contactEmail}`}>
          <Fill value={site.contactEmail} />
        </a>
      </p>
    ),
  },
];

export function Privacy() {
  usePageMeta(
    `Privacy Policy · ${site.name}`,
    `How ${site.name} handles your location and data: everything stays on your phone.`,
  );
  return (
    <DocPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro={`Last updated ${site.legalUpdated}`}
      summary={
        <>
          <p>
            <strong>The short version:</strong>
          </p>
          <ul>
            <li>Your location and saved places stay on your phone. We have no server.</li>
            <li>No account, no ads, no analytics. We sell nothing.</li>
            <li>Crash reports, if the app errors, have coordinates and place names removed.</li>
            <li>Uninstalling the app deletes everything it stored.</li>
          </ul>
        </>
      }
      sections={sections}
    />
  );
}
