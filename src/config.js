export const CONFIG = {
  VERSION: "2.0.0",
  WORKER_URL: "https://architecture-ai-scorer-v2.law-firm-ai-scorer.workers.dev",
  ROOT_ID: "ach-af-v2",
  BRAND: {
    name: "Archificials",
    tagline: "Powered by Archificials",
    website: "https://www.archificials.com",
    color: {
      primary: "#1a1a2e",
      accent: "#e27308",
      accentHover: "#c96407",
      bg: "#f8f9fa",
      card: "#ffffff",
      text: "#1a1a2e",
      textLight: "#6c757d",
      border: "#e0e0e0",
      success: "#28a745",
      progressBg: "#e9ecef",
    },
  },
  // Scoring tier thresholds
  TIERS: [
    { max: 40, label: "Significant Opportunity", color: "#e27308" },
    { max: 65, label: "Strong Opportunity", color: "#f4a261" },
    { max: 80, label: "Building Readiness", color: "#2a9d8f" },
    { max: 101, label: "Practice Leader", color: "#264653" },
  ],
  // Scoring dimension weights
  WEIGHTS: {
    operational: 0.35,
    acquisition: 0.25,
    digital: 0.20,
    practice_readiness: 0.20,
  },
};
