import { useState } from "react";

export default function Verification({ onBack, onVerify }) {
  const [formData, setFormData] = useState({
    certId: "",
    name: ""
  });

  const [status, setStatus] = useState("idle"); // idle, error, success

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.certId || !formData.name) return;
    
    // Simulating database connection check
    setStatus("verifying");
    
    setTimeout(() => {
      // Since this is a client-side only app, we simulate a "Database not connected" warning
      // as requested by the user
      setStatus("error");
    }, 1200);
  }

  return (
    <section className="details-view">
      <div className="details-panel professional">
        <div className="details-header">
          <h2>Verify Certificate</h2>
          <p>Enter the details below to validate an existing DPDPA assessment certificate.</p>
        </div>

        <form onSubmit={handleSubmit} className="details-form">
          <div className="field">
            <span>Certificate ID</span>
            <input
              type="text"
              placeholder="e.g. DPDPA-20260515..."
              value={formData.certId}
              onChange={(e) => {
                setFormData({ ...formData, certId: e.target.value });
                if (status !== "idle") setStatus("idle");
              }}
              required
            />
          </div>

          <div className="field">
            <span>Recipient Name</span>
            <input
              type="text"
              placeholder="Full name as on certificate"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (status !== "idle") setStatus("idle");
              }}
              required
            />
          </div>

          <div className="form-actions">
            <button className="ghost-btn professional" type="button" onClick={onBack}>
              Cancel
            </button>
            <button 
              className="primary-btn professional" 
              type="submit" 
              disabled={status === "verifying"}
            >
              {status === "verifying" ? "Verifying..." : "Verify Certificate"}
            </button>
          </div>

          {status === "error" && (
            <div className="verification-warning">
              <span className="warning-icon">⚠️</span>
              <p>Warning: Database not connected. Unable to verify certificate ID: <b>{formData.certId}</b> at this time.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
