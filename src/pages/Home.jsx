import { useReveal } from '../utils/useReveal.js';
import Hero from '../components/sections/Hero.jsx';
import StatsBar from '../components/sections/StatsBar.jsx';
import WhySection from '../components/sections/WhySection.jsx';
import ElevatorsSection from '../components/sections/ElevatorsSection.jsx';
import ProjectsSection from '../components/sections/ProjectsSection.jsx';
import FaqSection from '../components/sections/FaqSection.jsx';

export default function Home() {
  useReveal();

  return (
    <>
      <Hero />
      <StatsBar />
      <WhySection />
      <ElevatorsSection />
      <ProjectsSection />
      <FaqSection />
    </>
  );
}
