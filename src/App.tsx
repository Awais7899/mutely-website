import { Outlet, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ScrollManager } from './components/ScrollManager';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Privacy } from './pages/Privacy';
import { Support } from './pages/Support';
import { Terms } from './pages/Terms';

function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

/** Keep in sync with ROUTES in scripts/prerender.mjs. */
export function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
