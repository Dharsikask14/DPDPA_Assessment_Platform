import { roleCards } from "../data/quizData.js";

export default function RoleSelection({ onSelect, onBack }) {
  return (
    <section className="role-view">
      <div className="section-heading">
        <p className="eyebrow">Choose questionnaire</p>
        <h2>Select your assessment path</h2>
      </div>

      <div className="role-grid">
        {Object.entries(roleCards).map(([role, card]) => (
          <article className="role-card" key={role}>
            <div className="role-icon" aria-hidden="true">
              {role === "general" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              )}
            </div>
            <h3>{card.label}</h3>
            <p>{card.description}</p>
            <ul>
              {card.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <button className="primary-btn compact" type="button" onClick={() => onSelect(role)}>
              Take quiz
            </button>
          </article>
        ))}
      </div>

      <button className="ghost-btn center-btn" type="button" onClick={onBack}>
        Back to home
      </button>
    </section>
  );
}
