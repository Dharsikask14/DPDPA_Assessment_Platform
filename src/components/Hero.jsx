import heroImage from "../assets/hero-illustration.png";

export default function Hero({ onStart, onVerify }) {
  return (
    <section className="hero-view">
      <div className="hero-art">
        <img src={heroImage} alt="Data protection illustration" />
      </div>
      <div className="hero-copy">
        <p className="eyebrow">DPDPA readiness platform</p>
        <h2>DPDPA Assessment Overview</h2>
        <p>
          A guided privacy and security assessment for general users and IT teams.
          Complete each section, review risks in real time, and download a certificate
          after completion.
        </p>
        <button className="primary-btn" type="button" onClick={onStart}>
          Start assessment
        </button>

        <div className="hero-verification">
          <p>Already have an assessment certificate?</p>
          <button className="ghost-btn" type="button" onClick={onVerify}>
            Verify through Certificate ID
          </button>
        </div>
      </div>
    </section>
  );
}
