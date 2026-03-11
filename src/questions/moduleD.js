/**
 * Module D: Large / Corporate Practice
 * For firms with 30-100+ people, formal organizational structures, and complex projects.
 */
export const MODULE_KEY = "D";
export const MODULE_NAME = "Large / Corporate Practice";

export const QUESTIONS = [
  {
    id: "practice_profile_large",
    label: "QD1",
    category: "LARGE / CORPORATE PRACTICE",
    question: "What project sectors does your firm primarily serve?",
    type: "single-select",
    required: true,
    options: [
      "Healthcare (hospitals, clinics, medical office buildings)",
      "Education (K-12, higher education, research facilities)",
      "Government and civic (courthouses, public safety, municipal buildings)",
      "Corporate and commercial (office, hospitality, retail at scale)",
      "A diversified portfolio across multiple sectors",
    ],
  },
  {
    id: "qaqc_large",
    label: "QD2",
    category: "LARGE / CORPORATE PRACTICE",
    question: "How does your firm manage QA/QC across multiple project teams before issuing construction documents?",
    subtitle: "At your firm's scale, document quality is a risk management issue as much as an efficiency issue.",
    type: "single-select",
    required: true,
    options: [
      "Senior staff conduct informal reviews before major submissions",
      "We have a formal QA/QC checklist but compliance varies across teams",
      "We have a dedicated QA/QC process with defined reviewers at each phase gate",
      "We use both manual reviews and coordination software (clash detection, model checking) as standard practice",
    ],
  },
  {
    id: "standardization_large",
    label: "QD3",
    category: "LARGE / CORPORATE PRACTICE",
    question: "How does your firm balance firm-wide standards (templates, details, processes) with the unique requirements of each project?",
    type: "single-select",
    required: true,
    options: [
      "We have a strong standards library that all teams use as a starting point",
      "We have standards but teams frequently deviate based on project needs",
      "Standards are maintained by a dedicated group and updated regularly",
      "We do not have robust firm-wide standards; each team develops their own approach",
    ],
  },
  {
    id: "consultant_coord_large",
    label: "QD4",
    category: "LARGE / CORPORATE PRACTICE",
    question: "On complex projects with many consultant disciplines, how does your firm manage design coordination?",
    subtitle: "Healthcare and institutional projects can involve 10+ consultant teams.",
    type: "single-select",
    required: true,
    options: [
      "Regular coordination meetings and email-based review",
      "BIM coordination with clash detection at defined milestones",
      "A formal coordination protocol with BIM execution plans, regular clash reviews, and defined resolution workflows",
      "Coordination is project-dependent and varies based on the project manager",
    ],
  },
  {
    id: "overhead_utilization_large",
    label: "QD5",
    category: "LARGE / CORPORATE PRACTICE",
    question: "How does your firm manage overhead costs and staff utilization across departments?",
    type: "single-select",
    required: true,
    options: [
      "We track utilization rates by department and adjust staffing proactively",
      "We monitor overhead as a percentage of revenue but do not manage it at the department level",
      "Utilization tracking is informal; we react to workload issues as they arise",
      "Overhead management is a known weakness; we struggle with the cost of supporting departments",
    ],
  },
  {
    id: "client_source_large",
    label: "QD6",
    category: "LARGE / CORPORATE PRACTICE",
    question: "How does your firm win new work?",
    type: "single-select",
    required: true,
    options: [
      "Primarily through competitive RFP/RFQ processes for institutional and public clients",
      "Master agreements and repeat relationships with healthcare systems, universities, or corporate clients",
      "A mix of competitive selection, relationship-based work, and developer projects",
      "Our reputation and sector expertise bring clients to us; we select projects strategically",
    ],
  },
  {
    id: "digital_presence_large",
    label: "QD7",
    category: "LARGE / CORPORATE PRACTICE",
    question: "How does your firm's digital presence reflect your capabilities?",
    type: "single-select",
    required: true,
    options: [
      "We have a comprehensive website with sector pages, thought leadership, and project case studies",
      "Our website showcases projects but lacks depth in content like case studies or sector expertise",
      "We are well-represented in industry directories, rankings, and awards lists",
      "Digital presence is not a strategic priority; our reputation and relationships drive work",
    ],
  },
  {
    id: "bottleneck_large",
    label: "QD8",
    category: "LARGE / CORPORATE PRACTICE",
    question: "What is the most significant operational challenge at your firm right now?",
    type: "single-select",
    required: true,
    options: [
      "Managing document quality and coordination across large, complex project teams",
      "Controlling overhead while maintaining the support infrastructure our project teams need",
      "Standardizing processes across offices, studios, or departments",
      "Finding, training, and retaining qualified staff at all levels",
      "Winning work in increasingly competitive RFP environments",
    ],
  },
];
