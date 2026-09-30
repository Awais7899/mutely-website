import { BellOff, Settings, Sun, Vibrate, Volume2, type LucideIcon } from 'lucide-react';
import { LogoMark } from './Logo';

type Mode = 'silent' | 'vibrate' | 'loud';

const MODE: Record<Mode, { label: string; icon: LucideIcon }> = {
  silent: { label: 'Silent', icon: BellOff },
  vibrate: { label: 'Vibrate', icon: Vibrate },
  loud: { label: 'Loud', icon: Volume2 },
};

const PLACES: { name: string; mode: Mode; radius: string; state: 'active' | 'on' | 'off' }[] =
  [
    { name: 'Office', mode: 'silent', radius: '150 m', state: 'active' },
    { name: 'Gym', mode: 'vibrate', radius: '250 m', state: 'on' },
    { name: 'Cinema', mode: 'silent', radius: '100 m', state: 'on' },
    { name: 'Home', mode: 'loud', radius: '150 m', state: 'off' },
  ];

/** Dots on the mini radar, in % of its box (center = 50/50). */
const DOTS = [
  { x: 50, y: 42, state: 'active' },
  { x: 72, y: 30, state: 'on' },
  { x: 30, y: 70, state: 'on' },
  { x: 66, y: 74, state: 'off' },
];

/** A stepped-wedge sweep trail, like the app's radar (no gradients). */
function wedge(from: number, to: number, r = 48): string {
  const p = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${50 + r * Math.sin(a)},${50 - r * Math.cos(a)}`;
  };
  return `M50,50 L${p(from)} A${r},${r} 0 0,1 ${p(to)} Z`;
}
const TRAIL = [
  { from: -12, to: 0, o: 0.22 },
  { from: -26, to: -12, o: 0.14 },
  { from: -44, to: -26, o: 0.08 },
  { from: -70, to: -44, o: 0.04 },
];

function MiniRadar({ size }: { size: number }) {
  return (
    <div className="radar" style={{ width: size, height: size }} aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="49" fill="var(--surface-alt)" stroke="var(--border)" />
        {[36, 23, 11].map(r => (
          <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="var(--border)" strokeWidth="0.8" />
        ))}
        <line x1="50" y1="3" x2="50" y2="97" stroke="var(--border)" strokeWidth="0.6" strokeDasharray="2 2" />
        <line x1="3" y1="50" x2="97" y2="50" stroke="var(--border)" strokeWidth="0.6" strokeDasharray="2 2" />
      </svg>
      <svg className="radar-sweep" width={size} height={size} viewBox="0 0 100 100">
        {TRAIL.map(w => (
          <path key={w.from} d={wedge(w.from, w.to)} fill="var(--accent)" fillOpacity={w.o} />
        ))}
        <line x1="50" y1="50" x2="50" y2="2" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.8" />
      </svg>
      {DOTS.map((d, i) => (
        <span
          key={i}
          className={`radar-dot ${d.state === 'on' ? '' : d.state}`}
          style={{ left: `${d.x}%`, top: `${d.y}%` }}
        />
      ))}
      <span className="radar-you" />
    </div>
  );
}

/**
 * The app's Home screen, rebuilt in HTML so it is crisp at any size and follows the site
 * theme. Purely decorative; screen readers get a one-line description instead.
 */
export function PhoneMockup() {
  return (
    <div className="phone" role="img" aria-label="Mutely home screen: at the Office, ringer switched to Silent.">
      <div className="phone-screen" aria-hidden="true">
        <div className="m-top">
          <LogoMark size={26} />
          <div className="m-title">
            <small>Good morning</small>
            <strong>Mutely</strong>
          </div>
          <span className="m-round">
            <Sun size={12} />
          </span>
          <span className="m-round">
            <Settings size={12} />
          </span>
        </div>

        <div className="m-card active">
          <div className="m-row">
            <span className="m-badge">Active now</span>
            <span className="m-chip">
              <BellOff size={10} /> Phone · <b>Silent</b>
            </span>
          </div>
          <div className="m-body">
            <MiniRadar size={96} />
            <div className="m-focus">
              <small>YOU&apos;RE AT</small>
              <strong>Office</strong>
              <span>Ringer set to Silent</span>
            </div>
          </div>
          <div className="m-modes">
            <div>
              <b>2</b>
              <span>Silent</span>
            </div>
            <div>
              <b>1</b>
              <span>Vibrate</span>
            </div>
            <div>
              <b>1</b>
              <span>Loud</span>
            </div>
          </div>
        </div>

        <div className="m-section">
          <span>Your places</span>
          <span className="m-tabs">
            <span>All 4</span>
            <span>On 3</span>
          </span>
        </div>

        {PLACES.map(p => {
          const Icon = MODE[p.mode].icon;
          return (
            <div key={p.name} className={`m-place ${p.state === 'on' ? '' : p.state}`}>
              <span className="m-tile">
                <Icon size={13} />
              </span>
              <span className="m-place-text">
                <strong>{p.name}</strong>
                <span>
                  {MODE[p.mode].label} · {p.radius}
                </span>
              </span>
              <span className={`m-switch ${p.state === 'off' ? 'off' : ''}`} />
            </div>
          );
        })}

        <span className="m-fab">+ Add place</span>
      </div>
    </div>
  );
}

