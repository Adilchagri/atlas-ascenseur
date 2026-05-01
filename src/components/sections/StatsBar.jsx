import { stats } from '../../data/siteData.js';

export default function StatsBar() {
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
