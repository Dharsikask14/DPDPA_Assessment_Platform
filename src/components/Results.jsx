import logo from "../assets/company-logo.jpeg";
import { roleCards } from "../data/quizData.js";
import { downloadCertificate, downloadReport, prepareEmailPackage } from "../utils/certificate.js";
import ProgressBar from "./ProgressBar.jsx";

export default function Results({ details, role, results, certificateId, onBack, onRetake }) {
  const roleLabel = roleCards[role].label;

  return (
    <section className="results-view">
      <div className="results-header">
        <div>
          <p className="eyebrow">Assessment results</p>
          <h2>{results.score}% | {results.grade} Grade | {results.status}</h2>
        </div>
        <div className="result-badge">{roleLabel}</div>
      </div>

      <ProgressBar value={results.score} showLabel={false} />

      <div className="results-grid">
        <div className="score-panel">
          {results.sections.map((section) => {
            const isCompleted = section.score === 100 || section.yesCount + (section.noCount || 0) === section.total;
            return (
              <div className={isCompleted ? "section-score completed" : "section-score"} key={section.title}>
                <div>
                  <span>{section.title}</span>
                  <strong>{section.score}%</strong>
                </div>
                <div className="mini-track">
                  <span style={{ width: `${section.score}%` }} />
                </div>
                <small style={{ color: "var(--muted)", fontSize: "0.8rem" }}>
                  {section.yesCount} of {section.total} compliant
                </small>
              </div>
            );
          })}
        </div>

        <div className="warning-panel">
          <h3>Critical warnings and recommendations</h3>
          <div className="warning-list">
            {results.warnings.length ? (
              results.warnings.map((item) => (
                <article className="warning-card" key={item.id}>
                  <strong>{item.section}: answered No</strong>
                  <p>{item.question}</p>
                  <p><b>Warning:</b> {item.warning}</p>
                  <p><b>Recommended action:</b> {item.action}</p>
                </article>
              ))
            ) : (
              <article className="success-card">
                <strong>No critical warnings found.</strong>
                <p>Maintain evidence, periodic review, and privacy-by-design checks for new activities.</p>
              </article>
            )}
          </div>
        </div>
      </div>

      <div className="certificate-strip">
        <div>
          <strong>Certificate ready for {details.name}</strong>
          <span>{details.company} | {details.email}</span>
          <small>Certificate ID: {certificateId}</small>
        </div>
        <div className="result-actions">
          <button
            className="primary-btn compact"
            type="button"
            onClick={() => downloadCertificate({ details, roleLabel, results, logoSrc: logo, certificateId })}
          >
            Download certificate
          </button>
          <button className="primary-btn compact" type="button" onClick={() => downloadReport({ details, roleLabel, results, certificateId })}>
            Download report
          </button>
          <button
            className="primary-btn compact"
            type="button"
            onClick={() => prepareEmailPackage({ details, roleLabel, results, logoSrc: logo, certificateId })}
          >
            Send to email
          </button>
        </div>
      </div>

      <div className="result-footer">
        <button className="ghost-btn" type="button" onClick={onBack}>
          Back to assessment
        </button>
        <button className="ghost-btn" type="button" onClick={onRetake}>
          Re-take assessment
        </button>
      </div>
    </section>
  );
}
