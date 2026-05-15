export default function Header({ theme, onThemeChange, isMenuOpen, toggleMenu, showMenuToggle }) {
  return (
    <header className="app-header">
      <div className="brand">
        {showMenuToggle && (
          <button
            className={isMenuOpen ? "hamburger active" : "hamburger"}
            type="button"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
            <span />
          </button>
        )}
        <div className="brand-logo-icon" aria-hidden="true">
          HI
        </div>
        <div>
          <p className="brand-kicker">Hackers Infotech</p>
          <h1>360° Cyber defence for digital Landscape</h1>
        </div>
      </div>

      <div className="theme-actions" aria-label="Theme controls">
        <button
          className={theme === "dark" ? "theme-icon active" : "theme-icon"}
          type="button"
          onClick={() => onThemeChange("dark")}
          aria-label="Enable dark mode"
        >
          <span className="moon-icon" />
        </button>
        <button
          className={theme === "light" ? "theme-icon active" : "theme-icon"}
          type="button"
          onClick={() => onThemeChange("light")}
          aria-label="Enable light mode"
        >
          <span className="sun-icon" />
        </button>
      </div>
    </header>
  );
}
