# DPDPA Assessment Platform

A professional, high-fidelity React application designed for Cyber Hygiene Assessments aligned with the **Digital Personal Data Protection Act (DPDPA)**. This platform empowers users and IT teams to evaluate their security posture through interactive assessments and receive professional certification upon completion.

## 🚀 Key Features

- **Dual Assessment Roles**: Tailored question sets for both **General Users** and **IT/Technical Teams**.
- **Interactive Quiz Engine**:
  - **Auto-Advance**: Seamlessly moves to the next question upon answering.
  - **Dynamic Sidebar**: Persistent navigation to jump between sections and track progress.
  - **Real-time Feedback**: Color-coded responses (Green for Yes, Red for No) and progress tracking.
- **Premium Certification**:
  - **Dynamic PDF Generation**: Professional certificates generated locally using `jsPDF`.
  - **QR Verification**: Integrated QR codes for secure certificate validation.
  - **Custom Branding**: Branded with "Hackers Infotech" and sophisticated grid patterns.
- **Modern UI/UX**:
  - **Adaptive Themes**: Full support for **Dark Mode** and **Light Mode**.
  - **Responsive Design**: Optimized for various screen sizes, ensuring accessibility across devices.
  - **Premium Aesthetics**: Smooth animations, glassmorphism-inspired panels, and a refined "Midnight Slate & Indigo" palette.
- **Certificate Verification**: A dedicated portal to validate existing certificates via ID and Name.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Vanilla CSS3 (Custom Design System)
- **PDF Generation**: `jsPDF`
- **QR Codes**: `qrcode`
- **Animations**: CSS Keyframes

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run in development mode**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📐 Project Structure

```text
src/
├── assets/         # Images and branding assets
├── components/     # React functional components
│   ├── Header.jsx      # Global navigation and theme toggle
│   ├── Hero.jsx        # Landing page with verification portal
│   ├── Quiz.jsx        # Core assessment engine
│   ├── Results.jsx     # Score summary and reporting
│   └── Verification.jsx # Certificate validation screen
├── data/           # Assessment question banks
├── utils/          # Logic for scoring and PDF generation
│   ├── certificate.js  # Sophisticated PDF layout logic
│   └── scoring.js      # Grade calculation and warning logic
└── styles.css      # Centralized premium design system
```

## 🛡️ Cyber Hygiene Best Practices

The assessments cover critical security domains including:
- **Consent & Privacy Management**
- **Endpoint Security**
- **Data Governance**
- **Incident Response**
- **AI Risk Mitigation**

---

Developed by **Hackers Infotech** | 360° Cyber defence for digital Landscape
