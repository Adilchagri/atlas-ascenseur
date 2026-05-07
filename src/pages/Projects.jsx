import PageHero from '../components/layout/PageHero.jsx';
import { ProjectCard } from '../components/ui/Cards.jsx';
import { getProjects } from '../data/siteData.js';
import { useUI } from '../context/UIContext.jsx';

export default function Projects() {
  const { language } = useUI();
  const projects = getProjects(language);
  const content = language === 'fr'
    ? { current: 'Nos Projets', title: 'Nos', accent: 'Projets', eyebrow: 'Portfolio', heading: 'Installations à Travers le <em>Maroc.</em>' }
    : { current: 'Our Projects', title: 'Our', accent: 'Projects', eyebrow: 'Portfolio', heading: 'Installations Across <em>Morocco.</em>' };
  return (
    <>
      <PageHero current={content.current} title={content.title} accent={content.accent} />
      <section className="section">
        <div className="eyebrow">{content.eyebrow}</div>
        <h2 className="section-title section-title-spaced" dangerouslySetInnerHTML={{ __html: content.heading }} />
        <div className="proj-page-grid">
          {projects.map((project) => <ProjectCard key={project.title} page {...project} />)}
        </div>
      </section>
    </>
  );
}
