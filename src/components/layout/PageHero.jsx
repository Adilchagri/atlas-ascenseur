export default function PageHero({ current, title, accent }) {
  return (
    <>
      <div className="nav-spacer" />
      <header className="page-hero">
        <div className="page-breadcrumb">Home <span>/ {current}</span></div>
        <h1 className="page-hero-title">{title} <em>{accent}</em></h1>
      </header>
    </>
  );
}
