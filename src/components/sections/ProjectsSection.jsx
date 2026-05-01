import Button from '../ui/Button.jsx';
import { ProjectCard } from '../ui/Cards.jsx';
import { projects } from '../../data/siteData.js';

export default function ProjectsSection() {
  return (
    <section className="section">
      <div className="eyebrow">Selected Projects</div>
      <h2 className="section-title section-title-spaced">Where Our Work <em>Speaks.</em></h2>
      <div className="projects-bento">
        {projects.slice(0, 5).map((project) => <ProjectCard key={project.title} {...project} />)}
      </div>
      <div className="centered-action">
        <Button to="/projects" variant="outline">View All Projects</Button>
      </div>
    </section>
  );
}
