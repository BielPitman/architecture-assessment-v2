// Architecture Practice AI Scorer - v2
// Cloudflare Worker: receives assessment answers, scores via Claude, stores in Airtable, emails notification

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

// ─── Scoring Prompt ─────────────────────────────────────────────────────────

function buildScoringPrompt(a) {
  const ft = a.firm_type || "";
  const mk = a.module_key || "";

  // Build firm-type-specific context block using module_key for reliable routing
  let moduleContext = "";

  if (mk === "A") {
    moduleContext = `
Firm Type Module: Solo Practitioner / Micro Studio
- Project types: ${a.project_profile_solo || "N/A"}
- CD production: ${a.cd_production_solo || "N/A"}
- Scope management: ${a.scope_mgmt_solo || "N/A"}
- CA management: ${a.ca_mgmt_solo || "N/A"}
- Time allocation: ${a.time_allocation_solo || "N/A"}
- Client source: ${a.client_source_solo || "N/A"}
- Digital presence: ${a.digital_presence_solo || "N/A"}
- Biggest bottleneck: ${a.bottleneck_solo || "N/A"}`;
  } else if (mk === "B") {
    moduleContext = `
Firm Type Module: Boutique Design Studio
- Practice profile: ${a.practice_profile_boutique || "N/A"}
- Design-to-CD transition: ${a.design_to_cd_boutique || "N/A"}
- Design iteration: ${a.design_iteration_boutique || "N/A"}
- Consultant coordination: ${a.consultant_coord_boutique || "N/A"}
- Proposal preparation: ${a.proposal_prep_boutique || "N/A"}
- Client source: ${a.client_source_boutique || "N/A"}
- Digital presence: ${a.digital_presence_boutique || "N/A"}
- Biggest bottleneck: ${a.bottleneck_boutique || "N/A"}`;
  } else if (mk === "C") {
    moduleContext = `
Firm Type Module: Mid-Size Production Practice
- Practice profile: ${a.practice_profile_midsize || "N/A"}
- Cross-team consistency: ${a.cross_team_consistency_midsize || "N/A"}
- Project profitability: ${a.project_profitability_midsize || "N/A"}
- Proposal production: ${a.proposal_production_midsize || "N/A"}
- Knowledge management: ${a.knowledge_mgmt_midsize || "N/A"}
- Client source: ${a.client_source_midsize || "N/A"}
- Digital presence: ${a.digital_presence_midsize || "N/A"}
- Biggest bottleneck: ${a.bottleneck_midsize || "N/A"}`;
  } else if (mk === "D") {
    moduleContext = `
Firm Type Module: Large / Corporate Practice
- Practice profile: ${a.practice_profile_large || "N/A"}
- QA/QC process: ${a.qaqc_large || "N/A"}
- Standardization: ${a.standardization_large || "N/A"}
- Consultant coordination: ${a.consultant_coord_large || "N/A"}
- Overhead/utilization: ${a.overhead_utilization_large || "N/A"}
- Client source: ${a.client_source_large || "N/A"}
- Digital presence: ${a.digital_presence_large || "N/A"}
- Biggest bottleneck: ${a.bottleneck_large || "N/A"}`;
  } else if (mk === "E") {
    moduleContext = `
Firm Type Module: Design-Build Firm
- Practice structure: ${a.practice_profile_db || "N/A"}
- Documentation speed: ${a.doc_speed_db || "N/A"}
- Design-to-field communication: ${a.design_to_field_db || "N/A"}
- Value engineering: ${a.value_engineering_db || "N/A"}
- Submittals/RFIs: ${a.submittals_rfis_db || "N/A"}
- Client source: ${a.client_source_db || "N/A"}
- Digital presence: ${a.digital_presence_db || "N/A"}
- Biggest bottleneck: ${a.bottleneck_db || "N/A"}`;
  } else if (mk === "F") {
    moduleContext = `
Firm Type Module: Specialty / Niche Practice
- Specialty area: ${a.specialty_profile_niche || "N/A"}
- Staying current: ${a.staying_current_niche || "N/A"}
- Report production: ${a.report_production_niche || "N/A"}
- AOR coordination: ${a.aor_coordination_niche || "N/A"}
- Tools/databases: ${a.tool_database_niche || "N/A"}
- Client source: ${a.client_source_niche || "N/A"}
- Digital presence: ${a.digital_presence_niche || "N/A"}
- Biggest bottleneck: ${a.bottleneck_niche || "N/A"}`;
  } else if (mk === "G") {
    moduleContext = `
Firm Type Module: Developer Services Firm
- Project types: ${a.practice_profile_dev || "N/A"}
- Template efficiency: ${a.template_efficiency_dev || "N/A"}
- Permitting: ${a.permitting_dev || "N/A"}
- Site adaptation: ${a.site_adaptation_dev || "N/A"}
- Multi-project management: ${a.multi_project_mgmt_dev || "N/A"}
- Client source: ${a.client_source_dev || "N/A"}
- Digital presence: ${a.digital_presence_dev || "N/A"}
- Biggest bottleneck: ${a.bottleneck_dev || "N/A"}`;
  } else {
    // Module H: Multi-Discipline / Full-Service Firm (default fallback)
    moduleContext = `
Firm Type Module: Multi-Discipline / Full-Service Firm
- Disciplines combined: ${a.practice_profile_multi || "N/A"}
- Cross-discipline coordination: ${a.cross_discipline_coord_multi || "N/A"}
- Unified project management: ${a.unified_pm_multi || "N/A"}
- QC across disciplines: ${a.qc_across_disciplines_multi || "N/A"}
- Resource sharing: ${a.resource_sharing_multi || "N/A"}
- Client source: ${a.client_source_multi || "N/A"}
- Digital presence: ${a.digital_presence_multi || "N/A"}
- Biggest bottleneck: ${a.bottleneck_multi || "N/A"}`;
  }

  const firmName = a.firm_name || "your firm";
  const contactFirst = (a.contact_name || "").split(" ")[0] || "";

  // System prompt embedded as prefix in the user message for single-message Claude call
  const systemPrompt = `You are a practice operations strategist at Archificials, a firm that helps architecture practices improve how they work. You are preparing a confidential readiness analysis for an architecture firm. Your analysis must be:

- Specific to their firm type, size, and the answers they gave
- Written for a principal or firm leader who is a design professional, not a technologist
- Direct and confident, not generic or hedging
- Free of all technology jargon

NEVER use: 'AI', 'machine learning', 'LLM', 'automation', 'workflow', 'deploy', 'implement', 'integrate', 'algorithm', 'model', 'prompt', 'pipeline', 'vector', 'training data', 'fine-tuning', 'natural language', 'RAG', 'agent', or any similar terms.

USE INSTEAD: 'tools that do X', 'systems that read and organize', 'processes that run without staff time', 'software that handles Y', 'your team spends fewer hours on Z', 'documents produced in a fraction of the time', 'proposals assembled from your past submissions', 'RFIs drafted for your review from your own project records'.

Frame every insight in terms architects care about: design time protected, project profitability improved, fewer coordination errors, documents produced faster, proposals drafted more competitively, code compliance checked before it costs a permit cycle, RFIs responded to from project documents.`;

  return `${systemPrompt}

Now analyze this architecture firm submission. Your audience is ${contactFirst || "the person"} at ${firmName}. They just completed the assessment and will read your analysis immediately.

TONE AND VOICE RULES (follow strictly):
- Write as if you are speaking directly to ${contactFirst || "them"}. Use "you" and "your" naturally. Occasionally reference "${firmName}" by name instead of "you/your" for variety, but never say "the firm" or "the practice."
- ${contactFirst ? `Use "${contactFirst}" by name once or twice across all your text, placed naturally (not forced), to make the report feel personal. Vary where you use it so it does not feel templated.` : "Do not reference any name since none was provided."}
- Be warm, direct, and conversational. Write the way a trusted advisor would speak in a strategy meeting, not a corporate report. Avoid stiff or clinical phrasing.
- ABSOLUTE RULE: Never use em dashes. Not a single one. Use commas, periods, semicolons, or rewrite the sentence instead. This is non-negotiable.
- Never use hype words (revolutionary, cutting-edge, game-changing, transformative, unlock, supercharge, leverage, etc.). Stick to plain, specific language.
- Keep sentences short and concrete. Ground every observation in something they actually said in their answers.

Firm Profile:
- Firm name: ${a.firm_name || "N/A"}
- Contact: ${a.contact_name || "N/A"} (${a.contact_email || "N/A"})
- Firm size: ${a.firm_size || "N/A"}
- Firm type: ${ft || "N/A"}
${moduleContext}

Closing Questions:
- After-hours contact: ${a.after_hours || "N/A"}
- Intake speed: ${a.intake_speed || "N/A"}
- Urgency (1-5): ${a.urgency || "N/A"}
- Investment appetite: ${a.investment || "N/A"}
- Success vision: ${a.success_vision || "N/A"}
- Additional context: ${a.anything_else || "N/A"}

Score on four dimensions (0-100 each):
1. Operational Efficiency (35% weight): Score lower if documentation is from-scratch every time, scope creep is unmanaged, CA eats principal time, no project profitability tracking, QA/QC is informal. Score higher if templates/standards exist, scope changes are documented, profitability tracked in real time, formal QA processes.
2. Client Acquisition (25% weight): Score lower if heavily dependent on one referral source, slow intake, no pipeline tracking, proposal process is ad hoc. Score higher if diversified lead sources, fast intake, systematic pursuit process, client retention strategy.
3. Digital Visibility (20% weight): Score lower if no website or outdated, no directory presence, unpublished portfolio. Score higher if current portfolio website, active in relevant directories, thought leadership or published work. Calibrate expectations by firm type: a developer services firm needs a track record page, not an award-winning portfolio site.
4. Practice Readiness (20% weight): Score lower if no process standardization, no knowledge management, no prior tool adoption, low urgency. Score higher if standardized processes, active knowledge libraries, existing technology foundation, clear internal ownership for improvement.

Overall = weighted average using 35/25/20/20 weights.

CRITICAL RULES FOR DIMENSION INSIGHTS (insight_operational, insight_acquisition, insight_digital, insight_practice_readiness):
- Each of the four dimension insights MUST start with a DIFFERENT opener. You have four insights; use four distinct sentence structures. NEVER start two insights the same way.
- BANNED first words: Do NOT start any insight with "You", "Your", or "You've". These are overused and feel robotic when repeated across four cards.
- Instead, vary openers across these categories (pick one from each category for each insight, never repeating a category):
  * Start with the firm name: "${firmName} has built...", "${firmName} is already ahead on...", "${firmName}'s approach to..."
  ${contactFirst ? `* Start with the contact's name: "${contactFirst}, the way you handle...", "${contactFirst}, one area worth looking at..."` : ""}
  * Start with a specific observation: "The after-hours intake process here is...", "Having templates in place for...", "A week-long intake cycle means..."
  * Start with a strength: "Strong use of technology in...", "Having a standard detail library gives...", "Template-based CD production is a solid foundation..."
  * Start with the gap or opportunity: "The biggest bottleneck right now is...", "Without active digital outreach...", "Cross-team consistency is the missing piece..."
  * Start with a contrast: "On one hand, the coordination workflow is solid. On the other...", "While intake is covered after hours, the speed of..."
- Each insight should still reference something specific from their answers and describe what is working and what the gap is.
- In the executive summary (overall_summary), mention Archificials once naturally, for example: "Working with a team like Archificials on [specific area] could help you [specific outcome]." Do not make it sound like an ad. It should read like a helpful suggestion from an advisor.
- CRITICAL RULE FOR top_opportunities: Every single opportunity MUST start by positioning Archificials (or "we" / "our team") as the one helping. Vary the phrasing across the three items so it feels natural, not templated. Examples of good openers: "Archificials can help you build...", "We can help you reduce...", "Our team excels at setting up...", "Archificials specializes in building...", "We can work with you to streamline...". Never start an opportunity with a generic imperative like "Build..." or "Reduce..." directed at the client alone. Archificials is always part of the action.
- Each opportunity should still be specific, actionable, and grounded in their actual answers.
- The recommended_first_step should be a single, concrete action they could take in the next two weeks, and it should mention Archificials as the partner to help execute it.
- After the three top_opportunities, include a "cta_line" field: a warm, conversational one-liner inviting them to schedule a free consultation to discuss their pain points and opportunities in more depth. This should feel like a friend suggesting a coffee chat, not a sales pitch. Vary the wording every time; never use the same phrasing twice.
- Never be generic. If you do not have enough information to be specific, say so honestly rather than padding with filler.
- NEVER use technology jargon. No AI, ML, automation, workflow, deploy, integrate, algorithm, model, prompt, pipeline, or similar terms. Write about business outcomes only.

Return ONLY valid JSON (no markdown, no code fences):
{
  "operational": <int 0-100>,
  "acquisition": <int 0-100>,
  "digital": <int 0-100>,
  "practice_readiness": <int 0-100>,
  "overall": <int 0-100>,
  "insight_operational": "<1-2 sentences, NEVER start with You/Your/You've, use a unique opener>",
  "insight_acquisition": "<1-2 sentences, DIFFERENT opener from operational, no You/Your/You've>",
  "insight_digital": "<1-2 sentences, DIFFERENT opener from the above two, no You/Your/You've>",
  "insight_practice_readiness": "<1-2 sentences, DIFFERENT opener from all above, no You/Your/You've>",
  "recommended_first_step": "<specific action mentioning Archificials as partner>",
  "overall_summary": "<2-3 sentence executive summary, mention Archificials once naturally>",
  "top_opportunities": ["<opportunity starting with Archificials/we helping>", "<opportunity starting with Archificials/we helping>", "<opportunity starting with Archificials/we helping>"],
  "cta_line": "<warm one-liner inviting a free consultation, varied each time>"
}

Remember: no em dashes anywhere in your output. Not one. Use commas, periods, or semicolons instead. No technology jargon whatsoever.`;
}

// ─── Score Tier ──────────────────────────────────────────────────────────────

function scoreTier(n) {
  if (n < 40) return "Significant Opportunity";
  if (n < 65) return "Strong Opportunity";
  if (n < 80) return "Building Readiness";
  return "Practice Leader";
}

// ─── Module field map (for email answer table) ──────────────────────────────

const MODULE_FIELDS = {
  A: [
    ["Project Types (Solo)", "project_profile_solo"],
    ["CD Production", "cd_production_solo"],
    ["Scope Management", "scope_mgmt_solo"],
    ["CA Management", "ca_mgmt_solo"],
    ["Time Allocation", "time_allocation_solo"],
    ["Client Source", "client_source_solo"],
    ["Digital Presence", "digital_presence_solo"],
    ["Bottleneck", "bottleneck_solo"],
  ],
  B: [
    ["Practice Profile (Boutique)", "practice_profile_boutique"],
    ["Design-to-CD", "design_to_cd_boutique"],
    ["Design Iteration", "design_iteration_boutique"],
    ["Consultant Coordination", "consultant_coord_boutique"],
    ["Proposal Prep", "proposal_prep_boutique"],
    ["Client Source", "client_source_boutique"],
    ["Digital Presence", "digital_presence_boutique"],
    ["Bottleneck", "bottleneck_boutique"],
  ],
  C: [
    ["Practice Profile (Mid-Size)", "practice_profile_midsize"],
    ["Cross-Team Consistency", "cross_team_consistency_midsize"],
    ["Project Profitability", "project_profitability_midsize"],
    ["Proposal Production", "proposal_production_midsize"],
    ["Knowledge Mgmt", "knowledge_mgmt_midsize"],
    ["Client Source", "client_source_midsize"],
    ["Digital Presence", "digital_presence_midsize"],
    ["Bottleneck", "bottleneck_midsize"],
  ],
  D: [
    ["Practice Profile (Large)", "practice_profile_large"],
    ["QA/QC Process", "qaqc_large"],
    ["Standardization", "standardization_large"],
    ["Consultant Coordination", "consultant_coord_large"],
    ["Overhead/Utilization", "overhead_utilization_large"],
    ["Client Source", "client_source_large"],
    ["Digital Presence", "digital_presence_large"],
    ["Bottleneck", "bottleneck_large"],
  ],
  E: [
    ["Practice Structure (DB)", "practice_profile_db"],
    ["Documentation Speed", "doc_speed_db"],
    ["Design-to-Field", "design_to_field_db"],
    ["Value Engineering", "value_engineering_db"],
    ["Submittals/RFIs", "submittals_rfis_db"],
    ["Client Source", "client_source_db"],
    ["Digital Presence", "digital_presence_db"],
    ["Bottleneck", "bottleneck_db"],
  ],
  F: [
    ["Specialty Area", "specialty_profile_niche"],
    ["Staying Current", "staying_current_niche"],
    ["Report Production", "report_production_niche"],
    ["AOR Coordination", "aor_coordination_niche"],
    ["Tools/Databases", "tool_database_niche"],
    ["Client Source", "client_source_niche"],
    ["Digital Presence", "digital_presence_niche"],
    ["Bottleneck", "bottleneck_niche"],
  ],
  G: [
    ["Project Types (Dev)", "practice_profile_dev"],
    ["Template Efficiency", "template_efficiency_dev"],
    ["Permitting", "permitting_dev"],
    ["Site Adaptation", "site_adaptation_dev"],
    ["Multi-Project Mgmt", "multi_project_mgmt_dev"],
    ["Client Source", "client_source_dev"],
    ["Digital Presence", "digital_presence_dev"],
    ["Bottleneck", "bottleneck_dev"],
  ],
  H: [
    ["Disciplines Combined", "practice_profile_multi"],
    ["Cross-Discipline Coord", "cross_discipline_coord_multi"],
    ["Unified PM", "unified_pm_multi"],
    ["QC Across Disciplines", "qc_across_disciplines_multi"],
    ["Resource Sharing", "resource_sharing_multi"],
    ["Client Source", "client_source_multi"],
    ["Digital Presence", "digital_presence_multi"],
    ["Bottleneck", "bottleneck_multi"],
  ],
};

// ─── Notification Email ─────────────────────────────────────────────────────

function buildNotificationEmail(answers, scores) {
  const firm = answers.firm_name || "Unknown Firm";
  const tier = scoreTier(scores.overall);
  const mk = answers.module_key || "H";

  const row = (label, score, insight) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;">${label}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;font-weight:700;color:#1a1a2e;">${score}/100</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;">${insight || ""}</td>
    </tr>`;

  // Build answer rows
  const coreRows = [
    ["Firm Name", answers.firm_name],
    ["Contact", answers.contact_name],
    ["Email", answers.contact_email],
    ["Firm Size", answers.firm_size],
    ["Firm Type", answers.firm_type],
    ["Module", mk],
  ];

  // Get module-specific fields
  const fields = MODULE_FIELDS[mk] || MODULE_FIELDS.H;
  const moduleRows = fields.map(([label, key]) => [label, answers[key]]);

  const closingRows = [
    ["After-Hours Contact", answers.after_hours],
    ["Intake Speed", answers.intake_speed],
    ["Urgency", answers.urgency],
    ["Investment Appetite", answers.investment],
    ["Success Vision", answers.success_vision],
    ["Additional Context", answers.anything_else],
  ];

  const allAnswerRows = [...coreRows, ...moduleRows, ...closingRows];

  const answerTable = allAnswerRows
    .filter(([, v]) => v)
    .map(([label, val]) => `<tr><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;font-weight:600;width:35%;">${label}</td><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;">${val}</td></tr>`)
    .join("");

  const opportunitiesList = (scores.top_opportunities || [])
    .map(o => `<li style="margin-bottom:6px;">${o}</li>`)
    .join("");

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:700px;margin:0 auto;color:#1a1a2e;">
  <div style="background:#1a1a2e;color:#fff;padding:24px 32px;border-radius:8px 8px 0 0;">
    <h1 style="margin:0;font-size:22px;">New Assessment: ${firm}</h1>
    <p style="margin:8px 0 0;opacity:0.85;font-size:15px;">Overall Score: ${scores.overall}/100 (${tier})</p>
  </div>
  <div style="padding:24px 32px;background:#fff;border:1px solid #e0e0e0;">
    <h2 style="font-size:18px;margin:0 0 12px;">Score Breakdown</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <thead><tr style="background:#f8f8fa;">
        <th style="padding:8px 12px;text-align:left;">Dimension</th>
        <th style="padding:8px 12px;text-align:center;">Score</th>
        <th style="padding:8px 12px;text-align:left;">Insight</th>
      </tr></thead>
      <tbody>
        ${row("Operational Efficiency", scores.operational, scores.insight_operational)}
        ${row("Client Acquisition", scores.acquisition, scores.insight_acquisition)}
        ${row("Digital Visibility", scores.digital, scores.insight_digital)}
        ${row("Practice Readiness", scores.practice_readiness, scores.insight_practice_readiness)}
      </tbody>
    </table>

    ${scores.overall_summary ? `<h2 style="font-size:18px;margin:24px 0 8px;">Summary</h2><p style="color:#555;line-height:1.6;">${scores.overall_summary}</p>` : ""}

    ${scores.recommended_first_step ? `<h2 style="font-size:18px;margin:24px 0 8px;">Recommended First Step</h2><p style="color:#555;line-height:1.6;">${scores.recommended_first_step}</p>` : ""}

    ${opportunitiesList ? `<h2 style="font-size:18px;margin:24px 0 8px;">Top Opportunities</h2><ol style="color:#555;line-height:1.6;">${opportunitiesList}</ol>` : ""}

    <h2 style="font-size:18px;margin:24px 0 12px;">Assessment Answers</h2>
    <table style="width:100%;border-collapse:collapse;">${answerTable}</table>
  </div>
  <div style="padding:16px 32px;background:#f8f8fa;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;text-align:center;color:#888;font-size:13px;">
    Archificials Assessment System v2
  </div>
</body>
</html>`;

  return { html, subject: `[Assessment] ${firm} | ${scores.overall}/100 (${tier}) | Module ${mk}` };
}

// ─── Send Email via Resend ──────────────────────────────────────────────────

async function sendNotificationEmail(env, answers, scores) {
  const { html, subject } = buildNotificationEmail(answers, scores);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Archificials Assessments <assessments@archificials.com>",
        to: [env.NOTIFY_EMAIL],
        subject,
        html
      })
    });
    if (!res.ok) {
      const errBody = await res.text();
      console.error("Resend error:", res.status, errBody);
    }
  } catch (err) {
    console.error("Resend send failed:", err);
  }
}

// ─── Main Handler ───────────────────────────────────────────────────────────

var index_default = {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    let answers;
    try {
      answers = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON" }, 400);
    }

    if (!answers.firm_name) {
      return jsonResponse({ error: "firm_name is required" }, 400);
    }

    // Prepare Airtable fields - strip internal fields, keep answer data
    const airtableFields = { ...answers };
    delete airtableFields.version;
    delete airtableFields.timestamp;

    // Convert urgency to number if present
    if (airtableFields.urgency) {
      airtableFields.urgency = Number(airtableFields.urgency) || airtableFields.urgency;
    }

    // ── Step 1: Create Airtable record with answers ──
    let recordId = null;
    try {
      const atRes = await fetch(
        `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(env.AIRTABLE_TABLE)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ fields: airtableFields })
        }
      );
      const atData = await atRes.json();
      if (!atRes.ok) {
        console.error("Airtable POST error:", atRes.status, JSON.stringify(atData));
      } else {
        recordId = atData.id;
      }
    } catch (err) {
      console.error("Airtable POST failed:", err);
    }

    // ── Step 2: Score via Claude ──
    let scores = null;
    try {
      const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": env.CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1536,
          messages: [{ role: "user", content: buildScoringPrompt(answers) }]
        })
      });
      const claudeData = await claudeRes.json();
      if (!claudeRes.ok) {
        console.error("Claude API error", claudeRes.status, JSON.stringify(claudeData));
      } else if (claudeData.content && claudeData.content[0]) {
        const text = claudeData.content[0].text.trim();
        const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
        scores = JSON.parse(cleaned);
      }
    } catch (err) {
      console.error("Claude scoring failed:", err);
    }

    // ── Step 3: Update Airtable with scores + send email ──
    const tasks = [];

    if (scores && recordId) {
      tasks.push(
        fetch(
          `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(env.AIRTABLE_TABLE)}/${recordId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              fields: {
                score_operational: scores.operational,
                score_acquisition: scores.acquisition,
                score_digital: scores.digital,
                score_practice_readiness: scores.practice_readiness,
                score_overall: scores.overall,
                insight_operational: scores.insight_operational,
                insight_acquisition: scores.insight_acquisition,
                insight_digital: scores.insight_digital,
                insight_practice_readiness: scores.insight_practice_readiness,
                recommended_first_step: scores.recommended_first_step,
                overall_summary: scores.overall_summary
              }
            })
          }
        ).catch((err) => console.error("Airtable score update failed:", err))
      );
    }

    if (scores) {
      tasks.push(sendNotificationEmail(env, answers, scores));
    }

    await Promise.all(tasks);

    // Reshape for the frontend UI (expects nested dimension objects)
    if (scores) {
      const shaped = {
        overall_score: scores.overall ?? 0,
        operational: { score: scores.operational ?? 0, insight: scores.insight_operational || "" },
        acquisition: { score: scores.acquisition ?? 0, insight: scores.insight_acquisition || "" },
        digital: { score: scores.digital ?? 0, insight: scores.insight_digital || "" },
        practice_readiness: { score: scores.practice_readiness ?? 0, insight: scores.insight_practice_readiness || "" },
        executive_summary: scores.overall_summary || "",
        top_opportunities: scores.top_opportunities || [],
        recommended_next_steps: scores.recommended_next_steps || [],
        recommended_first_step: scores.recommended_first_step || "",
      };
      return jsonResponse(shaped);
    }

    return jsonResponse({ fallback: true });
  }
};

export { index_default as default };
