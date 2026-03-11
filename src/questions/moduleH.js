/**
 * Module H: Multi-Discipline / Full-Service Firm
 * For firms that combine architecture with engineering, planning, or other disciplines.
 */
export const MODULE_KEY = "H";
export const MODULE_NAME = "Multi-Discipline / Full-Service Firm";

export const QUESTIONS = [
  {
    id: "practice_profile_multi",
    label: "QH1",
    category: "MULTI-DISCIPLINE / FULL-SERVICE FIRM",
    question: "What disciplines does your firm combine in-house?",
    type: "single-select",
    required: true,
    options: [
      "Architecture + structural engineering",
      "Architecture + full MEP (mechanical, electrical, plumbing) engineering",
      "Architecture + multiple engineering disciplines (structural, MEP, civil)",
      "Architecture + interior design + landscape architecture",
      "Architecture + engineering + planning or environmental consulting",
      "A broad multi-discipline firm covering four or more design disciplines",
    ],
  },
  {
    id: "cross_discipline_coord_multi",
    label: "QH2",
    category: "MULTI-DISCIPLINE / FULL-SERVICE FIRM",
    question: "How does your firm coordinate design work across disciplines on a typical project?",
    subtitle: "Internal coordination is the defining operational challenge for multi-discipline firms.",
    type: "single-select",
    required: true,
    options: [
      "Regular coordination meetings with discipline leads, but each team works in their own silo between meetings",
      "Shared BIM models with defined coordination protocols and regular clash detection reviews",
      "Informal coordination: disciplines communicate as needed based on personal relationships",
      "We have a formal integrated project delivery process with defined coordination milestones",
    ],
  },
  {
    id: "unified_pm_multi",
    label: "QH3",
    category: "MULTI-DISCIPLINE / FULL-SERVICE FIRM",
    question: "How does your firm manage a single project when it spans multiple disciplines with separate budgets and timelines?",
    type: "single-select",
    required: true,
    options: [
      "One project manager oversees all disciplines and manages a unified project budget",
      "Each discipline has its own project manager; coordination happens at the principal level",
      "We use project management software that tracks all disciplines on the same project dashboard",
      "Multi-discipline project management is a known pain point; we lose visibility across disciplines",
    ],
  },
  {
    id: "qc_across_disciplines_multi",
    label: "QH4",
    category: "MULTI-DISCIPLINE / FULL-SERVICE FIRM",
    question: "How does your firm ensure document quality and coordination across disciplines before issuing deliverables?",
    type: "single-select",
    required: true,
    options: [
      "Each discipline conducts their own QA/QC; cross-discipline review is a final check",
      "We have an integrated QA/QC process that reviews coordination across all disciplines",
      "QA/QC is informal and varies by project team and discipline",
      "We rely on clash detection software as the primary quality control mechanism",
    ],
  },
  {
    id: "resource_sharing_multi",
    label: "QH5",
    category: "MULTI-DISCIPLINE / FULL-SERVICE FIRM",
    question: "How does your firm allocate staff across disciplines when project workloads fluctuate?",
    type: "single-select",
    required: true,
    options: [
      "We have a centralized resource management process that moves people across disciplines as needed",
      "Discipline leads manage their own teams; cross-discipline staffing happens only in emergencies",
      "We have some flexibility but resource sharing across disciplines is limited by specialization",
      "Resource imbalance across disciplines is a frequent problem",
    ],
  },
  {
    id: "client_source_multi",
    label: "QH6",
    category: "MULTI-DISCIPLINE / FULL-SERVICE FIRM",
    question: "How does your multi-discipline capability factor into winning work?",
    type: "single-select",
    required: true,
    options: [
      "Our integrated service offering is our primary competitive advantage; clients hire us because we do it all",
      "We lead with architecture and add discipline services as needed",
      "Certain clients or project types require multi-discipline capabilities and that is where we compete",
      "We have not effectively marketed our multi-discipline capability as a differentiator",
    ],
  },
  {
    id: "digital_presence_multi",
    label: "QH7",
    category: "MULTI-DISCIPLINE / FULL-SERVICE FIRM",
    question: "How does your firm present its multi-discipline capabilities online?",
    type: "single-select",
    required: true,
    options: [
      "Our website features discipline-specific pages, integrated case studies, and team profiles across all services",
      "We have a general website that mentions all disciplines but does not showcase them individually",
      "Our online presence leads with architecture; other disciplines are secondary",
      "We have not invested in presenting our full-service capabilities online",
    ],
  },
  {
    id: "bottleneck_multi",
    label: "QH8",
    category: "MULTI-DISCIPLINE / FULL-SERVICE FIRM",
    question: "What is the most significant operational challenge in running your multi-discipline firm?",
    type: "single-select",
    required: true,
    options: [
      "Coordinating design work across disciplines without things falling through the gaps",
      "Tracking project profitability when a single project spans multiple discipline budgets",
      "Maintaining consistent quality across all disciplines",
      "Balancing workload across disciplines when demand fluctuates unevenly",
      "Delivering a unified client experience when multiple discipline leads interact with the owner",
    ],
  },
];
