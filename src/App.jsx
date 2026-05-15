import { useEffect, useMemo, useState } from "react";
import DetailsForm from "./components/DetailsForm.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Quiz from "./components/Quiz.jsx";
import Results from "./components/Results.jsx";
import RoleSelection from "./components/RoleSelection.jsx";
import Verification from "./components/Verification.jsx";
import Auth from "./components/Auth.jsx";
import { generateCertificateId } from "./utils/certificate.js";
import { calculateResults, createEmptyAnswers } from "./utils/scoring.js";

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("dpdpa-theme") || "dark");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("home");
  const [role, setRole] = useState(null);
  const [details, setDetails] = useState(null);
  const [certificateId, setCertificateId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [seenQuestions, setSeenQuestions] = useState(new Set());

  useEffect(() => {
    localStorage.setItem("dpdpa-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Security: Disable Right-click and Copy/Paste
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleCopy = (e) => e.preventDefault();
    const handlePaste = (e) => e.preventDefault();

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  const results = useMemo(() => {
    if (!role || !Object.keys(answers).length) {
      return null;
    }

    return calculateResults(role, answers);
  }, [answers, role]);

  function selectRole(nextRole) {
    setRole(nextRole);
    setAnswers(createEmptyAnswers(nextRole));
    setScreen("details");
  }

  function updateAnswer(questionId, answer) {
    setAnswers((current) => ({ ...current, [questionId]: answer }));
    markAsSeen(questionId);
  }

  function markAsSeen(questionId) {
    setSeenQuestions((current) => {
      const next = new Set(current);
      next.add(questionId);
      return next;
    });
  }

  function retake() {
    if (role) {
      setAnswers(createEmptyAnswers(role));
      setScreen("quiz");
    }
  }

  function resetToHome() {
    setScreen("home");
    setRole(null);
    setDetails(null);
    setCertificateId(null);
    setAnswers({});
    setIsMenuOpen(false);
    setSeenQuestions(new Set());
  }

  return (
    <main className="app-shell">
      <div className="app-frame">
        <Header
          theme={theme}
          onThemeChange={setTheme}
          isMenuOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          showMenuToggle={screen === "quiz"}
        />

        <div className="content-panel">
          {!isAuthenticated ? (
            <Auth 
              onAuth={(email) => {
                setUser(email);
                setIsAuthenticated(true);
              }} 
            />
          ) : (
            <>
              {screen === "home" && <Hero onStart={() => setScreen("roles")} onVerify={() => setScreen("verify")} />}
              {screen === "verify" && (
                <Verification
                  onBack={() => setScreen("home")}
                  onVerify={(data) => {
                    alert(`Verification request for ${data.certId} received. Verification system integrated.`);
                    setScreen("home");
                  }}
                />
              )}
              {screen === "roles" && <RoleSelection onSelect={selectRole} onBack={resetToHome} />}
              {screen === "details" && (
                <DetailsForm
                  onBack={() => setScreen("roles")}
                  onSubmit={(form) => {
                    setDetails(form);
                    setCertificateId(generateCertificateId());
                    setScreen("quiz");
                  }}
                />
              )}
              {screen === "quiz" && role && (
                <Quiz
                  role={role}
                  answers={answers}
                  onAnswer={updateAnswer}
                  onBack={() => setScreen("roles")}
                  onFinish={() => setScreen("results")}
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                  seenQuestions={seenQuestions}
                  markAsSeen={markAsSeen}
                />
              )}
              {screen === "results" && details && role && results && (
                <Results
                  details={details}
                  role={role}
                  results={results}
                  certificateId={certificateId}
                  onBack={() => setScreen("quiz")}
                  onRetake={retake}
                />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
