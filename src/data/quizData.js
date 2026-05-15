export const roleCards = {
  general: {
    label: "General Users",
    description:
      "For employees, students, and everyday digital users who handle personal information online.",
    points: [
      "Protect personal data",
      "Recognize online privacy risks",
      "Use safer apps and accounts",
      "Understand digital consent",
    ],
  },
  it: {
    label: "IT Users",
    description:
      "For technology, security, compliance, and operations teams responsible for systems and controls.",
    points: [
      "Assess system safeguards",
      "Validate DPDPA readiness",
      "Find privacy control gaps",
      "Strengthen incident response",
    ],
  },
};

export const quizSets = {
  it: [
    {
      title: "Data Collection & Consent Management",
      shortTitle: "Consent",
      questions: [
        {
          id: "it-consent-minimum",
          text: "Does your application collect only the minimum required personal data?",
          warning: "Excessive data collection increases DPDPA exposure and breach impact.",
          action: "Review each field and remove data that is not required for the stated purpose.",
        },
        {
          id: "it-consent-sensitive",
          text: "Do users provide explicit consent before sensitive data collection?",
          warning: "Sensitive data collected without clear consent can create compliance risk.",
          action: "Add explicit, purpose-specific consent before collecting sensitive information.",
        },
        {
          id: "it-consent-withdrawal",
          text: "Is consent withdrawal functionality available in your system?",
          warning: "Users need a practical path to withdraw consent when processing is consent-based.",
          action: "Provide a visible withdrawal option and connect it to downstream processing controls.",
        },
        {
          id: "it-consent-logs",
          text: "Are consent logs stored and auditable?",
          warning: "Without audit logs, consent history cannot be reliably proven.",
          action: "Store timestamped consent records with version, purpose, and user identifier metadata.",
        },
        {
          id: "it-consent-purpose",
          text: "Does your system notify users about the purpose of data collection?",
          warning: "Unclear purpose notices reduce transparency and weaken user trust.",
          action: "Show concise notices that explain what is collected, why, and how long it is used.",
        },
      ],
    },
    {
      title: "Security & Technical Safeguards",
      shortTitle: "Security",
      questions: [
        {
          id: "it-security-encryption",
          text: "Is personal data encrypted during storage and transmission?",
          warning: "Unencrypted personal data is highly exposed during compromise or interception.",
          action: "Use TLS in transit and strong encryption for stored sensitive data.",
        },
        {
          id: "it-security-rbac",
          text: "Are role-based access controls implemented in your systems?",
          warning: "Broad access permissions increase unauthorized data access risk.",
          action: "Define least-privilege roles and review access assignments regularly.",
        },
        {
          id: "it-security-mfa",
          text: "Is multi-factor authentication enabled for privileged accounts?",
          warning: "Privileged accounts without MFA are high-value attack targets.",
          action: "Require MFA for administrators, production access, and sensitive data workflows.",
        },
        {
          id: "it-security-logs",
          text: "Are security logs continuously monitored?",
          warning: "Unmonitored logs delay detection of suspicious activity.",
          action: "Centralize logs and configure alerts for access, export, and privilege anomalies.",
        },
        {
          id: "it-security-assessment",
          text: "Are vulnerability assessments conducted periodically?",
          warning: "Untested systems can retain exploitable weaknesses.",
          action: "Run scheduled vulnerability scans and track remediation to closure.",
        },
      ],
    },
    {
      title: "Compliance & Governance",
      shortTitle: "Governance",
      questions: [
        {
          id: "it-gov-records",
          text: "Does your organization maintain data processing records?",
          warning: "Missing processing records make it difficult to prove accountability.",
          action: "Maintain a register covering data categories, purposes, owners, vendors, and retention.",
        },
        {
          id: "it-gov-dpo",
          text: "Is a Data Protection Officer assigned where required?",
          warning: "Unclear ownership can slow decisions during privacy events.",
          action: "Assign privacy accountability and publish escalation contacts internally.",
        },
        {
          id: "it-gov-vendors",
          text: "Are third-party vendors evaluated for privacy compliance?",
          warning: "Vendor gaps can create downstream personal data risk.",
          action: "Assess vendors for security, processing purpose, breach duties, and data sharing terms.",
        },
        {
          id: "it-gov-retention",
          text: "Are data retention policies formally documented?",
          warning: "Undefined retention leads to unnecessary data accumulation.",
          action: "Document retention rules and automate deletion or archival where possible.",
        },
        {
          id: "it-gov-breach",
          text: "Does your organization maintain a breach response framework?",
          warning: "A missing breach framework can delay containment and notification decisions.",
          action: "Define breach roles, severity levels, evidence handling, and notification workflows.",
        },
      ],
    },
    {
      title: "AI & Emerging Technology Compliance",
      shortTitle: "AI Risk",
      questions: [
        {
          id: "it-ai-minimize",
          text: "Does your AI system minimize unnecessary personal data usage?",
          warning: "AI systems can amplify privacy risk when trained or prompted with unnecessary data.",
          action: "Use data minimization, redaction, and privacy reviews before AI deployment.",
        },
        {
          id: "it-ai-profiling",
          text: "Is user consent obtained before AI-based profiling activities?",
          warning: "Profiling without clear consent can affect user rights and transparency.",
          action: "Collect explicit consent and explain profiling purpose, scope, and consequences.",
        },
        {
          id: "it-ai-bias",
          text: "Are AI outputs monitored for bias or unfair decisions?",
          warning: "Unmonitored AI outputs can cause unfair or inaccurate outcomes.",
          action: "Set review metrics, human oversight, and escalation paths for high-impact outputs.",
        },
        {
          id: "it-ai-disclosure",
          text: "Is automated decision-making disclosed to users?",
          warning: "Users may not understand when automated processing affects them.",
          action: "Disclose automated decisions and provide support for review or appeal where appropriate.",
        },
        {
          id: "it-ai-risk",
          text: "Does your organization perform AI risk assessments?",
          warning: "AI risks can remain hidden without structured assessment.",
          action: "Assess privacy, security, fairness, explainability, and data leakage risks before launch.",
        },
      ],
    },
    {
      title: "Incident Response & Risk Management",
      shortTitle: "Incidents",
      questions: [
        {
          id: "it-ir-plan",
          text: "Does your organization have a documented breach response plan?",
          warning: "Teams may lose critical time if breach steps are not documented.",
          action: "Create a breach playbook covering containment, investigation, evidence, and decisions.",
        },
        {
          id: "it-ir-escalation",
          text: "Are breach escalation procedures clearly defined?",
          warning: "Unclear escalation can delay leadership and legal involvement.",
          action: "Define severity thresholds, ownership, and response-time expectations.",
        },
        {
          id: "it-ir-users",
          text: "Are affected users notified during significant data breaches?",
          warning: "User notification gaps can increase harm and regulatory risk.",
          action: "Prepare notification templates and decision criteria for significant breaches.",
        },
        {
          id: "it-ir-drills",
          text: "Are incident response drills conducted periodically?",
          warning: "Untested plans often fail during real incidents.",
          action: "Run tabletop exercises and technical drills at least periodically.",
        },
        {
          id: "it-ir-risk",
          text: "Are risk assessments performed before launching new features?",
          warning: "New features can introduce privacy risks late in delivery.",
          action: "Add privacy and security risk checks to product launch gates.",
        },
      ],
    },
  ],
  general: [
    {
      title: "Digital Privacy Awareness",
      shortTitle: "Privacy",
      questions: [
        {
          id: "gen-awareness-permissions",
          text: "Do you read permission requests before installing apps?",
          warning: "App permissions can expose contacts, location, camera, or files unnecessarily.",
          action: "Review permissions before installing and deny anything that does not match the app purpose.",
        },
        {
          id: "gen-awareness-purpose",
          text: "Do you understand why websites collect your personal data?",
          warning: "Sharing data without understanding the purpose can reduce control over your information.",
          action: "Pause before submitting personal data and check why it is being requested.",
        },
        {
          id: "gen-awareness-consent",
          text: "Do you know that companies require consent to use your data?",
          warning: "Without consent awareness, you may miss choices about how your data is used.",
          action: "Look for consent notices and choose only the uses you are comfortable with.",
        },
        {
          id: "gen-awareness-unnecessary",
          text: "Do you avoid sharing unnecessary personal information online?",
          warning: "Oversharing increases the chance of misuse, profiling, or fraud.",
          action: "Share only what is required and avoid posting sensitive identifiers publicly.",
        },
        {
          id: "gen-awareness-deletion",
          text: "Do you know you can request deletion of your personal data?",
          warning: "You may leave old personal data with services you no longer use.",
          action: "Use account privacy tools or support channels to request deletion when needed.",
        },
      ],
    },
    {
      title: "Online Safety & Personal Data Protection",
      shortTitle: "Safety",
      questions: [
        {
          id: "gen-safety-passwords",
          text: "Do you use strong passwords for important accounts?",
          warning: "Weak passwords make account takeover easier.",
          action: "Use long, unique passwords and store them in a trusted password manager.",
        },
        {
          id: "gen-safety-2fa",
          text: "Do you enable two-factor authentication where available?",
          warning: "Accounts without two-factor protection are more vulnerable if a password leaks.",
          action: "Enable two-factor authentication for email, banking, work, and social accounts.",
        },
        {
          id: "gen-safety-otp",
          text: "Do you avoid sharing OTPs or banking credentials?",
          warning: "Shared OTPs or banking details can lead to immediate financial fraud.",
          action: "Never share OTPs, PINs, passwords, or card details with anyone over calls or messages.",
        },
        {
          id: "gen-safety-links",
          text: "Do you avoid clicking suspicious links or attachments?",
          warning: "Suspicious links often lead to phishing, malware, or credential theft.",
          action: "Verify the sender and URL before opening links or attachments.",
        },
        {
          id: "gen-safety-wifi",
          text: "Do you avoid using public Wi-Fi for financial transactions?",
          warning: "Public networks can expose sensitive activity when connections are unsafe.",
          action: "Use mobile data or a trusted secure network for banking and payments.",
        },
      ],
    },
    {
      title: "Social Media & App Usage Behavior",
      shortTitle: "Apps",
      questions: [
        {
          id: "gen-apps-permissions",
          text: "Do you review app permissions before granting access?",
          warning: "Apps may collect more data than needed if permissions are approved quickly.",
          action: "Grant permissions only when they are necessary for the app feature.",
        },
        {
          id: "gen-apps-location",
          text: "Do you limit location sharing on social media platforms?",
          warning: "Location sharing can reveal routines, home area, or workplace patterns.",
          action: "Turn off precise location sharing unless it is necessary.",
        },
        {
          id: "gen-apps-camera",
          text: "Do you disable unnecessary microphone or camera permissions?",
          warning: "Unneeded microphone and camera access can create privacy exposure.",
          action: "Review device privacy settings and disable access for apps that do not need it.",
        },
        {
          id: "gen-apps-overshare",
          text: "Do you avoid oversharing personal information online?",
          warning: "Public personal details can be used for scams, impersonation, or profiling.",
          action: "Keep phone numbers, addresses, IDs, travel plans, and family details private.",
        },
        {
          id: "gen-apps-targeting",
          text: "Do you understand targeted advertising based on personal data?",
          warning: "Targeted advertising can use browsing, interests, and profile signals.",
          action: "Review ad preferences and limit personalized advertising where possible.",
        },
      ],
    },
    {
      title: "Workplace & Organizational Awareness",
      shortTitle: "Workplace",
      questions: [
        {
          id: "gen-work-info",
          text: "Do you handle customer or employee information responsibly?",
          warning: "Careless handling of workplace data can harm individuals and the organization.",
          action: "Access, share, and store workplace personal data only for authorized purposes.",
        },
        {
          id: "gen-work-files",
          text: "Do you avoid sharing confidential files through unsecured channels?",
          warning: "Unsecured sharing can leak confidential or personal information.",
          action: "Use approved company tools and access controls for sensitive files.",
        },
        {
          id: "gen-work-phishing",
          text: "Do you report suspicious emails or phishing attempts?",
          warning: "Unreported phishing attempts can spread to other employees.",
          action: "Report suspicious messages through your organization's security process.",
        },
        {
          id: "gen-work-guidelines",
          text: "Do you follow company privacy or security guidelines?",
          warning: "Policy gaps in daily work can create avoidable privacy incidents.",
          action: "Follow approved procedures for data handling, sharing, retention, and reporting.",
        },
        {
          id: "gen-work-identity",
          text: "Do you verify identities before sharing sensitive information?",
          warning: "Attackers often impersonate trusted people to obtain sensitive information.",
          action: "Confirm requests through official channels before sharing sensitive data.",
        },
      ],
    },
    {
      title: "Rights, Compliance & Awareness",
      shortTitle: "Rights",
      questions: [
        {
          id: "gen-rights-penalties",
          text: "Do you know that organizations can face penalties for data misuse?",
          warning: "Low awareness of penalties can reduce the seriousness of privacy handling.",
          action: "Treat personal data misuse as a serious compliance and trust issue.",
        },
        {
          id: "gen-rights-personal",
          text: "Do you know that you have rights over your personal data?",
          warning: "You may not use available choices to correct, delete, or control your data.",
          action: "Learn the rights offered by services and use them when your data is inaccurate or unnecessary.",
        },
        {
          id: "gen-rights-consent",
          text: "Do you understand the importance of digital consent?",
          warning: "Consent choices affect how organizations collect and use personal data.",
          action: "Read consent prompts and select only the purposes you accept.",
        },
        {
          id: "gen-rights-breach",
          text: "Do you understand how data breaches can affect individuals?",
          warning: "Breaches can lead to fraud, identity misuse, harassment, or financial loss.",
          action: "Act quickly after breach alerts by changing passwords and monitoring accounts.",
        },
        {
          id: "gen-rights-ai",
          text: "Do you think AI systems should be monitored for privacy risks?",
          warning: "AI systems can expose personal data or make privacy-impacting decisions.",
          action: "Support privacy reviews, transparency, and monitoring for AI systems.",
        },
      ],
    },
  ],
};
