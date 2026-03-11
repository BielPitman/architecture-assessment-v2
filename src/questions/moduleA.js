/**
 * Module A: Solo Practitioner / Micro Studio
 * For individuals or very small teams (1-3 people).
 */
export const MODULE_KEY = "A";
export const MODULE_NAME = "Solo Practitioner / Micro Studio";

export const QUESTIONS = [
  {
    id: "project_profile_solo",
    label: "QA1",
    category: "SOLO PRACTITIONER / MICRO STUDIO",
    question: "What kinds of projects make up most of your current workload?",
    type: "single-select",
    required: true,
    options: [
      "Custom residential (new homes, additions, renovations)",
      "Small commercial or mixed-use (retail, restaurants, offices)",
      "Multi-family residential (duplexes, townhomes, small apartment buildings)",
      "Interior renovations and tenant improvements",
      "A mix of several project types with no dominant category",
    ],
  },
  {
    id: "cd_production_solo",
    label: "QA2",
    category: "SOLO PRACTITIONER / MICRO STUDIO",
    question: "When you are producing construction documents, how does the work get done?",
    subtitle: "CDs are typically the most time-consuming phase for a small practice.",
    type: "single-select",
    required: true,
    options: [
      "I draw everything myself from scratch for each project",
      "I have a library of standard details and templates that I adapt",
      "I outsource portions of CD production to a contract drafter or freelancer",
      "I use a combination of templates, outsourcing, and my own production",
    ],
  },
  {
    id: "scope_mgmt_solo",
    label: "QA3",
    category: "SOLO PRACTITIONER / MICRO STUDIO",
    question: "How do you handle it when a client asks for changes after a phase is supposedly complete?",
    subtitle: "Scope creep is one of the biggest profitability risks for small practices.",
    type: "single-select",
    required: true,
    options: [
      "I usually accommodate changes without a formal conversation about additional fees",
      "I mention that it is extra work but rarely follow through with a change order",
      "I have a standard process: I document the change, communicate the fee impact, and get approval before proceeding",
      "I try to build enough cushion into my original fee to absorb typical changes",
    ],
  },
  {
    id: "ca_mgmt_solo",
    label: "QA4",
    category: "SOLO PRACTITIONER / MICRO STUDIO",
    question: "During construction, how do you manage RFIs, submittals, and site visits?",
    subtitle: "CA is often the least profitable phase for small firms.",
    type: "single-select",
    required: true,
    options: [
      "I handle everything myself as it comes in, usually by email",
      "I use Procore, Bluebeam, or another platform to track submittals and RFIs",
      "I rely on the contractor to manage most of the CA process, and I respond as needed",
      "Construction administration is a significant time drain that I have not figured out how to manage efficiently",
    ],
  },
  {
    id: "time_allocation_solo",
    label: "QA5",
    category: "SOLO PRACTITIONER / MICRO STUDIO",
    question: "In a typical week, roughly how much of your time goes to actual design work versus everything else (documentation, admin, proposals, client calls, bookkeeping)?",
    type: "single-select",
    required: true,
    options: [
      "Most of my time is design: I would estimate 60% or more",
      "It is roughly split: about half design, half everything else",
      "Most of my time is non-design: documentation, admin, and client management dominate",
      "I honestly have not tracked it, but it feels like design keeps getting squeezed",
    ],
  },
  {
    id: "client_source_solo",
    label: "QA6",
    category: "SOLO PRACTITIONER / MICRO STUDIO",
    question: "How do most of your new projects find you?",
    type: "single-select",
    required: true,
    options: [
      "Referrals from past clients and word of mouth (almost exclusively)",
      "Referrals from contractors, real estate agents, or other professionals",
      "My website, social media, or online portfolio generates some leads",
      "A consistent mix of referrals and digital sources",
      "I do not have a reliable pipeline and new work is unpredictable",
    ],
  },
  {
    id: "digital_presence_solo",
    label: "QA7",
    category: "SOLO PRACTITIONER / MICRO STUDIO",
    question: "How would you describe your firm's online presence?",
    subtitle: "Potential clients, contractors, and referral sources increasingly check you out online before reaching out.",
    type: "single-select",
    required: true,
    options: [
      "I have a polished portfolio website with project photos, descriptions, and contact information",
      "I have a basic website but it is not regularly updated",
      "I rely on Houzz, Google Business, or directory listings more than my own website",
      "I do not have a meaningful online presence and get all my work through personal relationships",
    ],
  },
  {
    id: "bottleneck_solo",
    label: "QA8",
    category: "SOLO PRACTITIONER / MICRO STUDIO",
    question: "What is the single biggest constraint on your practice right now?",
    type: "single-select",
    required: true,
    options: [
      "I cannot produce construction documents fast enough to take on more projects",
      "I spend too much time on non-design work (admin, proposals, bookkeeping) and not enough on design",
      "Getting a steady flow of new projects is my biggest challenge",
      "I struggle to manage active projects and new business development at the same time",
      "Keeping up with codes, continuing education, and professional requirements takes too much time",
    ],
  },
];
