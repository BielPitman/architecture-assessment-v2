/**
 * Core questions Q1-Q5 (all respondents).
 * Q5 routes to the appropriate firm type module (A-H).
 */
export const CORE_QUESTIONS = [
  {
    id: "firm_name",
    label: "Q1",
    question: "What is your firm's name?",
    type: "text",
    required: true,
    placeholder: "e.g. Studio Horizon Architecture",
  },
  {
    id: "contact_name",
    label: "Q2",
    question: "What is your name and title?",
    type: "text",
    required: true,
    placeholder: "e.g. Sarah Chen, Principal / e.g. Marcus Rivera, Studio Director",
  },
  {
    id: "contact_email",
    label: "Q3",
    question: "What is the best email for your readiness report?",
    type: "email",
    required: true,
    placeholder: "you@yourfirm.com",
  },
  {
    id: "firm_size",
    label: "Q4",
    question: "How many people are in your firm?",
    subtitle: "Include all roles: principals, designers, technical staff, admin, marketing.",
    type: "single-select",
    required: true,
    options: [
      "Solo (just me)",
      "Micro (2-3 people)",
      "Small (4-12 people)",
      "Mid-size (13-30 people)",
      "Large (31-100 people)",
      "Enterprise (101+ people)",
    ],
  },
  {
    id: "firm_type",
    label: "Q5",
    question: "Which best describes your practice?",
    subtitle: "Pick the closest match. This determines which questions come next.",
    type: "single-select",
    required: true,
    autoAdvance: true,
    options: [
      { label: "I run a one-person or very small practice (1-3 people doing everything)", route: "A" },
      { label: "We are a design-focused studio where the portfolio and design reputation drive the practice", route: "B" },
      { label: "We are an established firm with multiple project teams and a mix of project types", route: "C" },
      { label: "We are a large firm with departments, formal QA processes, and complex projects", route: "D" },
      { label: "We do design-build: our firm handles both design and construction", route: "E" },
      { label: "We are specialists (sustainability, preservation, code consulting, forensics, or similar)", route: "F" },
      { label: "We primarily serve developers on repeat, volume-driven project work", route: "G" },
      { label: "We are a multi-discipline firm (architecture + engineering, planning, or other disciplines under one roof)", route: "H" },
    ],
  },
];
