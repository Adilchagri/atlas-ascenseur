import PageHero from '../components/layout/PageHero.jsx';
import { ProjectCard } from '../components/ui/Cards.jsx';
import { projects } from '../data/siteData.js';

export default function Projects() {
  return (
    <>
      <PageHero current="Our Projects" title="Our" accent="Projects" />
      <section className="section">
        <div className="eyebrow">Portfolio</div>
        <h2 className="section-title section-title-spaced">Installations Across <em>Morocco.</em></h2>
        <div className="proj-page-grid">
          {projects.map((project) => <ProjectCard key={project.title} page {...project} />)}
        </div>
      </section>
    </>
  );
}
