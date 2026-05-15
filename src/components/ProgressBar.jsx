export default function ProgressBar({ value, label, showLabel = true }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="progress-container">
      {showLabel && label && <p className="progress-label">{label}</p>}
      <div className="progress-flex">
        <div className="progress-track">
          <span className="progress-fill" style={{ width: `${safeValue}%` }} />
        </div>
        <strong className="progress-percentage">{safeValue}%</strong>
      </div>
    </div>
  );
}
