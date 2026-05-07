import Button from '../ui/Button.jsx';
import { ProjectCard } from '../ui/Cards.jsx';
import { getProjects } from '../../data/siteData.js';
import { useUI } from '../../context/UIContext.jsx';

export default function ProjectsSection() {
  const { language, t } = useUI();
  const projects = getProjects(language);
  return (
    <section className="section">
      <div className="eyebrow">{t('selectedProjects')}</div>
      <h2 className="section-title section-title-spaced" dangerouslySetInnerHTML={{ __html: t('projectsHeading') }} />
      <div className="projects-bento">
        {projects.slice(0, 5).map((project) => <ProjectCard key={project.title} {...project} />)}
      </div>
      <div className="centered-action">
        <Button to="/projects" variant="outline">{t('viewAllProjects')}</Button>
      </div>
    </section>
  );
}
