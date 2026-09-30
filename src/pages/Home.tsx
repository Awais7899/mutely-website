import {
  ArrowRight,
  BatteryCharging,
  BellOff,
  Check,
  CircleCheck,
  History,
  Layers,
  LockKeyhole,
  MapPin,
  Moon,
  PauseCircle,
  ShieldCheck,
  Smartphone,
  Undo2,
  UserX,
  Vibrate,
  Volume2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Faq } from '../components/Faq';
import { PhoneMockup } from '../components/PhoneMockup';
import { PlayButton } from '../components/PlayButton';
import { Reveal } from '../components/Reveal';
import { usePageMeta } from '../components/usePageMeta';
import { FAQ } from '../content/faq';
import { site } from '../site';

const FEATURES = [
  {
    icon: MapPin,
    title: 'Switches on arrival',
    text: 'Save a place once. Your phone changes mode by itself when you walk in, even with the app closed.',
  },
  {
    icon: Undo2,
    title: 'Restores when you leave',
    text: 'Mutely remembers how your ringer was before you arrived and puts it back when you go.',
  },
  {
    icon: Layers,
    title: 'Every place you need',
    text: 'Office, gym, cinema, place of worship: up to 100 places, each with its own mode and radius.',
  },
  {
    icon: LockKeyhole,
    title: 'Private by design',
    text: 'No account and no server. Your places and location stay on your phone.',
  },
  {
    icon: BatteryCharging,
    title: 'Light on battery',
    text: "Built on Android's own geofencing, so the system does the watching, not a GPS loop.",
  },
  {
    icon: PauseCircle,
    title: 'Pause any time',
    text: 'Turn a single place off, or pause everything, without losing a thing.',
  },
];

const STEPS = [
  {
    title: 'Drop a pin',
    text: 'Tap the map or use your current location, then set a radius from 100 m to 1 km.',
  },
  {
    title: 'Pick a mode',
    text: 'Silent, Vibrate or Loud: choose what your phone should do when you arrive.',
  },
  {
    title: 'Forget about it',
    text: 'Mutely switches when you arrive and restores your ringer when you leave. Every day.',
  },
];

const MODES = [
  { icon: BellOff, title: 'Silent', text: 'No sound, no vibration. For meetings, cinemas and prayer.' },
  { icon: Vibrate, title: 'Vibrate', text: 'Stay reachable quietly. For the office, class or the gym.' },
  { icon: Volume2, title: 'Loud', text: 'Never miss a call. For home, the car or anywhere noisy.' },
];

export function Home() {
  usePageMeta(`${site.name}: ${site.tagline}`);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Reveal>
              <span className="eyebrow">
                <Moon size={14} /> Location-based ringer for Android
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1>
                Your ringer,
                <br />
                <span className="accent">on autopilot.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="hero-lead">
                Mutely switches your phone to Silent, Vibrate or Loud when you arrive at the
                places you choose, and puts it back when you leave. No more buzzing in
                meetings. No more missed calls at home.
              </p>
            </Reveal>
            <Reveal delay={240} className="hero-cta">
              <PlayButton />
              <Link className="btn btn-secondary" to="/#how-it-works">
                See how it works <ArrowRight size={18} />
              </Link>
            </Reveal>
            <Reveal delay={320} as="ul" className="hero-points">
              <li>
                <Check size={16} /> Free to use
              </li>
              <li>
                <Check size={16} /> No account
              </li>
              <li>
                <Check size={16} /> Location stays on your phone
              </li>
            </Reveal>
          </div>

          <Reveal delay={200} className="hero-visual">
            <div className="hero-glow" aria-hidden="true" />
            <PhoneMockup />
            <div className="toast toast-1" aria-hidden="true">
              <span className="t-icon">
                <BellOff size={17} />
              </span>
              <span>
                <strong>Arrived at Office</strong>
                <small>Switched to Silent</small>
              </span>
            </div>
            <div className="toast toast-2 success" aria-hidden="true">
              <span className="t-icon">
                <CircleCheck size={17} />
              </span>
              <span>
                <strong>Left the Gym</strong>
                <small>Ringer restored to Loud</small>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="strip">
        <div className="container">
        <ul>
          <li>
            <UserX size={20} /> No sign-up
          </li>
          <li>
            <ShieldCheck size={20} /> No tracking or ads
          </li>
          <li>
            <Smartphone size={20} /> Works with the app closed
          </li>
          <li>
            <History size={20} /> Activity log on device
          </li>
        </ul>
        </div>
      </div>

      <section id="features">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Features</span>
            <h2>Set it once. It just works.</h2>
            <p>
              Everything you need to keep your phone quiet in the right places, and nothing
              that gets in the way.
            </p>
          </Reveal>
          <div className="features">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 90} className="feature">
                <span className="feature-icon">
                  <f.icon size={22} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Three steps, about a minute.</h2>
          </Reveal>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 110} className="step">
                <span className="step-num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Three modes</span>
            <h2>The right sound for every place.</h2>
          </Reveal>
          <div className="modes">
            {MODES.map((m, i) => (
              <Reveal key={m.title} delay={i * 90} className="mode">
                <span className="feature-icon">
                  <m.icon size={22} />
                </span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="privacy" className="alt">
        <div className="container">
          <Reveal className="privacy-card">
            <div>
              <span className="eyebrow">
                <ShieldCheck size={14} /> Privacy
              </span>
              <h2>Your places never leave your phone.</h2>
              <p>
                Mutely needs your location to know when you arrive, so we built it to keep
                that location to itself. There is no Mutely account and no Mutely server.
              </p>
              <p>
                <Link to="/privacy">
                  Read the privacy policy <ArrowRight size={14} style={{ display: 'inline' }} />
                </Link>
              </p>
            </div>
            <ul className="check-list">
              <li>
                <CircleCheck size={20} /> Places and activity are stored only on your device
              </li>
              <li>
                <CircleCheck size={20} /> Excluded from cloud backups and device transfers
              </li>
              <li>
                <CircleCheck size={20} /> No ads, no analytics, nothing sold
              </li>
              <li>
                <CircleCheck size={20} /> Crash reports have coordinates and place names removed
              </li>
              <li>
                <CircleCheck size={20} /> Delete all your places from Settings at any time
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="faq">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Questions, answered.</h2>
            <p>
              More help on the <Link to="/support">support page</Link>.
            </p>
          </Reveal>
          <Reveal>
            <Faq items={FAQ.slice(0, 6)} />
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="cta">
            <h2>Never buzz in a meeting again.</h2>
            <p>Install Mutely, add your first place, and let your phone handle the rest.</p>
            <PlayButton />
          </Reveal>
        </div>
      </section>
    </>
  );
}
