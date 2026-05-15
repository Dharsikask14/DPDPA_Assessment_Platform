import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
};

export default function DetailsForm({ onSubmit, onBack }) {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState(false);

  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    setTouched(true);

    if (!hasErrors) {
      onSubmit(form);
    }
  }

  return (
    <section className="details-view">
      <form className="details-panel" onSubmit={submit}>
        <div className="section-heading left">
          <p className="eyebrow">Certificate details</p>
          <h2>Submit your certificate details</h2>
        </div>

        <Field
          label="User name"
          placeholder="Enter full legal name"
          value={form.name}
          error={touched ? errors.name : ""}
          onChange={(value) => updateField("name", value)}
        />
        <Field
          label="Email ID"
          placeholder="yourname@example.com"
          value={form.email}
          error={touched ? errors.email : ""}
          onChange={(value) => updateField("email", value)}
        />
        <Field
          label="Contact number (Indian +91)"
          placeholder="10 digit mobile number"
          value={form.phone}
          error={touched ? errors.phone : ""}
          onChange={(value) => updateField("phone", value.replace(/\D/g, "").slice(0, 10))}
        />
        <Field
          label="Company / Institution"
          placeholder="Current employer or institution"
          value={form.company}
          error={touched ? errors.company : ""}
          onChange={(value) => updateField("company", value)}
        />

        <div className="form-actions">
          <button className="ghost-btn" type="button" onClick={onBack}>
            Back
          </button>
          <button className="primary-btn" type="submit">
            Continue
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({ label, placeholder, value, error, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      {error ? <small>{error}</small> : null}
    </label>
  );
}

function validate(form) {
  const errors = {};

  if (form.name.trim().length < 3) {
    errors.name = "Enter the participant name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!/^[6-9]\d{9}$/.test(form.phone)) {
    errors.phone = "Enter a valid Indian mobile number.";
  }

  if (form.company.trim().length < 2) {
    errors.company = "Enter a company, institution, or individual label.";
  }

  return errors;
}
