import { useUI } from '../../context/UIContext.jsx';

export default function PageHero({ current, title, accent, separateAccent = false }) {
  const { t } = useUI();
  return (
    <>
      <div className="nav-spacer" />
      <header className="page-hero">
        <div className="page-breadcrumb">{t('home')} <span>/ {current}</span></div>
        <h1 className="page-hero-title">{title} {!separateAccent && <em>{accent}</em>}</h1>
        {separateAccent && <h2 className="page-hero-subtitle">{accent}</h2>}
      </header>
    </>
  );
}
