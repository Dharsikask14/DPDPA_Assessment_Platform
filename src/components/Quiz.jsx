import { useEffect, useMemo, useState } from "react";
import { quizSets } from "../data/quizData.js";
import { canOpenSection, getAnsweredCount, getQuestionCount, isSectionComplete } from "../utils/scoring.js";
import ProgressBar from "./ProgressBar.jsx";

export default function Quiz({
  role,
  answers,
  onAnswer,
  onFinish,
  onBack,
  isMenuOpen,
  setIsMenuOpen,
  seenQuestions,
  markAsSeen,
}) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const sections = quizSets[role];
  const section = sections[sectionIndex];
  const question = section.questions[questionIndex];
  const totalQuestions = getQuestionCount(role);
  const answeredCount = getAnsweredCount(answers);
  const progress = Math.round((answeredCount / totalQuestions) * 100);
  const sectionComplete = isSectionComplete(role, sectionIndex, answers);
  const isLastSection = sectionIndex === sections.length - 1;
  const isLastQuestion = questionIndex === section.questions.length - 1;
  const currentAnswered = answers[question.id] !== undefined && answers[question.id] !== null;

  useEffect(() => {
    markAsSeen(question.id);
  }, [question.id, markAsSeen]);

  const lockedMessage = useMemo(() => {
    if (sectionComplete) {
      return isLastSection ? "All sections are complete. Submit to view your report." : "Next section unlocked.";
    }
    return "Answer all questions in this section to unlock the next section.";
  }, [isLastSection, sectionComplete]);

  function handleAnswer(questionId, value) {
    onAnswer(questionId, value);
    
    // Auto-advance to next question if not the last one in section
    if (!isLastQuestion) {
      setTimeout(() => {
        setQuestionIndex((current) => current + 1);
      }, 400);
    }
  }

  function openSection(nextIndex) {
    if (canOpenSection(role, nextIndex, answers)) {
      setSectionIndex(nextIndex);
      setQuestionIndex(0);
    }
  }

  function goNext() {
    if (!currentAnswered) return;
    if (!isLastQuestion) {
      setQuestionIndex((current) => current + 1);
      return;
    }
    if (!sectionComplete) return;
    if (isLastSection) {
      onFinish();
      return;
    }
    setSectionIndex((current) => current + 1);
    setQuestionIndex(0);
  }

  function goPrevious() {
    if (questionIndex > 0) {
      setQuestionIndex((current) => current - 1);
      return;
    }
    if (sectionIndex > 0) {
      const previousSection = sections[sectionIndex - 1];
      setSectionIndex((current) => current - 1);
      setQuestionIndex(previousSection.questions.length - 1);
    } else {
      onBack();
    }
  }

  const nextDisabled = !currentAnswered || (isLastQuestion && !sectionComplete);

  return (
    <section className="quiz-view">
      {isMenuOpen && <div className="sidebar-backdrop" />}

      <aside className={isMenuOpen ? "quiz-sidebar open" : "quiz-sidebar"}>
        <button className="close-sidebar-btn" type="button" onClick={() => setIsMenuOpen(false)}>×</button>
        <div className="active-section-label">
          <span>Section {sectionIndex + 1}</span>
          <strong>{section.shortTitle}</strong>
        </div>

        <div className="section-list">
          {sections.map((item, index) => {
            const unlocked = canOpenSection(role, index, answers);
            const isActive = index === sectionIndex;
            return (
              <div className={isActive ? "section-group active" : "section-group"} key={item.title}>
                <button
                  className="section-toggle"
                  type="button"
                  disabled={!unlocked}
                  onClick={() => openSection(index)}
                >
                  <b>{index + 1}</b>
                  <span>
                    Section {index + 1}
                    <strong>{item.shortTitle}</strong>
                  </span>
                </button>
                {isActive && (
                  <div className="section-question-list">
                    {item.questions.map((questionItem, questionNum) => {
                      const isAnswered = answers[questionItem.id] !== undefined && answers[questionItem.id] !== null;
                      const isSeen = seenQuestions.has(questionItem.id);
                      const isCurrent = index === sectionIndex && questionNum === questionIndex;

                      let statusClass = "";
                      if (isAnswered) statusClass = "answered";
                      else if (isSeen) statusClass = "seen";

                      return (
                        <button
                          key={questionItem.id}
                          className={`question-pill ${statusClass} ${isCurrent ? "active" : ""}`}
                          onClick={() => {
                            setQuestionIndex(questionNum);
                          }}
                        >
                          {questionNum + 1}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      <div className="quiz-main">
        <ProgressBar value={progress} showLabel={false} />

        <div className="section-tabs">
          {sections.map((item, index) => {
            const unlocked = canOpenSection(role, index, answers);
            return (
              <button
                className={index === sectionIndex ? "active" : ""}
                type="button"
                disabled={!unlocked}
                key={item.title}
                onClick={() => openSection(index)}
              >
                <span>Section {index + 1}</span>
                {item.shortTitle}
              </button>
            );
          })}
        </div>

        <div className="quiz-content-professional">
          <p className="section-note">{lockedMessage}</p>
          <h2 className="quiz-section-title">{section.title}</h2>

          <article className="question-card professional">
            <header className="question-header">
              <span className="question-badge">Question {questionIndex + 1}</span>
              <span className="question-total">of {section.questions.length}</span>
            </header>
            
            <h3 className="question-text">{question.text}</h3>
            
            <div className="answer-row professional">
              <button
                className={`answer-btn professional success ${answers[question.id] === "yes" ? "selected" : ""}`}
                type="button"
                onClick={() => handleAnswer(question.id, "yes")}
              >
                Yes
              </button>
              <button
                className={`answer-btn professional danger ${answers[question.id] === "no" ? "selected" : ""}`}
                type="button"
                onClick={() => handleAnswer(question.id, "no")}
              >
                No
              </button>
            </div>
          </article>

          <div className="quiz-actions professional">
            <button className="ghost-btn professional compact" type="button" onClick={goPrevious}>
              ← Previous
            </button>
            <button className="ghost-btn professional compact" type="button" onClick={onBack}>
              Exit Assessment
            </button>
            <button className="primary-btn professional compact" type="button" onClick={goNext} disabled={nextDisabled}>
              {isLastQuestion && isLastSection ? "Submit Assessment" : "Next Question →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
