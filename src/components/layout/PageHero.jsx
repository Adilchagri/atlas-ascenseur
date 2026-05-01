import { useUI } from '../../context/UIContext.jsx';

export default function PageHero({ current, title, accent }) {
  const { t } = useUI();
  return (
    <>
      <div className="nav-spacer" />
      <header className="page-hero">
        <div className="page-breadcrumb">{t('home')} <span>/ {current}</span></div>
        <h1 className="page-hero-title">{title} <em>{accent}</em></h1>
      </header>
    </>
  );
}
