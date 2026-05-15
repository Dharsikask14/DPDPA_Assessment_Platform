import { quizSets } from "../data/quizData.js";

export function createEmptyAnswers(role) {
  const answers = {};

  quizSets[role].forEach((section) => {
    section.questions.forEach((question) => {
      answers[question.id] = null;
    });
  });

  return answers;
}

export function getQuestionCount(role) {
  return quizSets[role].reduce((total, section) => total + section.questions.length, 0);
}

export function isSectionComplete(role, sectionIndex, answers) {
  return quizSets[role][sectionIndex].questions.every((question) => answers[question.id] !== null);
}

export function canOpenSection(role, sectionIndex, answers) {
  if (sectionIndex === 0) {
    return true;
  }

  return quizSets[role]
    .slice(0, sectionIndex)
    .every((_, index) => isSectionComplete(role, index, answers));
}

export function calculateResults(role, answers) {
  const sections = quizSets[role].map((section) => {
    const yesCount = section.questions.filter((question) => answers[question.id] === "yes").length;
    const score = Math.round((yesCount / section.questions.length) * 100);

    return {
      title: section.title,
      shortTitle: section.shortTitle,
      score,
      yesCount,
      total: section.questions.length,
    };
  });

  const totalQuestions = getQuestionCount(role);
  const yesAnswers = Object.values(answers).filter((answer) => answer === "yes").length;
  const score = Math.round((yesAnswers / totalQuestions) * 100);

  return {
    score,
    grade: getGrade(score),
    status: score >= 70 ? "Pass" : "Needs Improvement",
    sections,
    warnings: getWarnings(role, answers),
  };
}

export function getAnsweredCount(answers) {
  return Object.values(answers).filter(Boolean).length;
}

export function getWarnings(role, answers) {
  return quizSets[role].flatMap((section) =>
    section.questions
      .filter((question) => answers[question.id] === "no")
      .map((question, index) => ({
        id: question.id,
        section: section.shortTitle,
        title: `${section.shortTitle} gap ${index + 1}`,
        question: question.text,
        warning: question.warning,
        action: question.action,
      }))
  );
}

export function getGrade(score) {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 45) return "D";
  return "Risk";
}
