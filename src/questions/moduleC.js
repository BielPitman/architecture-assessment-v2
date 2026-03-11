/**
 * Module C: Mid-Size Production Practice
 * For established firms (12-30 people) with multiple project teams.
 */
export const MODULE_KEY = "C";
export const MODULE_NAME = "Mid-Size Production Practice";

export const QUESTIONS = [
  {
    id: "practice_profile_midsize",
    label: "QC1",
    category: "MID-SIZE PRODUCTION PRACTICE",
    question: "What is the primary mix of work at your firm right now?",
    type: "single-select",
    required: true,
    options: [
      "Mostly commercial and office projects",
      "Mostly institutional (education, healthcare, civic)",
      "Mostly multi-family residential and mixed-use",
      "A broad mix of project types with no single dominant sector",
      "Primarily renovation, adaptive reuse, and tenant improvements",
    ],
  },
  {
    id: "cross_team_consistency_midsize",
    label: "QC2",
    category: "MID-SIZE PRODUCTION PRACTICE",
    question: "How consistent are project delivery processes across your different project teams?",
    subtitle: "At this firm size, different teams often develop different habits.",
    type: "single-select",
    required: true,
    options: [
      "Each project team operates fairly independently with their own approach",
      "We have firm standards but enforcement varies by team",
      "We have documented standards and regular internal reviews to maintain consistency",
      "We have invested in templates, checklists, and formal QA processes that all teams follow",
    ],
  },
  {
    id: "project_profitability_midsize",
    label: "QC3",
    category: "MID-SIZE PRODUCTION PRACTICE",
    question: "How does your firm track whether individual projects are on budget during the project (not just after close-out)?",
    type: "single-select",
    required: true,
    options: [
      "We review project financials after each project closes, but not in real time",
      "Project managers check hours periodically but do not have formal budget tracking tools",
      "We have project accounting software that tracks hours against phase budgets in real time",
      "We review project profitability monthly at a firm-wide level and adjust staffing when needed",
    ],
  },
  {
    id: "proposal_production_midsize",
    label: "QC4",
    category: "MID-SIZE PRODUCTION PRACTICE",
    question: "When your firm responds to an RFP or competitive proposal, how does the process work?",
    type: "single-select",
    required: true,
    options: [
      "A marketing coordinator handles layout and graphics; principals write the narratives from scratch each time",
      "We have a library of past proposals we adapt, but it still takes significant principal time",
      "We have a streamlined process: boilerplate sections, a project database, and templates that marketing assembles",
      "We rarely pursue competitive proposals and get most work through existing relationships",
    ],
  },
  {
    id: "knowledge_mgmt_midsize",
    label: "QC5",
    category: "MID-SIZE PRODUCTION PRACTICE",
    question: "When someone on a project team needs a standard detail, a past solution, or a lesson learned from a previous project, how do they find it?",
    type: "single-select",
    required: true,
    options: [
      "They ask around or search through past project files",
      "We have a shared drive with some organized resources, but finding things is hit-or-miss",
      "We maintain a standard detail library and project database that is actively curated",
      "Knowledge sharing is mostly informal and we know we are losing institutional knowledge",
    ],
  },
  {
    id: "client_source_midsize",
    label: "QC6",
    category: "MID-SIZE PRODUCTION PRACTICE",
    question: "How does your firm get new work?",
    type: "single-select",
    required: true,
    options: [
      "Repeat clients and referrals account for most of our work",
      "Competitive RFPs and qualifications-based selection for public/institutional projects",
      "Developer and owner relationships built over years",
      "A mix of repeat clients, referrals, and competitive pursuit",
      "We are actively trying to diversify but are too dependent on a few key clients",
    ],
  },
  {
    id: "digital_presence_midsize",
    label: "QC7",
    category: "MID-SIZE PRODUCTION PRACTICE",
    question: "How does your firm present itself online?",
    type: "single-select",
    required: true,
    options: [
      "We have a professional website with current projects, team bios, and sector-specific content",
      "Our website is adequate but not a priority; most work comes through relationships",
      "We are active in industry directories and maintain profiles on platforms potential clients use",
      "Our online presence needs significant improvement",
    ],
  },
  {
    id: "bottleneck_midsize",
    label: "QC8",
    category: "MID-SIZE PRODUCTION PRACTICE",
    question: "What is the most significant operational constraint at your firm right now?",
    type: "single-select",
    required: true,
    options: [
      "We cannot see which projects are profitable until it is too late to adjust",
      "Inconsistency across teams: quality and process vary too much",
      "Proposal and business development consume too much principal time",
      "We are losing institutional knowledge as people leave or teams change",
      "Staff utilization is uneven: some teams are overloaded while others have capacity",
    ],
  },
];
