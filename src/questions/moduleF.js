/**
 * Module F: Specialty / Niche Practice
 * For firms defined by deep specialization.
 */
export const MODULE_KEY = "F";
export const MODULE_NAME = "Specialty / Niche Practice";

export const QUESTIONS = [
  {
    id: "specialty_profile_niche",
    label: "QF1",
    category: "SPECIALTY / NICHE PRACTICE",
    question: "What is your firm's primary area of specialization?",
    type: "single-select",
    required: true,
    options: [
      "Sustainable design consulting (LEED, Passive House, energy modeling, carbon tracking)",
      "Historic preservation and adaptive reuse",
      "Building code, accessibility, or zoning consulting",
      "Forensic architecture, building failure investigation, or expert witness",
      "Building envelope, waterproofing, or facade consulting",
      "Another specialty not listed above",
    ],
  },
  {
    id: "staying_current_niche",
    label: "QF2",
    category: "SPECIALTY / NICHE PRACTICE",
    question: "How does your firm keep up with changes in regulations, standards, and technical requirements in your specialty area?",
    subtitle: "In most specialty areas, the technical landscape changes faster than general practice.",
    type: "single-select",
    required: true,
    options: [
      "We rely on individual expertise and informal monitoring of industry sources",
      "We subscribe to regulatory alert services and technical publications",
      "We actively participate in standards committees, code development, or professional organizations",
      "Staying current is a significant challenge and we know we are sometimes behind",
    ],
  },
  {
    id: "report_production_niche",
    label: "QF3",
    category: "SPECIALTY / NICHE PRACTICE",
    question: "How does your firm produce its primary work product (reports, analyses, compliance documentation)?",
    type: "single-select",
    required: true,
    options: [
      "Each report is written from scratch based on the specific project and analysis",
      "We have templates and standard formats that we adapt for each project",
      "We use specialized software that generates portions of our deliverables from analysis data",
      "Report production is our biggest time sink and we know there is a more efficient way",
    ],
  },
  {
    id: "aor_coordination_niche",
    label: "QF4",
    category: "SPECIALTY / NICHE PRACTICE",
    question: "How does your firm typically coordinate with the project's architect of record (AOR)?",
    type: "single-select",
    required: true,
    options: [
      "We provide our analysis and recommendations; the AOR integrates them into their documents",
      "We work closely with the AOR through regular meetings and shared models",
      "Integration of our recommendations into the design is often a friction point",
      "We provide standalone deliverables and have limited interaction with the broader design team",
    ],
  },
  {
    id: "tool_database_niche",
    label: "QF5",
    category: "SPECIALTY / NICHE PRACTICE",
    question: "Does your firm maintain proprietary databases, checklists, analysis tools, or reference libraries specific to your specialty?",
    type: "single-select",
    required: true,
    options: [
      "Yes: we have custom tools and databases that are central to our workflow",
      "We have some internal resources but they are not systematically maintained",
      "We rely primarily on commercially available tools and publicly available references",
      "We need to build better internal resources but have not had the time",
    ],
  },
  {
    id: "client_source_niche",
    label: "QF6",
    category: "SPECIALTY / NICHE PRACTICE",
    question: "Who are your primary clients and how do you get new work?",
    type: "single-select",
    required: true,
    options: [
      "Other architecture firms engage us as subconsultants (we serve architects, not building owners)",
      "Building owners and developers engage us directly for our specialty",
      "A mix of architect-subconsultant work and direct owner engagement",
      "Government agencies, institutions, or regulatory bodies",
      "We are trying to expand our client base beyond our traditional referral network",
    ],
  },
  {
    id: "digital_presence_niche",
    label: "QF7",
    category: "SPECIALTY / NICHE PRACTICE",
    question: "How does your firm communicate its specialized expertise to the market?",
    type: "single-select",
    required: true,
    options: [
      "We publish articles, present at conferences, and are recognized as thought leaders in our specialty",
      "We have a focused website that clearly explains our specialty and showcases project examples",
      "We rely on professional directories and organization listings specific to our field",
      "Our visibility comes primarily from word of mouth and professional referrals",
    ],
  },
  {
    id: "bottleneck_niche",
    label: "QF8",
    category: "SPECIALTY / NICHE PRACTICE",
    question: "What is the single biggest constraint on your specialty practice right now?",
    type: "single-select",
    required: true,
    options: [
      "Keeping up with the pace of regulatory and technical change in our specialty",
      "Producing reports and documentation efficiently enough to maintain margins",
      "Educating the market about what our specialty offers and why it matters",
      "Coordinating with architects of record who do not understand our specialty's requirements",
      "Scaling the practice without diluting the expertise that defines us",
    ],
  },
];
