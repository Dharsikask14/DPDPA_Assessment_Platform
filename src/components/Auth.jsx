import { useState } from "react";

export default function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  function handleSubmit(e) {
    e.preventDefault();
    // In a real app, you'd call an API here. 
    // For this client-side assessment, we'll simulate a successful auth.
    onAuth(formData.email);
  }

  return (
    <section className="details-view auth-page">
      <div className="details-panel professional auth-panel">
        <div className="details-header">
          <p className="eyebrow">{isLogin ? "Welcome Back" : "Get Started"}</p>
          <h2>{isLogin ? "Login to Platform" : "Create your Account"}</h2>
          <p>
            {isLogin 
              ? "Access your DPDPA assessments and certificates." 
              : "Join our readiness platform to begin your security journey."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="details-form">
          <div className="field">
            <span>Email Address</span>
            <input
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="field">
            <span>Password</span>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {!isLogin && (
            <div className="field">
              <span>Confirm Password</span>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
          )}

          <div className="auth-actions">
            <button className="primary-btn professional full-width" type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          <div className="auth-toggle">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button type="button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Create Account" : "Sign In"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
