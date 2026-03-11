/**
 * Module G: Developer Services Firm
 * For firms that primarily serve real estate developers on high-volume, repeat project work.
 */
export const MODULE_KEY = "G";
export const MODULE_NAME = "Developer Services Firm";

export const QUESTIONS = [
  {
    id: "practice_profile_dev",
    label: "QG1",
    category: "DEVELOPER SERVICES FIRM",
    question: "What project types make up most of your developer work?",
    type: "single-select",
    required: true,
    options: [
      "Multi-family residential (apartments, condos, townhomes)",
      "Retail, hospitality, or light commercial prototypes",
      "Mixed-use developments",
      "Single-family residential at volume (production housing, planned communities)",
      "A mix of project types for different developer clients",
    ],
  },
  {
    id: "template_efficiency_dev",
    label: "QG2",
    category: "DEVELOPER SERVICES FIRM",
    question: "How does your firm use templates, prototype designs, or standard unit plans to accelerate production?",
    subtitle: "Developer services firms live or die on production efficiency.",
    type: "single-select",
    required: true,
    options: [
      "We have a well-developed library of unit plans and standard details that we adapt for each site",
      "We reuse past projects as starting points but each project still requires substantial rework",
      "We are building a template library but it is not yet comprehensive",
      "Each project is still largely produced from scratch, even when the program is similar",
    ],
  },
  {
    id: "permitting_dev",
    label: "QG3",
    category: "DEVELOPER SERVICES FIRM",
    question: "How does your firm manage the permitting process across different jurisdictions?",
    type: "single-select",
    required: true,
    options: [
      "We have deep knowledge of our primary jurisdictions and have built relationships with plan reviewers",
      "We manage permitting but each jurisdiction requires significant research into local requirements",
      "We have a database or checklist of requirements by jurisdiction that we maintain",
      "Permitting is a frequent source of delays and rework on our projects",
    ],
  },
  {
    id: "site_adaptation_dev",
    label: "QG4",
    category: "DEVELOPER SERVICES FIRM",
    question: "When you have a prototype or base design, how much time does site-specific adaptation typically take?",
    type: "single-select",
    required: true,
    options: [
      "Site adaptation is relatively quick: mostly site plan, grading, and local code adjustments",
      "Each site requires moderate adaptation: zoning, code, and local design requirements add up",
      "Site adaptation frequently turns into a significant redesign effort",
      "We have streamlined site adaptation into a predictable process with defined steps",
    ],
  },
  {
    id: "multi_project_mgmt_dev",
    label: "QG5",
    category: "DEVELOPER SERVICES FIRM",
    question: "How does your firm manage multiple active projects simultaneously?",
    type: "single-select",
    required: true,
    options: [
      "We have a project management system that tracks status, deadlines, and resource allocation across all projects",
      "Project managers track their own projects; firm-wide visibility is limited",
      "We use spreadsheets or basic tools to track project status",
      "Managing multiple projects simultaneously is a significant challenge for us",
    ],
  },
  {
    id: "client_source_dev",
    label: "QG6",
    category: "DEVELOPER SERVICES FIRM",
    question: "How do you maintain and grow your developer client relationships?",
    type: "single-select",
    required: true,
    options: [
      "Repeat business from a core group of developers accounts for most of our revenue",
      "We actively pursue new developer relationships while maintaining existing ones",
      "We rely on our reputation for speed and reliability to attract new developer clients",
      "We are too dependent on a small number of developer clients and need to diversify",
    ],
  },
  {
    id: "digital_presence_dev",
    label: "QG7",
    category: "DEVELOPER SERVICES FIRM",
    question: "How does your firm present itself to potential developer clients?",
    type: "single-select",
    required: true,
    options: [
      "We have a track record page showing completed projects, unit counts, and permit timelines",
      "Our website shows project photos but does not specifically market our developer services capabilities",
      "We rely entirely on personal relationships and referrals; our online presence is secondary",
      "We maintain a database of completed projects with metrics that we share in proposals",
    ],
  },
  {
    id: "bottleneck_dev",
    label: "QG8",
    category: "DEVELOPER SERVICES FIRM",
    question: "What is the single biggest constraint on your developer services practice?",
    type: "single-select",
    required: true,
    options: [
      "Production speed: we cannot turn projects around fast enough to meet developer timelines",
      "Permitting: navigating jurisdictions and responding to plan review comments takes too long",
      "Adapting designs to site-specific conditions and local codes consumes more time than expected",
      "Managing workload: we have too many projects with too few people",
      "Maintaining margins: developer clients constantly push fees down",
    ],
  },
];
