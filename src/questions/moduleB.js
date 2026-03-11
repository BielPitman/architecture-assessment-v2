/**
 * Module B: Boutique Design Studio
 * For design-led firms (4-12 people) where the principal's aesthetic vision defines the practice.
 */
export const MODULE_KEY = "B";
export const MODULE_NAME = "Boutique Design Studio";

export const QUESTIONS = [
  {
    id: "practice_profile_boutique",
    label: "QB1",
    category: "BOUTIQUE DESIGN STUDIO",
    question: "What best describes your studio's market position?",
    type: "single-select",
    required: true,
    options: [
      "High-end custom residential: every project is unique",
      "Commercial and institutional work selected for design opportunity",
      "Mixed: residential and commercial projects chosen for design quality",
      "Primarily interiors and adaptive reuse / renovation projects",
      "We pursue design competitions and public projects as a core part of the practice",
    ],
  },
  {
    id: "design_to_cd_boutique",
    label: "QB2",
    category: "BOUTIQUE DESIGN STUDIO",
    question: "How does your studio handle the transition from design (SD/DD) to construction documents?",
    subtitle: "This handoff is often where design studios struggle most with profitability.",
    type: "single-select",
    required: true,
    options: [
      "The principal stays deeply involved through CDs to protect design intent",
      "We have dedicated production staff, but the design-to-CD transition is still a pain point",
      "We outsource portions of CD production to contract staff or another firm",
      "We have a relatively smooth process with clear handoffs between design and production roles",
    ],
  },
  {
    id: "design_iteration_boutique",
    label: "QB3",
    category: "BOUTIQUE DESIGN STUDIO",
    question: "How do you manage design iteration so that the pursuit of design quality does not erode project profitability?",
    type: "single-select",
    required: true,
    options: [
      "We tend to over-invest in design phases because that is what we care about most",
      "We set phase budgets but frequently exceed them on design",
      "We have a defined number of design options and revision rounds in our contracts",
      "We track design hours against phase budgets in real time and adjust as needed",
    ],
  },
  {
    id: "consultant_coord_boutique",
    label: "QB4",
    category: "BOUTIQUE DESIGN STUDIO",
    question: "On projects with complex custom details, how does your studio coordinate with structural and MEP engineers?",
    type: "single-select",
    required: true,
    options: [
      "We rely on regular meetings and email exchange to stay coordinated",
      "We work in shared BIM models with formal coordination reviews",
      "Coordination is mostly informal and problems sometimes surface during construction",
      "We have trusted consultants we work with repeatedly, which reduces coordination overhead",
    ],
  },
  {
    id: "proposal_prep_boutique",
    label: "QB5",
    category: "BOUTIQUE DESIGN STUDIO",
    question: "When you pursue a new project through a competition or RFP, how much time does submission preparation typically take?",
    type: "single-select",
    required: true,
    options: [
      "Significant: we invest heavily in custom renderings, narratives, and presentation materials",
      "Moderate: we adapt existing portfolio materials and write targeted narratives",
      "Minimal: we have a streamlined process with reusable templates and graphics",
      "We rarely compete through RFPs and get most work through direct client relationships",
    ],
  },
  {
    id: "client_source_boutique",
    label: "QB6",
    category: "BOUTIQUE DESIGN STUDIO",
    question: "How does your studio typically land new projects?",
    type: "single-select",
    required: true,
    options: [
      "Our portfolio and design reputation bring clients to us directly",
      "Design awards, publications, and press coverage generate most of our leads",
      "Referrals from past clients and professional contacts",
      "We actively pursue competitions and selective RFPs",
      "A combination of reputation, referrals, and targeted outreach",
    ],
  },
  {
    id: "digital_presence_boutique",
    label: "QB7",
    category: "BOUTIQUE DESIGN STUDIO",
    question: "How does your studio present its work to the world?",
    subtitle: "For design-focused firms, the portfolio is the primary business development tool.",
    type: "single-select",
    required: true,
    options: [
      "We have a curated, up-to-date portfolio website with professional photography and project narratives",
      "Our website exists but is not current; we rely more on Instagram or social media",
      "We submit for awards and publications regularly and use those features for visibility",
      "We have not invested significantly in our online portfolio or digital presence",
    ],
  },
  {
    id: "bottleneck_boutique",
    label: "QB8",
    category: "BOUTIQUE DESIGN STUDIO",
    question: "What is the single biggest constraint on your studio right now?",
    type: "single-select",
    required: true,
    options: [
      "Translating our designs into construction documents efficiently without compromising design quality",
      "Finding and retaining production staff who understand and can execute our design standards",
      "Winning enough of the right projects (ones that let us do our best design work)",
      "Managing profitability: we invest heavily in design quality and it cuts into margins",
      "Keeping the portfolio, website, and social media current while running active projects",
    ],
  },
];
