/* Archificials Architecture Practice AI Readiness Assessment v2 | archificials.com */
var ArchificialsAssessmentV2=(()=>{var n={VERSION:"2.0.0",WORKER_URL:"https://architecture-ai-scorer-v2.law-firm-ai-scorer.workers.dev",ROOT_ID:"ach-af-v2",BRAND:{name:"Archificials",tagline:"Powered by Archificials",website:"https://www.archificials.com",color:{primary:"#1a1a2e",accent:"#e27308",accentHover:"#c96407",bg:"#f8f9fa",card:"#ffffff",text:"#1a1a2e",textLight:"#6c757d",border:"#e0e0e0",success:"#28a745",progressBg:"#e9ecef"}},TIERS:[{max:40,label:"Significant Opportunity",color:"#e27308"},{max:65,label:"Strong Opportunity",color:"#f4a261"},{max:80,label:"Building Readiness",color:"#2a9d8f"},{max:101,label:"Practice Leader",color:"#264653"}],WEIGHTS:{operational:.35,acquisition:.25,digital:.2,practice_readiness:.2}};var x=[],i={phase:"CORE",slideIndex:0,slides:[],selectedModule:null,moduleName:"",answers:{},scores:null,error:null,slideOffset:0,totalAllSlides:0,isSubmitting:!1};function c(e){Object.assign(i,e),x.forEach(t=>t(i))}function g(e,t){i.answers[e]=t,x.forEach(s=>s(i))}function E(){return i.totalAllSlides||i.slides.length}function S(){return i.slideOffset+i.slideIndex+1}function O(){return i.slides[i.slideIndex]||null}function q(){let e=i.totalAllSlides||i.slides.length;return e===0?0:Math.round((i.slideOffset+i.slideIndex+1)/e*100)}var a=n.BRAND.color;function _(){if(document.getElementById("af-v2-styles"))return;let e=document.createElement("style");e.id="af-v2-styles",e.textContent=`
    #${n.ROOT_ID} {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      max-width: 720px;
      margin: 0 auto;
      padding: 0 20px;
      color: ${a.text};
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    #${n.ROOT_ID} * { box-sizing: border-box; }

    /* Header */
    .af-header {
      text-align: center;
      padding: 32px 0 24px;
    }
    .af-header h1 {
      font-size: 28px;
      font-weight: 700;
      color: ${a.primary};
      margin: 0 0 4px;
    }
    .af-header p {
      font-size: 15px;
      color: ${a.textLight};
      margin: 0;
    }

    /* Progress bar */
    .af-progress-wrap {
      background: ${a.progressBg};
      border-radius: 8px;
      height: 8px;
      margin-bottom: 32px;
      overflow: hidden;
    }
    .af-progress-bar {
      height: 100%;
      background: ${a.accent};
      border-radius: 8px;
      transition: width 0.4s ease;
    }
    .af-progress-text {
      text-align: right;
      font-size: 13px;
      color: ${a.textLight};
      margin-bottom: 8px;
    }

    /* Card */
    .af-card {
      background: ${a.card};
      border: 1px solid ${a.border};
      border-radius: 12px;
      padding: 32px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }

    /* Category label */
    .af-category {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: ${a.accent};
      margin-bottom: 12px;
    }

    /* Question */
    .af-question {
      font-size: 20px;
      font-weight: 600;
      color: ${a.primary};
      margin: 0 0 8px;
    }
    .af-subtitle {
      font-size: 14px;
      color: ${a.textLight};
      margin: 0 0 24px;
    }

    /* Text input */
    .af-input {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid ${a.border};
      border-radius: 8px;
      outline: none;
      transition: border-color 0.2s;
      font-family: inherit;
      color: ${a.text};
    }
    .af-input:focus {
      border-color: ${a.accent};
    }
    .af-input::placeholder {
      color: #adb5bd;
    }

    /* Textarea */
    .af-textarea {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid ${a.border};
      border-radius: 8px;
      outline: none;
      transition: border-color 0.2s;
      font-family: inherit;
      color: ${a.text};
      min-height: 120px;
      resize: vertical;
    }
    .af-textarea:focus {
      border-color: ${a.accent};
    }

    /* Option buttons (single-select) */
    .af-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .af-option {
      padding: 14px 18px;
      border: 2px solid ${a.border};
      border-radius: 10px;
      cursor: pointer;
      font-size: 15px;
      transition: all 0.2s;
      background: ${a.card};
      text-align: left;
      line-height: 1.4;
    }
    .af-option:hover {
      border-color: ${a.accent};
      background: #fff8f0;
    }
    .af-option.selected {
      border-color: ${a.accent};
      background: #fff0e0;
      font-weight: 600;
    }

    /* Scale (1-5) */
    .af-scale {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 12px;
    }
    .af-scale-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 2px solid ${a.border};
      background: ${a.card};
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .af-scale-btn:hover {
      border-color: ${a.accent};
      background: #fff8f0;
    }
    .af-scale-btn.selected {
      border-color: ${a.accent};
      background: ${a.accent};
      color: #fff;
    }
    .af-scale-labels {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: ${a.textLight};
    }

    /* Navigation */
    .af-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0 32px;
    }
    .af-btn {
      padding: 12px 28px;
      font-size: 15px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }
    .af-btn-primary {
      background: ${a.accent};
      color: #fff;
    }
    .af-btn-primary:hover {
      background: ${a.accentHover};
    }
    .af-btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .af-btn-secondary {
      background: transparent;
      color: ${a.textLight};
      border: 1px solid ${a.border};
    }
    .af-btn-secondary:hover {
      background: ${a.bg};
    }

    /* Submit button */
    .af-btn-submit {
      background: ${a.primary};
      color: #fff;
      padding: 16px 40px;
      font-size: 17px;
    }
    .af-btn-submit:hover {
      opacity: 0.9;
    }
    .af-btn-submit:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    /* Submitting state */
    .af-submitting {
      text-align: center;
      padding: 60px 0;
    }
    .af-spinner {
      width: 48px;
      height: 48px;
      border: 4px solid ${a.border};
      border-top-color: ${a.accent};
      border-radius: 50%;
      animation: af-spin 0.8s linear infinite;
      margin: 0 auto 24px;
    }
    @keyframes af-spin {
      to { transform: rotate(360deg); }
    }

    /* Results */
    .af-results {
      text-align: center;
    }

    /* Dimension scores */
    .af-dimensions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 32px;
      text-align: left;
    }
    .af-dim-card {
      background: ${a.bg};
      border-radius: 10px;
      padding: 20px;
    }
    .af-dim-img {
      width: 100%;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .af-dim-pct {
      font-size: 18px;
      font-weight: 600;
      margin-left: 1px;
    }
    .af-dim-name {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      color: ${a.textLight};
      margin-bottom: 8px;
    }
    .af-dim-score {
      font-size: 32px;
      font-weight: 800;
      color: ${a.primary};
      margin-bottom: 4px;
    }
    .af-dim-bar {
      height: 6px;
      background: ${a.progressBg};
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 12px;
    }
    .af-dim-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.6s ease;
    }
    .af-dim-insight {
      font-size: 13px;
      color: ${a.textLight};
      line-height: 1.5;
    }

    /* Summary / opportunities */
    .af-summary-section {
      text-align: left;
      margin-bottom: 24px;
    }
    .af-summary-section h3 {
      font-size: 16px;
      font-weight: 700;
      margin: 0 0 8px;
      color: ${a.primary};
    }
    .af-summary-section p, .af-summary-section li {
      font-size: 14px;
      color: ${a.textLight};
      line-height: 1.6;
    }
    .af-summary-section ol {
      padding-left: 20px;
    }
    .af-summary-section li {
      margin-bottom: 8px;
    }

    /* CTA */
    .af-cta {
      text-align: center;
      padding: 24px 0 16px;
    }
    .af-cta-line {
      font-size: 15px;
      color: ${a.text};
      margin: 0 0 20px;
      line-height: 1.5;
    }
    .af-cta p {
      font-size: 14px;
      color: ${a.textLight};
      margin: 12px 0 0;
    }

    /* Footer */
    .af-footer {
      text-align: center;
      padding: 16px 0 32px;
      font-size: 12px;
      color: #adb5bd;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .af-card { padding: 24px 20px; }
      .af-question { font-size: 18px; }
      .af-header h1 { font-size: 24px; }
      .af-dimensions { grid-template-columns: 1fr; }
      .af-score-big { font-size: 56px; }
      .af-scale-btn { width: 48px; height: 48px; font-size: 18px; }
    }
  `,document.head.appendChild(e)}var f=[{id:"firm_name",label:"Q1",question:"What is your firm's name?",type:"text",required:!0,placeholder:"e.g. Studio Horizon Architecture"},{id:"contact_name",label:"Q2",question:"What is your name and title?",type:"text",required:!0,placeholder:"e.g. Sarah Chen, Principal / e.g. Marcus Rivera, Studio Director"},{id:"contact_email",label:"Q3",question:"What is the best email for your readiness report?",type:"email",required:!0,placeholder:"you@yourfirm.com"},{id:"firm_size",label:"Q4",question:"How many people are in your firm?",subtitle:"Include all roles: principals, designers, technical staff, admin, marketing.",type:"single-select",required:!0,options:["Solo (just me)","Micro (2-3 people)","Small (4-12 people)","Mid-size (13-30 people)","Large (31-100 people)","Enterprise (101+ people)"]},{id:"firm_type",label:"Q5",question:"Which best describes your practice?",subtitle:"Pick the closest match. This determines which questions come next.",type:"single-select",required:!0,autoAdvance:!0,options:[{label:"I run a one-person or very small practice (1-3 people doing everything)",route:"A"},{label:"We are a design-focused studio where the portfolio and design reputation drive the practice",route:"B"},{label:"We are an established firm with multiple project teams and a mix of project types",route:"C"},{label:"We are a large firm with departments, formal QA processes, and complex projects",route:"D"},{label:"We do design-build: our firm handles both design and construction",route:"E"},{label:"We are specialists (sustainability, preservation, code consulting, forensics, or similar)",route:"F"},{label:"We primarily serve developers on repeat, volume-driven project work",route:"G"},{label:"We are a multi-discipline firm (architecture + engineering, planning, or other disciplines under one roof)",route:"H"}]}];var h=[{id:"after_hours",label:"CL1",category:"CLIENT RESPONSIVENESS",question:"When someone contacts your firm outside of business hours, what happens?",type:"single-select",required:!0,options:["They wait until the next business day (voicemail or contact form)","We have an answering service or auto-response that acknowledges the inquiry","Someone on the team checks messages after hours and responds if appropriate","We do not have a consistent process for after-hours contact"]},{id:"intake_speed",label:"CL2",category:"CLIENT RESPONSIVENESS",question:"From the moment someone first contacts your firm about a potential project to a signed agreement, how long does the process typically take?",type:"single-select",required:!0,options:["Same day or next day","2-5 business days","About a week","More than a week","We do not have a consistent intake process"]},{id:"urgency",label:"CL3",category:"INVESTMENT APPETITE",question:"How urgently does your firm need to address the gaps you have identified through this assessment?",type:"scale",required:!0,min:1,max:5,minLabel:"Exploring options",maxLabel:"This needs to move now"},{id:"investment",label:"CL4",category:"INVESTMENT APPETITE",question:"What investment level feels proportionate for acting on this?",type:"single-select",required:!0,options:["Under $5K: start with a targeted pilot","$5K-$25K: a meaningful engagement","$25K-$75K: we are serious about this","$75K+: committed to real transformation","Depends on what you show us"]},{id:"success_vision",label:"OPT1",category:"OPEN RESPONSE",question:"What would success look like for your firm 12 months from now?",subtitle:"Optional \u2014 but the more specific you are, the more targeted your report will be.",type:"textarea",required:!1},{id:"anything_else",label:"OPT2",category:"OPEN RESPONSE",question:"Anything else you would like us to know before we prepare your report?",subtitle:"A specific challenge, project type concern, or context that would be useful to know.",type:"textarea",required:!1}];var R="A",C="Solo Practitioner / Micro Studio",A=[{id:"project_profile_solo",label:"QA1",category:"SOLO PRACTITIONER / MICRO STUDIO",question:"What kinds of projects make up most of your current workload?",type:"single-select",required:!0,options:["Custom residential (new homes, additions, renovations)","Small commercial or mixed-use (retail, restaurants, offices)","Multi-family residential (duplexes, townhomes, small apartment buildings)","Interior renovations and tenant improvements","A mix of several project types with no dominant category"]},{id:"cd_production_solo",label:"QA2",category:"SOLO PRACTITIONER / MICRO STUDIO",question:"When you are producing construction documents, how does the work get done?",subtitle:"CDs are typically the most time-consuming phase for a small practice.",type:"single-select",required:!0,options:["I draw everything myself from scratch for each project","I have a library of standard details and templates that I adapt","I outsource portions of CD production to a contract drafter or freelancer","I use a combination of templates, outsourcing, and my own production"]},{id:"scope_mgmt_solo",label:"QA3",category:"SOLO PRACTITIONER / MICRO STUDIO",question:"How do you handle it when a client asks for changes after a phase is supposedly complete?",subtitle:"Scope creep is one of the biggest profitability risks for small practices.",type:"single-select",required:!0,options:["I usually accommodate changes without a formal conversation about additional fees","I mention that it is extra work but rarely follow through with a change order","I have a standard process: I document the change, communicate the fee impact, and get approval before proceeding","I try to build enough cushion into my original fee to absorb typical changes"]},{id:"ca_mgmt_solo",label:"QA4",category:"SOLO PRACTITIONER / MICRO STUDIO",question:"During construction, how do you manage RFIs, submittals, and site visits?",subtitle:"CA is often the least profitable phase for small firms.",type:"single-select",required:!0,options:["I handle everything myself as it comes in, usually by email","I use Procore, Bluebeam, or another platform to track submittals and RFIs","I rely on the contractor to manage most of the CA process, and I respond as needed","Construction administration is a significant time drain that I have not figured out how to manage efficiently"]},{id:"time_allocation_solo",label:"QA5",category:"SOLO PRACTITIONER / MICRO STUDIO",question:"In a typical week, roughly how much of your time goes to actual design work versus everything else (documentation, admin, proposals, client calls, bookkeeping)?",type:"single-select",required:!0,options:["Most of my time is design: I would estimate 60% or more","It is roughly split: about half design, half everything else","Most of my time is non-design: documentation, admin, and client management dominate","I honestly have not tracked it, but it feels like design keeps getting squeezed"]},{id:"client_source_solo",label:"QA6",category:"SOLO PRACTITIONER / MICRO STUDIO",question:"How do most of your new projects find you?",type:"single-select",required:!0,options:["Referrals from past clients and word of mouth (almost exclusively)","Referrals from contractors, real estate agents, or other professionals","My website, social media, or online portfolio generates some leads","A consistent mix of referrals and digital sources","I do not have a reliable pipeline and new work is unpredictable"]},{id:"digital_presence_solo",label:"QA7",category:"SOLO PRACTITIONER / MICRO STUDIO",question:"How would you describe your firm's online presence?",subtitle:"Potential clients, contractors, and referral sources increasingly check you out online before reaching out.",type:"single-select",required:!0,options:["I have a polished portfolio website with project photos, descriptions, and contact information","I have a basic website but it is not regularly updated","I rely on Houzz, Google Business, or directory listings more than my own website","I do not have a meaningful online presence and get all my work through personal relationships"]},{id:"bottleneck_solo",label:"QA8",category:"SOLO PRACTITIONER / MICRO STUDIO",question:"What is the single biggest constraint on your practice right now?",type:"single-select",required:!0,options:["I cannot produce construction documents fast enough to take on more projects","I spend too much time on non-design work (admin, proposals, bookkeeping) and not enough on design","Getting a steady flow of new projects is my biggest challenge","I struggle to manage active projects and new business development at the same time","Keeping up with codes, continuing education, and professional requirements takes too much time"]}];var D="B",k="Boutique Design Studio",M=[{id:"practice_profile_boutique",label:"QB1",category:"BOUTIQUE DESIGN STUDIO",question:"What best describes your studio's market position?",type:"single-select",required:!0,options:["High-end custom residential: every project is unique","Commercial and institutional work selected for design opportunity","Mixed: residential and commercial projects chosen for design quality","Primarily interiors and adaptive reuse / renovation projects","We pursue design competitions and public projects as a core part of the practice"]},{id:"design_to_cd_boutique",label:"QB2",category:"BOUTIQUE DESIGN STUDIO",question:"How does your studio handle the transition from design (SD/DD) to construction documents?",subtitle:"This handoff is often where design studios struggle most with profitability.",type:"single-select",required:!0,options:["The principal stays deeply involved through CDs to protect design intent","We have dedicated production staff, but the design-to-CD transition is still a pain point","We outsource portions of CD production to contract staff or another firm","We have a relatively smooth process with clear handoffs between design and production roles"]},{id:"design_iteration_boutique",label:"QB3",category:"BOUTIQUE DESIGN STUDIO",question:"How do you manage design iteration so that the pursuit of design quality does not erode project profitability?",type:"single-select",required:!0,options:["We tend to over-invest in design phases because that is what we care about most","We set phase budgets but frequently exceed them on design","We have a defined number of design options and revision rounds in our contracts","We track design hours against phase budgets in real time and adjust as needed"]},{id:"consultant_coord_boutique",label:"QB4",category:"BOUTIQUE DESIGN STUDIO",question:"On projects with complex custom details, how does your studio coordinate with structural and MEP engineers?",type:"single-select",required:!0,options:["We rely on regular meetings and email exchange to stay coordinated","We work in shared BIM models with formal coordination reviews","Coordination is mostly informal and problems sometimes surface during construction","We have trusted consultants we work with repeatedly, which reduces coordination overhead"]},{id:"proposal_prep_boutique",label:"QB5",category:"BOUTIQUE DESIGN STUDIO",question:"When you pursue a new project through a competition or RFP, how much time does submission preparation typically take?",type:"single-select",required:!0,options:["Significant: we invest heavily in custom renderings, narratives, and presentation materials","Moderate: we adapt existing portfolio materials and write targeted narratives","Minimal: we have a streamlined process with reusable templates and graphics","We rarely compete through RFPs and get most work through direct client relationships"]},{id:"client_source_boutique",label:"QB6",category:"BOUTIQUE DESIGN STUDIO",question:"How does your studio typically land new projects?",type:"single-select",required:!0,options:["Our portfolio and design reputation bring clients to us directly","Design awards, publications, and press coverage generate most of our leads","Referrals from past clients and professional contacts","We actively pursue competitions and selective RFPs","A combination of reputation, referrals, and targeted outreach"]},{id:"digital_presence_boutique",label:"QB7",category:"BOUTIQUE DESIGN STUDIO",question:"How does your studio present its work to the world?",subtitle:"For design-focused firms, the portfolio is the primary business development tool.",type:"single-select",required:!0,options:["We have a curated, up-to-date portfolio website with professional photography and project narratives","Our website exists but is not current; we rely more on Instagram or social media","We submit for awards and publications regularly and use those features for visibility","We have not invested significantly in our online portfolio or digital presence"]},{id:"bottleneck_boutique",label:"QB8",category:"BOUTIQUE DESIGN STUDIO",question:"What is the single biggest constraint on your studio right now?",type:"single-select",required:!0,options:["Translating our designs into construction documents efficiently without compromising design quality","Finding and retaining production staff who understand and can execute our design standards","Winning enough of the right projects (ones that let us do our best design work)","Managing profitability: we invest heavily in design quality and it cuts into margins","Keeping the portfolio, website, and social media current while running active projects"]}];var T="C",L="Mid-Size Production Practice",N=[{id:"practice_profile_midsize",label:"QC1",category:"MID-SIZE PRODUCTION PRACTICE",question:"What is the primary mix of work at your firm right now?",type:"single-select",required:!0,options:["Mostly commercial and office projects","Mostly institutional (education, healthcare, civic)","Mostly multi-family residential and mixed-use","A broad mix of project types with no single dominant sector","Primarily renovation, adaptive reuse, and tenant improvements"]},{id:"cross_team_consistency_midsize",label:"QC2",category:"MID-SIZE PRODUCTION PRACTICE",question:"How consistent are project delivery processes across your different project teams?",subtitle:"At this firm size, different teams often develop different habits.",type:"single-select",required:!0,options:["Each project team operates fairly independently with their own approach","We have firm standards but enforcement varies by team","We have documented standards and regular internal reviews to maintain consistency","We have invested in templates, checklists, and formal QA processes that all teams follow"]},{id:"project_profitability_midsize",label:"QC3",category:"MID-SIZE PRODUCTION PRACTICE",question:"How does your firm track whether individual projects are on budget during the project (not just after close-out)?",type:"single-select",required:!0,options:["We review project financials after each project closes, but not in real time","Project managers check hours periodically but do not have formal budget tracking tools","We have project accounting software that tracks hours against phase budgets in real time","We review project profitability monthly at a firm-wide level and adjust staffing when needed"]},{id:"proposal_production_midsize",label:"QC4",category:"MID-SIZE PRODUCTION PRACTICE",question:"When your firm responds to an RFP or competitive proposal, how does the process work?",type:"single-select",required:!0,options:["A marketing coordinator handles layout and graphics; principals write the narratives from scratch each time","We have a library of past proposals we adapt, but it still takes significant principal time","We have a streamlined process: boilerplate sections, a project database, and templates that marketing assembles","We rarely pursue competitive proposals and get most work through existing relationships"]},{id:"knowledge_mgmt_midsize",label:"QC5",category:"MID-SIZE PRODUCTION PRACTICE",question:"When someone on a project team needs a standard detail, a past solution, or a lesson learned from a previous project, how do they find it?",type:"single-select",required:!0,options:["They ask around or search through past project files","We have a shared drive with some organized resources, but finding things is hit-or-miss","We maintain a standard detail library and project database that is actively curated","Knowledge sharing is mostly informal and we know we are losing institutional knowledge"]},{id:"client_source_midsize",label:"QC6",category:"MID-SIZE PRODUCTION PRACTICE",question:"How does your firm get new work?",type:"single-select",required:!0,options:["Repeat clients and referrals account for most of our work","Competitive RFPs and qualifications-based selection for public/institutional projects","Developer and owner relationships built over years","A mix of repeat clients, referrals, and competitive pursuit","We are actively trying to diversify but are too dependent on a few key clients"]},{id:"digital_presence_midsize",label:"QC7",category:"MID-SIZE PRODUCTION PRACTICE",question:"How does your firm present itself online?",type:"single-select",required:!0,options:["We have a professional website with current projects, team bios, and sector-specific content","Our website is adequate but not a priority; most work comes through relationships","We are active in industry directories and maintain profiles on platforms potential clients use","Our online presence needs significant improvement"]},{id:"bottleneck_midsize",label:"QC8",category:"MID-SIZE PRODUCTION PRACTICE",question:"What is the most significant operational constraint at your firm right now?",type:"single-select",required:!0,options:["We cannot see which projects are profitable until it is too late to adjust","Inconsistency across teams: quality and process vary too much","Proposal and business development consume too much principal time","We are losing institutional knowledge as people leave or teams change","Staff utilization is uneven: some teams are overloaded while others have capacity"]}];var W="D",j="Large / Corporate Practice",U=[{id:"practice_profile_large",label:"QD1",category:"LARGE / CORPORATE PRACTICE",question:"What project sectors does your firm primarily serve?",type:"single-select",required:!0,options:["Healthcare (hospitals, clinics, medical office buildings)","Education (K-12, higher education, research facilities)","Government and civic (courthouses, public safety, municipal buildings)","Corporate and commercial (office, hospitality, retail at scale)","A diversified portfolio across multiple sectors"]},{id:"qaqc_large",label:"QD2",category:"LARGE / CORPORATE PRACTICE",question:"How does your firm manage QA/QC across multiple project teams before issuing construction documents?",subtitle:"At your firm's scale, document quality is a risk management issue as much as an efficiency issue.",type:"single-select",required:!0,options:["Senior staff conduct informal reviews before major submissions","We have a formal QA/QC checklist but compliance varies across teams","We have a dedicated QA/QC process with defined reviewers at each phase gate","We use both manual reviews and coordination software (clash detection, model checking) as standard practice"]},{id:"standardization_large",label:"QD3",category:"LARGE / CORPORATE PRACTICE",question:"How does your firm balance firm-wide standards (templates, details, processes) with the unique requirements of each project?",type:"single-select",required:!0,options:["We have a strong standards library that all teams use as a starting point","We have standards but teams frequently deviate based on project needs","Standards are maintained by a dedicated group and updated regularly","We do not have robust firm-wide standards; each team develops their own approach"]},{id:"consultant_coord_large",label:"QD4",category:"LARGE / CORPORATE PRACTICE",question:"On complex projects with many consultant disciplines, how does your firm manage design coordination?",subtitle:"Healthcare and institutional projects can involve 10+ consultant teams.",type:"single-select",required:!0,options:["Regular coordination meetings and email-based review","BIM coordination with clash detection at defined milestones","A formal coordination protocol with BIM execution plans, regular clash reviews, and defined resolution workflows","Coordination is project-dependent and varies based on the project manager"]},{id:"overhead_utilization_large",label:"QD5",category:"LARGE / CORPORATE PRACTICE",question:"How does your firm manage overhead costs and staff utilization across departments?",type:"single-select",required:!0,options:["We track utilization rates by department and adjust staffing proactively","We monitor overhead as a percentage of revenue but do not manage it at the department level","Utilization tracking is informal; we react to workload issues as they arise","Overhead management is a known weakness; we struggle with the cost of supporting departments"]},{id:"client_source_large",label:"QD6",category:"LARGE / CORPORATE PRACTICE",question:"How does your firm win new work?",type:"single-select",required:!0,options:["Primarily through competitive RFP/RFQ processes for institutional and public clients","Master agreements and repeat relationships with healthcare systems, universities, or corporate clients","A mix of competitive selection, relationship-based work, and developer projects","Our reputation and sector expertise bring clients to us; we select projects strategically"]},{id:"digital_presence_large",label:"QD7",category:"LARGE / CORPORATE PRACTICE",question:"How does your firm's digital presence reflect your capabilities?",type:"single-select",required:!0,options:["We have a comprehensive website with sector pages, thought leadership, and project case studies","Our website showcases projects but lacks depth in content like case studies or sector expertise","We are well-represented in industry directories, rankings, and awards lists","Digital presence is not a strategic priority; our reputation and relationships drive work"]},{id:"bottleneck_large",label:"QD8",category:"LARGE / CORPORATE PRACTICE",question:"What is the most significant operational challenge at your firm right now?",type:"single-select",required:!0,options:["Managing document quality and coordination across large, complex project teams","Controlling overhead while maintaining the support infrastructure our project teams need","Standardizing processes across offices, studios, or departments","Finding, training, and retaining qualified staff at all levels","Winning work in increasingly competitive RFP environments"]}];var $="E",P="Design-Build Firm",Q=[{id:"practice_profile_db",label:"QE1",category:"DESIGN-BUILD FIRM",question:"How is your design-build practice structured?",type:"single-select",required:!0,options:["We are a single entity that handles both design and construction","We are the design arm of a construction company","We are an architecture firm with a closely affiliated construction partner","We offer design-build on some projects and traditional delivery on others"]},{id:"doc_speed_db",label:"QE2",category:"DESIGN-BUILD FIRM",question:"How does the pace of CD production keep up with construction scheduling on your design-build projects?",subtitle:"In design-build, construction often starts before documents are complete.",type:"single-select",required:!0,options:["CDs are a constant bottleneck: construction is often waiting on documents","We issue CDs in phases (foundations, shell, interiors) to keep construction moving","We have a streamlined process that keeps documents ahead of construction","Documentation pace varies by project and is a frequent source of internal friction"]},{id:"design_to_field_db",label:"QE3",category:"DESIGN-BUILD FIRM",question:"How do design decisions get communicated to the construction team during a project?",type:"single-select",required:!0,options:["Primarily through drawings and specifications issued at defined milestones","Through a combination of drawings, RFIs, and informal daily communication","We use a shared project platform where design and construction teams collaborate in real time","Communication between design and construction is a known challenge for us"]},{id:"value_engineering_db",label:"QE4",category:"DESIGN-BUILD FIRM",question:"How does your firm manage value engineering without losing design quality?",subtitle:"Design-build projects face constant cost pressure.",type:"single-select",required:!0,options:["Design and construction leads negotiate trade-offs informally on a case-by-case basis","We have a formal VE process with defined criteria and client input","The construction team drives VE and the design team responds","Value engineering is a significant source of tension between design and construction goals"]},{id:"submittals_rfis_db",label:"QE5",category:"DESIGN-BUILD FIRM",question:"In the design-build model, submittals and RFIs happen earlier and more frequently. How does your team manage the volume?",type:"single-select",required:!0,options:["We handle them as they come in, mostly through email","We use a project management platform (Procore, PlanGrid, or similar) for tracking","We have a streamlined process because design and construction resolve issues directly","The volume is manageable because our integrated team catches most issues before they become formal RFIs"]},{id:"client_source_db",label:"QE6",category:"DESIGN-BUILD FIRM",question:"How does your firm attract new design-build projects?",type:"single-select",required:!0,options:["Repeat relationships with owners and developers who prefer design-build","Competitive design-build proposals where speed and cost certainty are the selling points","We convert traditional delivery opportunities by proposing a design-build alternative","Referrals from general contractors or construction partners","A mix of repeat clients and targeted pursuit"]},{id:"digital_presence_db",label:"QE7",category:"DESIGN-BUILD FIRM",question:"How does your firm communicate the design-build value proposition to potential clients?",type:"single-select",required:!0,options:["Our website clearly explains the design-build process and showcases completed projects with timelines and outcomes","We have project photos and descriptions but do not specifically market the design-build advantage","Our reputation and past project references speak for us; we do not invest heavily in digital marketing","We have not differentiated our online presence from traditional architecture firms"]},{id:"bottleneck_db",label:"QE8",category:"DESIGN-BUILD FIRM",question:"What is the single biggest constraint on your design-build practice right now?",type:"single-select",required:!0,options:["Getting construction documents produced fast enough to stay ahead of the construction schedule","Maintaining design quality under constant cost and schedule pressure","Coordinating effectively between the design team and the field team","Managing scope and change orders in the integrated delivery model","Winning new design-build projects against competitors who undercut on price"]}];var H="F",F="Specialty / Niche Practice",B=[{id:"specialty_profile_niche",label:"QF1",category:"SPECIALTY / NICHE PRACTICE",question:"What is your firm's primary area of specialization?",type:"single-select",required:!0,options:["Sustainable design consulting (LEED, Passive House, energy modeling, carbon tracking)","Historic preservation and adaptive reuse","Building code, accessibility, or zoning consulting","Forensic architecture, building failure investigation, or expert witness","Building envelope, waterproofing, or facade consulting","Another specialty not listed above"]},{id:"staying_current_niche",label:"QF2",category:"SPECIALTY / NICHE PRACTICE",question:"How does your firm keep up with changes in regulations, standards, and technical requirements in your specialty area?",subtitle:"In most specialty areas, the technical landscape changes faster than general practice.",type:"single-select",required:!0,options:["We rely on individual expertise and informal monitoring of industry sources","We subscribe to regulatory alert services and technical publications","We actively participate in standards committees, code development, or professional organizations","Staying current is a significant challenge and we know we are sometimes behind"]},{id:"report_production_niche",label:"QF3",category:"SPECIALTY / NICHE PRACTICE",question:"How does your firm produce its primary work product (reports, analyses, compliance documentation)?",type:"single-select",required:!0,options:["Each report is written from scratch based on the specific project and analysis","We have templates and standard formats that we adapt for each project","We use specialized software that generates portions of our deliverables from analysis data","Report production is our biggest time sink and we know there is a more efficient way"]},{id:"aor_coordination_niche",label:"QF4",category:"SPECIALTY / NICHE PRACTICE",question:"How does your firm typically coordinate with the project's architect of record (AOR)?",type:"single-select",required:!0,options:["We provide our analysis and recommendations; the AOR integrates them into their documents","We work closely with the AOR through regular meetings and shared models","Integration of our recommendations into the design is often a friction point","We provide standalone deliverables and have limited interaction with the broader design team"]},{id:"tool_database_niche",label:"QF5",category:"SPECIALTY / NICHE PRACTICE",question:"Does your firm maintain proprietary databases, checklists, analysis tools, or reference libraries specific to your specialty?",type:"single-select",required:!0,options:["Yes: we have custom tools and databases that are central to our workflow","We have some internal resources but they are not systematically maintained","We rely primarily on commercially available tools and publicly available references","We need to build better internal resources but have not had the time"]},{id:"client_source_niche",label:"QF6",category:"SPECIALTY / NICHE PRACTICE",question:"Who are your primary clients and how do you get new work?",type:"single-select",required:!0,options:["Other architecture firms engage us as subconsultants (we serve architects, not building owners)","Building owners and developers engage us directly for our specialty","A mix of architect-subconsultant work and direct owner engagement","Government agencies, institutions, or regulatory bodies","We are trying to expand our client base beyond our traditional referral network"]},{id:"digital_presence_niche",label:"QF7",category:"SPECIALTY / NICHE PRACTICE",question:"How does your firm communicate its specialized expertise to the market?",type:"single-select",required:!0,options:["We publish articles, present at conferences, and are recognized as thought leaders in our specialty","We have a focused website that clearly explains our specialty and showcases project examples","We rely on professional directories and organization listings specific to our field","Our visibility comes primarily from word of mouth and professional referrals"]},{id:"bottleneck_niche",label:"QF8",category:"SPECIALTY / NICHE PRACTICE",question:"What is the single biggest constraint on your specialty practice right now?",type:"single-select",required:!0,options:["Keeping up with the pace of regulatory and technical change in our specialty","Producing reports and documentation efficiently enough to maintain margins","Educating the market about what our specialty offers and why it matters","Coordinating with architects of record who do not understand our specialty's requirements","Scaling the practice without diluting the expertise that defines us"]}];var z="G",G="Developer Services Firm",Y=[{id:"practice_profile_dev",label:"QG1",category:"DEVELOPER SERVICES FIRM",question:"What project types make up most of your developer work?",type:"single-select",required:!0,options:["Multi-family residential (apartments, condos, townhomes)","Retail, hospitality, or light commercial prototypes","Mixed-use developments","Single-family residential at volume (production housing, planned communities)","A mix of project types for different developer clients"]},{id:"template_efficiency_dev",label:"QG2",category:"DEVELOPER SERVICES FIRM",question:"How does your firm use templates, prototype designs, or standard unit plans to accelerate production?",subtitle:"Developer services firms live or die on production efficiency.",type:"single-select",required:!0,options:["We have a well-developed library of unit plans and standard details that we adapt for each site","We reuse past projects as starting points but each project still requires substantial rework","We are building a template library but it is not yet comprehensive","Each project is still largely produced from scratch, even when the program is similar"]},{id:"permitting_dev",label:"QG3",category:"DEVELOPER SERVICES FIRM",question:"How does your firm manage the permitting process across different jurisdictions?",type:"single-select",required:!0,options:["We have deep knowledge of our primary jurisdictions and have built relationships with plan reviewers","We manage permitting but each jurisdiction requires significant research into local requirements","We have a database or checklist of requirements by jurisdiction that we maintain","Permitting is a frequent source of delays and rework on our projects"]},{id:"site_adaptation_dev",label:"QG4",category:"DEVELOPER SERVICES FIRM",question:"When you have a prototype or base design, how much time does site-specific adaptation typically take?",type:"single-select",required:!0,options:["Site adaptation is relatively quick: mostly site plan, grading, and local code adjustments","Each site requires moderate adaptation: zoning, code, and local design requirements add up","Site adaptation frequently turns into a significant redesign effort","We have streamlined site adaptation into a predictable process with defined steps"]},{id:"multi_project_mgmt_dev",label:"QG5",category:"DEVELOPER SERVICES FIRM",question:"How does your firm manage multiple active projects simultaneously?",type:"single-select",required:!0,options:["We have a project management system that tracks status, deadlines, and resource allocation across all projects","Project managers track their own projects; firm-wide visibility is limited","We use spreadsheets or basic tools to track project status","Managing multiple projects simultaneously is a significant challenge for us"]},{id:"client_source_dev",label:"QG6",category:"DEVELOPER SERVICES FIRM",question:"How do you maintain and grow your developer client relationships?",type:"single-select",required:!0,options:["Repeat business from a core group of developers accounts for most of our revenue","We actively pursue new developer relationships while maintaining existing ones","We rely on our reputation for speed and reliability to attract new developer clients","We are too dependent on a small number of developer clients and need to diversify"]},{id:"digital_presence_dev",label:"QG7",category:"DEVELOPER SERVICES FIRM",question:"How does your firm present itself to potential developer clients?",type:"single-select",required:!0,options:["We have a track record page showing completed projects, unit counts, and permit timelines","Our website shows project photos but does not specifically market our developer services capabilities","We rely entirely on personal relationships and referrals; our online presence is secondary","We maintain a database of completed projects with metrics that we share in proposals"]},{id:"bottleneck_dev",label:"QG8",category:"DEVELOPER SERVICES FIRM",question:"What is the single biggest constraint on your developer services practice?",type:"single-select",required:!0,options:["Production speed: we cannot turn projects around fast enough to meet developer timelines","Permitting: navigating jurisdictions and responding to plan review comments takes too long","Adapting designs to site-specific conditions and local codes consumes more time than expected","Managing workload: we have too many projects with too few people","Maintaining margins: developer clients constantly push fees down"]}];var K="H",V="Multi-Discipline / Full-Service Firm",Z=[{id:"practice_profile_multi",label:"QH1",category:"MULTI-DISCIPLINE / FULL-SERVICE FIRM",question:"What disciplines does your firm combine in-house?",type:"single-select",required:!0,options:["Architecture + structural engineering","Architecture + full MEP (mechanical, electrical, plumbing) engineering","Architecture + multiple engineering disciplines (structural, MEP, civil)","Architecture + interior design + landscape architecture","Architecture + engineering + planning or environmental consulting","A broad multi-discipline firm covering four or more design disciplines"]},{id:"cross_discipline_coord_multi",label:"QH2",category:"MULTI-DISCIPLINE / FULL-SERVICE FIRM",question:"How does your firm coordinate design work across disciplines on a typical project?",subtitle:"Internal coordination is the defining operational challenge for multi-discipline firms.",type:"single-select",required:!0,options:["Regular coordination meetings with discipline leads, but each team works in their own silo between meetings","Shared BIM models with defined coordination protocols and regular clash detection reviews","Informal coordination: disciplines communicate as needed based on personal relationships","We have a formal integrated project delivery process with defined coordination milestones"]},{id:"unified_pm_multi",label:"QH3",category:"MULTI-DISCIPLINE / FULL-SERVICE FIRM",question:"How does your firm manage a single project when it spans multiple disciplines with separate budgets and timelines?",type:"single-select",required:!0,options:["One project manager oversees all disciplines and manages a unified project budget","Each discipline has its own project manager; coordination happens at the principal level","We use project management software that tracks all disciplines on the same project dashboard","Multi-discipline project management is a known pain point; we lose visibility across disciplines"]},{id:"qc_across_disciplines_multi",label:"QH4",category:"MULTI-DISCIPLINE / FULL-SERVICE FIRM",question:"How does your firm ensure document quality and coordination across disciplines before issuing deliverables?",type:"single-select",required:!0,options:["Each discipline conducts their own QA/QC; cross-discipline review is a final check","We have an integrated QA/QC process that reviews coordination across all disciplines","QA/QC is informal and varies by project team and discipline","We rely on clash detection software as the primary quality control mechanism"]},{id:"resource_sharing_multi",label:"QH5",category:"MULTI-DISCIPLINE / FULL-SERVICE FIRM",question:"How does your firm allocate staff across disciplines when project workloads fluctuate?",type:"single-select",required:!0,options:["We have a centralized resource management process that moves people across disciplines as needed","Discipline leads manage their own teams; cross-discipline staffing happens only in emergencies","We have some flexibility but resource sharing across disciplines is limited by specialization","Resource imbalance across disciplines is a frequent problem"]},{id:"client_source_multi",label:"QH6",category:"MULTI-DISCIPLINE / FULL-SERVICE FIRM",question:"How does your multi-discipline capability factor into winning work?",type:"single-select",required:!0,options:["Our integrated service offering is our primary competitive advantage; clients hire us because we do it all","We lead with architecture and add discipline services as needed","Certain clients or project types require multi-discipline capabilities and that is where we compete","We have not effectively marketed our multi-discipline capability as a differentiator"]},{id:"digital_presence_multi",label:"QH7",category:"MULTI-DISCIPLINE / FULL-SERVICE FIRM",question:"How does your firm present its multi-discipline capabilities online?",type:"single-select",required:!0,options:["Our website features discipline-specific pages, integrated case studies, and team profiles across all services","We have a general website that mentions all disciplines but does not showcase them individually","Our online presence leads with architecture; other disciplines are secondary","We have not invested in presenting our full-service capabilities online"]},{id:"bottleneck_multi",label:"QH8",category:"MULTI-DISCIPLINE / FULL-SERVICE FIRM",question:"What is the most significant operational challenge in running your multi-discipline firm?",type:"single-select",required:!0,options:["Coordinating design work across disciplines without things falling through the gaps","Tracking project profitability when a single project spans multiple discipline budgets","Maintaining consistent quality across all disciplines","Balancing workload across disciplines when demand fluctuates unevenly","Delivering a unified client experience when multiple discipline leads interact with the owner"]}];var J={A:{key:R,name:C,questions:A},B:{key:D,name:k,questions:M},C:{key:T,name:L,questions:N},D:{key:W,name:j,questions:U},E:{key:$,name:P,questions:Q},F:{key:H,name:F,questions:B},G:{key:z,name:G,questions:Y},H:{key:K,name:V,questions:Z}};function y(e){return J[e]||J.H}var b="https://cdn.jsdelivr.net/gh/biel-pitman/architecture-assessment-v2@v2.1.0/src/images",I={operational:`${b}/operational.webp`,acquisition:`${b}/acquisition.webp`,digital:`${b}/digital.webp`,practice_readiness:`${b}/practice_readiness.webp`};var ze=n.ROOT_ID,l=null;function X(e){l=e}function p(){let e=O();if(!e)return;let t=q(),s=S(),o=E(),r=i.answers[e.id]??"",d=i.phase!=="CORE";l.innerHTML=`
    <div class="af-header">
      <h1>How AI-Ready Is Your Practice?</h1>
      <p>${n.BRAND.tagline}</p>
    </div>
    ${d?`
      <div class="af-progress-text">Question ${s} of ${o}</div>
      <div class="af-progress-wrap">
        <div class="af-progress-bar" style="width:${t}%"></div>
      </div>
    `:""}
    <div class="af-card">
      ${e.category?`<span class="af-category">${e.category}</span>`:""}
      <h2 class="af-question">${e.question}</h2>
      ${e.subtitle?`<p class="af-subtitle">${e.subtitle}</p>`:""}
      <div class="af-answer-area">${ae(e,r)}</div>
    </div>
    <div class="af-nav">
      ${s>1?'<button class="af-btn af-btn-secondary" data-action="prev">Back</button>':"<span></span>"}
      ${ne(e,r)}
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${n.BRAND.name}</div>
  `,le(e)}function ae(e,t){switch(e.type){case"text":case"email":return`<input class="af-input" type="${e.type==="email"?"email":"text"}"
        placeholder="${e.placeholder||""}" value="${u(t)}" data-id="${e.id}" autocomplete="off">`;case"textarea":return`<textarea class="af-textarea" placeholder="${e.placeholder||""}"
        data-id="${e.id}">${u(t)}</textarea>`;case"single-select":return se(e,t);case"scale":return re(e,t);default:return""}}function se(e,t){return`<div class="af-options">${e.options.map(o=>{let r=typeof o=="string"?o:o.label;return`<button class="af-option ${t===r?"selected":""}" data-value="${u(r)}">${u(r)}</button>`}).join("")}</div>`}function re(e,t){let s=[];for(let o=e.min;o<=e.max;o++){let r=t===String(o)?"selected":"";s.push(`<button class="af-scale-btn ${r}" data-value="${o}">${o}</button>`)}return`
    <div class="af-scale">${s.join("")}</div>
    <div class="af-scale-labels">
      <span>${e.minLabel||""}</span>
      <span>${e.maxLabel||""}</span>
    </div>
  `}function ne(e,t){if(e.type==="single-select"&&e.autoAdvance)return"<span></span>";let r=e.required&&!(t!==""&&t!==void 0&&t!==null)?"disabled":"",d=i.slideIndex===E()-1?"Submit":"Next";return`<button class="${d==="Submit"?"af-btn af-btn-submit":"af-btn af-btn-primary"}" data-action="next" ${r}>${d}</button>`}function le(e){let t=l.querySelector(".af-input");t&&(t.addEventListener("input",()=>{g(e.id,t.value.trim()),w(e)}),t.focus());let s=l.querySelector(".af-textarea");s&&(s.addEventListener("input",()=>{g(e.id,s.value.trim()),w(e)}),s.focus()),l.querySelectorAll(".af-option").forEach(o=>{o.addEventListener("click",()=>{let r=o.getAttribute("data-value");g(e.id,r),l.querySelectorAll(".af-option").forEach(d=>d.classList.remove("selected")),o.classList.add("selected"),e.autoAdvance?setTimeout(()=>{let d=new CustomEvent("af-navigate",{detail:{action:"next"}});l.dispatchEvent(d)},250):w(e)})}),l.querySelectorAll(".af-scale-btn").forEach(o=>{o.addEventListener("click",()=>{let r=o.getAttribute("data-value");g(e.id,r),l.querySelectorAll(".af-scale-btn").forEach(d=>d.classList.remove("selected")),o.classList.add("selected"),w(e)})}),l.querySelectorAll("[data-action]").forEach(o=>{o.addEventListener("click",()=>{let r=o.getAttribute("data-action");l.dispatchEvent(new CustomEvent("af-navigate",{detail:{action:r}}))})}),t&&t.addEventListener("keydown",o=>{o.key==="Enter"&&t.value.trim()&&l.dispatchEvent(new CustomEvent("af-navigate",{detail:{action:"next"}}))})}function w(e){let t=l.querySelector("[data-action='next']");if(!t)return;let s=i.answers[e.id]??"",o=s!==""&&s!==void 0;t.disabled=e.required&&!o}function ee(){l.innerHTML=`
    <div class="af-header">
      <h1>How AI-Ready Is Your Practice?</h1>
      <p>${n.BRAND.tagline}</p>
    </div>
    <div class="af-progress-wrap">
      <div class="af-progress-bar" style="width:100%"></div>
    </div>
    <div class="af-card af-submitting">
      <div class="af-spinner"></div>
      <h2 class="af-question">Analyzing your responses</h2>
      <p class="af-subtitle">We're building your personalized readiness report. This typically takes 15-30 seconds.</p>
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${n.BRAND.name}</div>
  `}function te(e){if(!e||e.fallback||!e.overall_score){l.innerHTML=`
      <div class="af-header">
        <h1>Thank You!</h1>
        <p>${i.answers.firm_name||"Your Firm"} &middot; ${i.moduleName||"Assessment"}</p>
      </div>
      <div class="af-card">
        <h2>Your Assessment Has Been Received</h2>
        <p>We're preparing your personalized AI Readiness Report. You'll receive a detailed analysis at <strong>${i.answers.contact_email||"your email"}</strong> shortly.</p>
        <div class="af-cta">
          <a href="${n.BRAND.website}" class="af-btn af-btn-primary" target="_blank" rel="noopener">
            Schedule Your Strategy Session
          </a>
        </div>
      </div>
      <div class="af-footer">&copy; ${new Date().getFullYear()} ${n.BRAND.name}</div>
    `;return}l.innerHTML=`
    <div class="af-header">
      <h1>Your AI Readiness Report</h1>
      <p>${i.answers.firm_name||"Your Firm"} &middot; ${i.moduleName||"Assessment"}</p>
    </div>
    <div class="af-card af-results">
      <div class="af-dimensions">
        ${v("Operational Efficiency",e.operational,"operational")}
        ${v("Client Acquisition",e.acquisition,"acquisition")}
        ${v("Digital Visibility",e.digital,"digital")}
        ${v("Practice Readiness",e.practice_readiness,"practice_readiness")}
      </div>

      ${e.executive_summary?`
        <div class="af-summary-section">
          <h3>Executive Summary</h3>
          <p>${u(e.executive_summary)}</p>
        </div>
      `:""}

      ${e.top_opportunities&&e.top_opportunities.length?`
        <div class="af-summary-section">
          <h3>Top Opportunities</h3>
          <ol>${e.top_opportunities.map(t=>`<li>${u(t)}</li>`).join("")}</ol>
        </div>
      `:""}

      ${e.recommended_next_steps&&e.recommended_next_steps.length?`
        <div class="af-summary-section">
          <h3>Recommended Next Steps</h3>
          <ol>${e.recommended_next_steps.map(t=>`<li>${u(t)}</li>`).join("")}</ol>
        </div>
      `:""}

      <div class="af-cta">
        ${e.cta_line?`<p class="af-cta-line">${u(e.cta_line)}</p>`:""}
        <a href="${n.BRAND.website}" class="af-btn af-btn-primary" target="_blank" rel="noopener">
          Schedule Your Strategy Session
        </a>
      </div>
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${n.BRAND.name}</div>
  `}function ce(e){return e<30?"#f4c089":e<50?"#f0a050":e<70?"#e27308":e<85?"#c96407":"#a85206"}function v(e,t,s){if(!t)return"";let o=t.score??0,r=t.insight||"",d=ce(o);return`
    <div class="af-dim-card">
      ${I[s]?`<img class="af-dim-img" src="${I[s]}" alt="${e}">`:""}
      <div class="af-dim-name">${e}</div>
      <div class="af-dim-score">${o}<span class="af-dim-pct">%</span></div>
      <div class="af-dim-bar">
        <div class="af-dim-fill" style="width:${o}%; background:${d}"></div>
      </div>
      ${r?`<div class="af-dim-insight">${u(r)}</div>`:""}
    </div>
  `}function ie(e){l.innerHTML=`
    <div class="af-header">
      <h1>How AI-Ready Is Your Practice?</h1>
      <p>${n.BRAND.tagline}</p>
    </div>
    <div class="af-card" style="text-align:center">
      <h2 class="af-question">Something went wrong</h2>
      <p class="af-subtitle">${u(e)}</p>
      <div style="padding-top:16px">
        <button class="af-btn af-btn-primary" data-action="retry">Try Again</button>
      </div>
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${n.BRAND.name}</div>
  `,l.querySelector("[data-action='retry']")?.addEventListener("click",()=>{l.dispatchEvent(new CustomEvent("af-navigate",{detail:{action:"retry"}}))})}function u(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function oe(){let e=document.getElementById(n.ROOT_ID);if(!e){console.warn(`[Archificials V2] Mount element #${n.ROOT_ID} not found.`);return}_(),X(e),c({phase:"CORE",slideIndex:0,slides:f,slideOffset:0,totalAllSlides:0}),p(),de(e)}function de(e){e.addEventListener("af-navigate",t=>{let{action:s}=t.detail;s==="next"?ue(e):s==="prev"?pe(e):s==="retry"&&me(e)})}function ue(e){let t=i.slides[i.slideIndex];if(t&&t.required){let s=i.answers[t.id];if(!s||s==="")return}if(t&&t.type==="email"){let s=i.answers[t.id]||"";if(!ye(s))return}if(i.slideIndex>=i.slides.length-1){ge(e);return}c({slideIndex:i.slideIndex+1}),p(),m()}function pe(e){if(i.slideIndex>0)c({slideIndex:i.slideIndex-1}),p(),m();else if(i.phase==="CLOSING"){let t=y(i.selectedModule);c({phase:"MODULE",slides:t.questions,slideIndex:t.questions.length-1,slideOffset:0}),p(),m()}else i.phase==="MODULE"&&(c({phase:"CORE",slides:f,slideIndex:f.length-1,slideOffset:0}),p(),m())}function me(e){c({error:null,isSubmitting:!1}),c({phase:"CLOSING",slides:h,slideIndex:h.length-1}),p()}function ge(e){if(i.phase==="CORE"){let t=i.answers.firm_type,s=fe(t);c({selectedModule:s,moduleName:y(s).name});let o=y(s),r=o.questions.length+h.length;c({phase:"MODULE",slides:o.questions,slideIndex:0,slideOffset:0,totalAllSlides:r}),p(),m()}else i.phase==="MODULE"?(c({phase:"CLOSING",slides:h,slideIndex:0,slideOffset:i.slides.length}),p(),m()):i.phase==="CLOSING"&&he(e)}function fe(e){let t=f.find(o=>o.id==="firm_type");if(!t)return"H";let s=t.options.find(o=>(typeof o=="string"?o:o.label)===e);return s&&s.route?s.route:"H"}async function he(e){c({phase:"SUBMITTING",isSubmitting:!0}),ee(),m();try{let t={...i.answers,version:n.VERSION,firm_type:i.moduleName,module_key:i.selectedModule,timestamp:new Date().toISOString()},s=await fetch(n.WORKER_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!s.ok){let r=await s.text();throw new Error(`Server error (${s.status}): ${r}`)}let o=await s.json();if(o.error)throw new Error(o.error);c({phase:"RESULTS",scores:o.scores||o,isSubmitting:!1}),te(i.scores),m()}catch(t){console.error("[Archificials V2] Submission error:",t),c({phase:"CLOSING",error:t.message,isSubmitting:!1}),ie(t.message||"We were unable to process your assessment. Please try again.")}}function ye(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function m(){let e=document.getElementById(n.ROOT_ID);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",oe):oe();})();
