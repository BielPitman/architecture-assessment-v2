/**
 * Module E: Design-Build Firm
 * For firms that integrate architectural design and construction delivery.
 */
export const MODULE_KEY = "E";
export const MODULE_NAME = "Design-Build Firm";

export const QUESTIONS = [
  {
    id: "practice_profile_db",
    label: "QE1",
    category: "DESIGN-BUILD FIRM",
    question: "How is your design-build practice structured?",
    type: "single-select",
    required: true,
    options: [
      "We are a single entity that handles both design and construction",
      "We are the design arm of a construction company",
      "We are an architecture firm with a closely affiliated construction partner",
      "We offer design-build on some projects and traditional delivery on others",
    ],
  },
  {
    id: "doc_speed_db",
    label: "QE2",
    category: "DESIGN-BUILD FIRM",
    question: "How does the pace of CD production keep up with construction scheduling on your design-build projects?",
    subtitle: "In design-build, construction often starts before documents are complete.",
    type: "single-select",
    required: true,
    options: [
      "CDs are a constant bottleneck: construction is often waiting on documents",
      "We issue CDs in phases (foundations, shell, interiors) to keep construction moving",
      "We have a streamlined process that keeps documents ahead of construction",
      "Documentation pace varies by project and is a frequent source of internal friction",
    ],
  },
  {
    id: "design_to_field_db",
    label: "QE3",
    category: "DESIGN-BUILD FIRM",
    question: "How do design decisions get communicated to the construction team during a project?",
    type: "single-select",
    required: true,
    options: [
      "Primarily through drawings and specifications issued at defined milestones",
      "Through a combination of drawings, RFIs, and informal daily communication",
      "We use a shared project platform where design and construction teams collaborate in real time",
      "Communication between design and construction is a known challenge for us",
    ],
  },
  {
    id: "value_engineering_db",
    label: "QE4",
    category: "DESIGN-BUILD FIRM",
    question: "How does your firm manage value engineering without losing design quality?",
    subtitle: "Design-build projects face constant cost pressure.",
    type: "single-select",
    required: true,
    options: [
      "Design and construction leads negotiate trade-offs informally on a case-by-case basis",
      "We have a formal VE process with defined criteria and client input",
      "The construction team drives VE and the design team responds",
      "Value engineering is a significant source of tension between design and construction goals",
    ],
  },
  {
    id: "submittals_rfis_db",
    label: "QE5",
    category: "DESIGN-BUILD FIRM",
    question: "In the design-build model, submittals and RFIs happen earlier and more frequently. How does your team manage the volume?",
    type: "single-select",
    required: true,
    options: [
      "We handle them as they come in, mostly through email",
      "We use a project management platform (Procore, PlanGrid, or similar) for tracking",
      "We have a streamlined process because design and construction resolve issues directly",
      "The volume is manageable because our integrated team catches most issues before they become formal RFIs",
    ],
  },
  {
    id: "client_source_db",
    label: "QE6",
    category: "DESIGN-BUILD FIRM",
    question: "How does your firm attract new design-build projects?",
    type: "single-select",
    required: true,
    options: [
      "Repeat relationships with owners and developers who prefer design-build",
      "Competitive design-build proposals where speed and cost certainty are the selling points",
      "We convert traditional delivery opportunities by proposing a design-build alternative",
      "Referrals from general contractors or construction partners",
      "A mix of repeat clients and targeted pursuit",
    ],
  },
  {
    id: "digital_presence_db",
    label: "QE7",
    category: "DESIGN-BUILD FIRM",
    question: "How does your firm communicate the design-build value proposition to potential clients?",
    type: "single-select",
    required: true,
    options: [
      "Our website clearly explains the design-build process and showcases completed projects with timelines and outcomes",
      "We have project photos and descriptions but do not specifically market the design-build advantage",
      "Our reputation and past project references speak for us; we do not invest heavily in digital marketing",
      "We have not differentiated our online presence from traditional architecture firms",
    ],
  },
  {
    id: "bottleneck_db",
    label: "QE8",
    category: "DESIGN-BUILD FIRM",
    question: "What is the single biggest constraint on your design-build practice right now?",
    type: "single-select",
    required: true,
    options: [
      "Getting construction documents produced fast enough to stay ahead of the construction schedule",
      "Maintaining design quality under constant cost and schedule pressure",
      "Coordinating effectively between the design team and the field team",
      "Managing scope and change orders in the integrated delivery model",
      "Winning new design-build projects against competitors who undercut on price",
    ],
  },
];
