import React from 'react';
import './MetricCard.css';

export default function MetricCard({ label, value, subtext, icon, type = 'info', variant = 'standard' }) {
  if (variant === 'primary') {
    return (
      <div className={`metric-card primary-variant ${type}`}>
        <div className="metric-primary-content">
          <span className="metric-primary-label">{label}</span>
          <div className="metric-primary-value">{value}</div>
          {subtext && <div className="metric-primary-subtext">{subtext}</div>}
        </div>
        <div className="metric-primary-decor">
          <div className="decor-circle"></div>
        </div>
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <div className={`metric-card pill-variant ${type}`}>
        <div className={`metric-pill-icon ${type}`} aria-hidden="true">
          {icon}
        </div>
        <div className="metric-pill-content">
          <div className="metric-pill-value">{value}</div>
          <span className="metric-pill-label">{label}</span>
        </div>
      </div>
    );
  }

  // Fallback Standard Variant
  return (
    <div className={`metric-card standard-variant ${type}`}>
      <div className="metric-card-header">
        <div className={`metric-card-icon-container ${type}`} aria-hidden="true">
          {icon}
        </div>
        <span className="metric-card-label">{label}</span>
      </div>
      <div className="metric-card-value">{value}</div>
      {subtext && <div className="metric-card-subtext">{subtext}</div>}
    </div>
  );
}
