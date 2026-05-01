import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Elevators from './pages/Elevators.jsx';
import Projects from './pages/Projects.jsx';
import Service from './pages/Service.jsx';
import Contact from './pages/Contact.jsx';
import Configurator from './pages/Configurator.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/elevators" element={<Elevators />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/configurator" element={<Configurator />} />
      </Routes>
    </Layout>
  );
}
