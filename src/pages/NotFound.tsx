import { ArrowLeft, MapPinOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../components/usePageMeta';
import { site } from '../site';

export function NotFound() {
  usePageMeta(`Page not found · ${site.name}`);
  return (
    <div className="container not-found">
      <div>
        <span className="feature-icon" style={{ margin: '0 auto 16px' }}>
          <MapPinOff size={22} />
        </span>
        <h1>404</h1>
        <p>This place isn't on the map. The page may have moved or never existed.</p>
        <Link className="btn btn-primary" to="/">
          <ArrowLeft size={18} /> Back to home
        </Link>
      </div>
    </div>
  );
}
