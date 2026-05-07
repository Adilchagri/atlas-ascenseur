import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Elevators from './pages/Elevators.jsx';
import Projects from './pages/Projects.jsx';
import Service from './pages/Service.jsx';
import Contact from './pages/Contact.jsx';
import Configurator from './pages/Configurator.jsx';
import ElevatorDetail from './pages/ElevatorDetail.jsx';
import CabinDesignPage from './pages/CabinDesignPage.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    setRouteLoading(true);
    const timer = window.setTimeout(() => setRouteLoading(false), 620);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <Layout>
      <ScrollToTop />
      <div className={`route-loader ${routeLoading ? 'active' : ''}`} aria-hidden="true">
        <span />
      </div>
      <div className="page-transition-shell" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/elevators" element={<Elevators />} />
          <Route path="/elevators/circular-elevators" element={<ElevatorDetail />} />
          <Route path="/elevators/exterior-elevators" element={<ElevatorDetail />} />
          <Route path="/elevators/astoria-range" element={<ElevatorDetail />} />
          <Route path="/elevators/como-range" element={<ElevatorDetail />} />
          <Route path="/elevators/hospital-lifts" element={<ElevatorDetail />} />
          <Route path="/elevators/car-lifts" element={<ElevatorDetail />} />
          <Route path="/elevators/escalators-walkways" element={<ElevatorDetail />} />
          <Route path="/elevators/como-commercial" element={<ElevatorDetail />} />
          <Route path="/elevators/cargo-lifts" element={<ElevatorDetail />} />
          <Route path="/elevators/dumbwaiter-lifts" element={<ElevatorDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/cabin-design" element={<CabinDesignPage />} />
          <Route path="/inspiration-gallery" element={<CabinDesignPage />} />
          <Route path="/door-collections" element={<CabinDesignPage />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/configurator" element={<Configurator />} />
        </Routes>
      </div>
    </Layout>
  );
}
