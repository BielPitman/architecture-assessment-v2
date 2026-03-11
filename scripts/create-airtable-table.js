#!/usr/bin/env node
/**
 * Creates the "V2 Assessments" table in Airtable with all required columns
 * for the Architecture AI Readiness Assessment.
 *
 * Usage:
 *   AIRTABLE_API_KEY=pat... AIRTABLE_BASE_ID=app... node scripts/create-airtable-table.js
 *
 * If AIRTABLE_BASE_ID is not set, the script will create a new base first.
 */

const TABLE_NAME = "V2 Assessments";

const API_KEY = process.env.AIRTABLE_API_KEY;
if (!API_KEY) {
  console.error("Set AIRTABLE_API_KEY env var first:\n  AIRTABLE_API_KEY=pat... node scripts/create-airtable-table.js");
  process.exit(1);
}

let BASE_ID = process.env.AIRTABLE_BASE_ID || "";

// All fields that the worker will write
const textFields = [
  // Core
  "firm_name", "contact_name", "contact_email", "firm_size",
  "firm_type", "module_key",

  // Module A (Solo Practitioner / Micro Studio)
  "project_profile_solo", "cd_production_solo", "scope_mgmt_solo", "ca_mgmt_solo",
  "time_allocation_solo", "client_source_solo", "digital_presence_solo", "bottleneck_solo",

  // Module B (Boutique Design Studio)
  "practice_profile_boutique", "design_to_cd_boutique", "design_iteration_boutique", "consultant_coord_boutique",
  "proposal_prep_boutique", "client_source_boutique", "digital_presence_boutique", "bottleneck_boutique",

  // Module C (Mid-Size Production Practice)
  "practice_profile_midsize", "cross_team_consistency_midsize", "project_profitability_midsize", "proposal_production_midsize",
  "knowledge_mgmt_midsize", "client_source_midsize", "digital_presence_midsize", "bottleneck_midsize",

  // Module D (Large / Corporate Practice)
  "practice_profile_large", "qaqc_large", "standardization_large", "consultant_coord_large",
  "overhead_utilization_large", "client_source_large", "digital_presence_large", "bottleneck_large",

  // Module E (Design-Build Firm)
  "practice_profile_db", "doc_speed_db", "design_to_field_db", "value_engineering_db",
  "submittals_rfis_db", "client_source_db", "digital_presence_db", "bottleneck_db",

  // Module F (Specialty / Niche Practice)
  "specialty_profile_niche", "staying_current_niche", "report_production_niche", "aor_coordination_niche",
  "tool_database_niche", "client_source_niche", "digital_presence_niche", "bottleneck_niche",

  // Module G (Developer Services Firm)
  "practice_profile_dev", "template_efficiency_dev", "permitting_dev", "site_adaptation_dev",
  "multi_project_mgmt_dev", "client_source_dev", "digital_presence_dev", "bottleneck_dev",

  // Module H (Multi-Discipline / Full-Service Firm)
  "practice_profile_multi", "cross_discipline_coord_multi", "unified_pm_multi", "qc_across_disciplines_multi",
  "resource_sharing_multi", "client_source_multi", "digital_presence_multi", "bottleneck_multi",

  // Closing
  "after_hours", "intake_speed", "investment",
  "success_vision", "anything_else",

  // Score insights (strings)
  "insight_operational", "insight_acquisition", "insight_digital",
  "insight_practice_readiness", "recommended_first_step", "overall_summary",
];

const numberFields = [
  "urgency",
  "score_operational", "score_acquisition", "score_digital",
  "score_practice_readiness", "score_overall",
];

async function findWorkspaceId() {
  // List existing bases to find a workspace ID
  const res = await fetch("https://api.airtable.com/v0/meta/bases", {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Failed to list bases:", res.status, JSON.stringify(data, null, 2));
    process.exit(1);
  }
  const bases = data.bases || [];
  if (bases.length === 0) {
    console.error("No bases found. Create a base manually in Airtable, then pass AIRTABLE_BASE_ID.");
    process.exit(1);
  }
  console.log("Existing bases:");
  bases.forEach(b => console.log(`  - ${b.id}: ${b.name}`));

  // The first base should give us the workspace via the permissionLevel endpoint
  // Actually, bases don't expose workspaceId in list. Try the Enterprise API path.
  // Fallback: use the same workspace as the law firm base
  // For the meta/bases POST, we need to find a workspaceId.
  // Let's try getting it from the base schema endpoint.
  const schemaRes = await fetch(`https://api.airtable.com/v0/meta/bases/${bases[0].id}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const schemaData = await schemaRes.json();
  if (schemaData.workspaceId) {
    console.log(`Found workspace: ${schemaData.workspaceId}`);
    return schemaData.workspaceId;
  }

  // If we can't find workspace, just print bases and exit with instructions
  console.error("\nCould not determine workspace ID automatically.");
  console.error("Alternative: create a base manually in Airtable, then run:");
  console.error(`  $env:AIRTABLE_BASE_ID = "appXXX"  # your new base ID`);
  console.error("  node scripts/create-airtable-table.js");
  process.exit(1);
}

async function createBase() {
  console.log("No AIRTABLE_BASE_ID set — creating new base...");

  const workspaceId = await findWorkspaceId();

  const res = await fetch("https://api.airtable.com/v0/meta/bases", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Architecture Assessment V2",
      workspaceId,
      tables: [{
        name: "Placeholder",
        fields: [{ name: "Name", type: "singleLineText" }],
      }],
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Failed to create base:", res.status, JSON.stringify(data, null, 2));
    process.exit(1);
  }

  console.log(`Base created: ${data.id} ("${data.name}")`);
  return data.id;
}

async function createTable(baseId) {
  const fields = [
    ...textFields.map(name => ({
      name,
      type: "singleLineText",
    })),
    ...numberFields.map(name => ({
      name,
      type: "number",
      options: { precision: 0 },
    })),
  ];

  // Upgrade long text fields
  const longTextIds = ["success_vision", "anything_else", "insight_operational",
    "insight_acquisition", "insight_digital", "insight_practice_readiness",
    "recommended_first_step", "overall_summary"];

  for (const f of fields) {
    if (longTextIds.includes(f.name)) {
      f.type = "multilineText";
    }
  }

  console.log(`Creating table "${TABLE_NAME}" with ${fields.length} fields in base ${baseId}...`);

  const res = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: TABLE_NAME,
      fields,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Failed:", res.status, JSON.stringify(data, null, 2));
    process.exit(1);
  }

  console.log(`Table created: ${data.id}`);
  console.log(`Fields: ${data.fields?.length || 0}`);
  return data;
}

async function main() {
  if (!BASE_ID) {
    BASE_ID = await createBase();
  }

  await createTable(BASE_ID);

  console.log("\n─── NEXT STEPS ───");
  console.log(`1. Update worker/wrangler.toml with AIRTABLE_BASE_ID = "${BASE_ID}"`);
  console.log("2. Set worker secrets:");
  console.log("   npx wrangler secret put AIRTABLE_API_KEY");
  console.log("   npx wrangler secret put CLAUDE_API_KEY");
  console.log("   npx wrangler secret put RESEND_API_KEY");
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
