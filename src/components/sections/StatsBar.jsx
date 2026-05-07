import { getStats } from '../../data/siteData.js';
import { useUI } from '../../context/UIContext.jsx';

export default function StatsBar() {
  const { language } = useUI();
  const stats = getStats(language);

  return (
    <div className="stats-bar">
      {stats.map((stat) => (
        <div className="stat-item reveal" key={stat.label}>
          <div className="stat-num">{stat.value}<sup>{stat.suffix}</sup></div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
