/**
 * UI rendering engine.
 * Builds DOM for each slide type (text, email, single-select, scale, textarea),
 * navigation, progress bar, submitting spinner, and results display.
 */
import { CONFIG } from "./config.js";
import {
  state,
  setAnswer,
  getCurrentSlide,
  getProgress,
  getTotalSlides,
  getGlobalIndex,
} from "./state.js";
import { DIM_IMAGES } from "./dimImages.js";

const R = CONFIG.ROOT_ID;
let root = null;

/** Cache a reference to the mount root. */
export function setRoot(el) {
  root = el;
}

// ─── Slide rendering ───────────────────────────────────────────────

export function renderSlide() {
  const slide = getCurrentSlide();
  if (!slide) return;

  const pct = getProgress();
  const current = getGlobalIndex();
  const total = getTotalSlides();
  const answer = state.answers[slide.id] ?? "";

  const showProgress = state.phase !== "CORE";

  root.innerHTML = `
    <div class="af-header">
      <h1>How AI-Ready Is Your Practice?</h1>
      <p>${CONFIG.BRAND.tagline}</p>
    </div>
    ${showProgress ? `
      <div class="af-progress-text">Question ${current} of ${total}</div>
      <div class="af-progress-wrap">
        <div class="af-progress-bar" style="width:${pct}%"></div>
      </div>
    ` : ""}
    <div class="af-card">
      ${slide.category ? `<span class="af-category">${slide.category}</span>` : ""}
      <h2 class="af-question">${slide.question}</h2>
      ${slide.subtitle ? `<p class="af-subtitle">${slide.subtitle}</p>` : ""}
      <div class="af-answer-area">${renderAnswerArea(slide, answer)}</div>
    </div>
    <div class="af-nav">
      ${current > 1 ? `<button class="af-btn af-btn-secondary" data-action="prev">Back</button>` : `<span></span>`}
      ${renderNextButton(slide, answer)}
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${CONFIG.BRAND.name}</div>
  `;

  bindSlideEvents(slide);
}

function renderAnswerArea(slide, answer) {
  switch (slide.type) {
    case "text":
    case "email":
      return `<input class="af-input" type="${slide.type === "email" ? "email" : "text"}"
        placeholder="${slide.placeholder || ""}" value="${escHtml(answer)}" data-id="${slide.id}" autocomplete="off">`;

    case "textarea":
      return `<textarea class="af-textarea" placeholder="${slide.placeholder || ""}"
        data-id="${slide.id}">${escHtml(answer)}</textarea>`;

    case "single-select":
      return renderOptions(slide, answer);

    case "scale":
      return renderScale(slide, answer);

    default:
      return "";
  }
}

function renderOptions(slide, answer) {
  const opts = slide.options
    .map((opt) => {
      const label = typeof opt === "string" ? opt : opt.label;
      const sel = answer === label ? "selected" : "";
      return `<button class="af-option ${sel}" data-value="${escHtml(label)}">${escHtml(label)}</button>`;
    })
    .join("");
  return `<div class="af-options">${opts}</div>`;
}

function renderScale(slide, answer) {
  const btns = [];
  for (let i = slide.min; i <= slide.max; i++) {
    const sel = answer === String(i) ? "selected" : "";
    btns.push(`<button class="af-scale-btn ${sel}" data-value="${i}">${i}</button>`);
  }
  return `
    <div class="af-scale">${btns.join("")}</div>
    <div class="af-scale-labels">
      <span>${slide.minLabel || ""}</span>
      <span>${slide.maxLabel || ""}</span>
    </div>
  `;
}

function renderNextButton(slide, answer) {
  if (slide.type === "single-select" && slide.autoAdvance) {
    return `<span></span>`;
  }
  const isRequired = slide.required;
  const hasAnswer = answer !== "" && answer !== undefined && answer !== null;
  const disabled = isRequired && !hasAnswer ? "disabled" : "";
  const label = state.slideIndex === getTotalSlides() - 1 ? "Submit" : "Next";
  const cls = label === "Submit" ? "af-btn af-btn-submit" : "af-btn af-btn-primary";
  return `<button class="${cls}" data-action="next" ${disabled}>${label}</button>`;
}

// ─── Slide event binding ───────────────────────────────────────────

function bindSlideEvents(slide) {
  // Text / email
  const input = root.querySelector(".af-input");
  if (input) {
    input.addEventListener("input", () => {
      setAnswer(slide.id, input.value.trim());
      updateNextBtn(slide);
    });
    input.focus();
  }

  // Textarea
  const ta = root.querySelector(".af-textarea");
  if (ta) {
    ta.addEventListener("input", () => {
      setAnswer(slide.id, ta.value.trim());
      updateNextBtn(slide);
    });
    ta.focus();
  }

  // Options (single-select)
  root.querySelectorAll(".af-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-value");
      setAnswer(slide.id, value);

      // Highlight selected
      root.querySelectorAll(".af-option").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");

      // Auto-advance for routing question
      if (slide.autoAdvance) {
        setTimeout(() => {
          const evt = new CustomEvent("af-navigate", { detail: { action: "next" } });
          root.dispatchEvent(evt);
        }, 250);
      } else {
        updateNextBtn(slide);
      }
    });
  });

  // Scale buttons
  root.querySelectorAll(".af-scale-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-value");
      setAnswer(slide.id, value);
      root.querySelectorAll(".af-scale-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      updateNextBtn(slide);
    });
  });

  // Back / Next buttons
  root.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-action");
      root.dispatchEvent(new CustomEvent("af-navigate", { detail: { action } }));
    });
  });

  // Enter key to advance on text inputs
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && input.value.trim()) {
        root.dispatchEvent(new CustomEvent("af-navigate", { detail: { action: "next" } }));
      }
    });
  }
}

function updateNextBtn(slide) {
  const nextBtn = root.querySelector("[data-action='next']");
  if (!nextBtn) return;
  const answer = state.answers[slide.id] ?? "";
  const hasAnswer = answer !== "" && answer !== undefined;
  nextBtn.disabled = slide.required && !hasAnswer;
}

// ─── Submitting spinner ─────────────────────────────────────────

export function renderSubmitting() {
  root.innerHTML = `
    <div class="af-header">
      <h1>How AI-Ready Is Your Practice?</h1>
      <p>${CONFIG.BRAND.tagline}</p>
    </div>
    <div class="af-progress-wrap">
      <div class="af-progress-bar" style="width:100%"></div>
    </div>
    <div class="af-card af-submitting">
      <div class="af-spinner"></div>
      <h2 class="af-question">Analyzing your responses</h2>
      <p class="af-subtitle">We're building your personalized readiness report. This typically takes 15-30 seconds.</p>
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${CONFIG.BRAND.name}</div>
  `;
}

// ─── Results display ────────────────────────────────────────────

export function renderResults(scores) {
  if (!scores || scores.fallback || !scores.overall_score) {
    root.innerHTML = `
      <div class="af-header">
        <h1>Thank You!</h1>
        <p>${state.answers.firm_name || "Your Firm"} &middot; ${state.moduleName || "Assessment"}</p>
      </div>
      <div class="af-card">
        <h2>Your Assessment Has Been Received</h2>
        <p>We're preparing your personalized AI Readiness Report. You'll receive a detailed analysis at <strong>${state.answers.contact_email || "your email"}</strong> shortly.</p>
        <div class="af-cta">
          <a href="${CONFIG.BRAND.website}" class="af-btn af-btn-primary" target="_blank" rel="noopener">
            Schedule Your Strategy Session
          </a>
        </div>
      </div>
      <div class="af-footer">&copy; ${new Date().getFullYear()} ${CONFIG.BRAND.name}</div>
    `;
    return;
  }

  root.innerHTML = `
    <div class="af-header">
      <h1>Your AI Readiness Report</h1>
      <p>${state.answers.firm_name || "Your Firm"} &middot; ${state.moduleName || "Assessment"}</p>
    </div>
    <div class="af-card af-results">
      <div class="af-dimensions">
        ${renderDimension("Operational Efficiency", scores.operational, "operational")}
        ${renderDimension("Client Acquisition", scores.acquisition, "acquisition")}
        ${renderDimension("Digital Visibility", scores.digital, "digital")}
        ${renderDimension("Practice Readiness", scores.practice_readiness, "practice_readiness")}
      </div>

      ${scores.executive_summary ? `
        <div class="af-summary-section">
          <h3>Executive Summary</h3>
          <p>${escHtml(scores.executive_summary)}</p>
        </div>
      ` : ""}

      ${scores.top_opportunities && scores.top_opportunities.length ? `
        <div class="af-summary-section">
          <h3>Top Opportunities</h3>
          <ol>${scores.top_opportunities.map((o) => `<li>${escHtml(o)}</li>`).join("")}</ol>
        </div>
      ` : ""}

      ${scores.recommended_next_steps && scores.recommended_next_steps.length ? `
        <div class="af-summary-section">
          <h3>Recommended Next Steps</h3>
          <ol>${scores.recommended_next_steps.map((s) => `<li>${escHtml(s)}</li>`).join("")}</ol>
        </div>
      ` : ""}

      <div class="af-cta">
        ${scores.cta_line ? `<p class="af-cta-line">${escHtml(scores.cta_line)}</p>` : ""}
        <a href="${CONFIG.BRAND.website}" class="af-btn af-btn-primary" target="_blank" rel="noopener">
          Schedule Your Strategy Session
        </a>
      </div>
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${CONFIG.BRAND.name}</div>
  `;
}

function getBarColor(score) {
  if (score < 30) return "#f4c089";
  if (score < 50) return "#f0a050";
  if (score < 70) return "#e27308";
  if (score < 85) return "#c96407";
  return "#a85206";
}

function renderDimension(name, data, key) {
  if (!data) return "";
  const score = data.score ?? 0;
  const insight = data.insight || "";
  const barColor = getBarColor(score);
  return `
    <div class="af-dim-card">
      ${DIM_IMAGES[key] ? `<img class="af-dim-img" src="${DIM_IMAGES[key]}" alt="${name}">` : ""}
      <div class="af-dim-name">${name}</div>
      <div class="af-dim-score">${score}<span class="af-dim-pct">%</span></div>
      <div class="af-dim-bar">
        <div class="af-dim-fill" style="width:${score}%; background:${barColor}"></div>
      </div>
      ${insight ? `<div class="af-dim-insight">${escHtml(insight)}</div>` : ""}
    </div>
  `;
}

// ─── Error display ──────────────────────────────────────────────

export function renderError(msg) {
  root.innerHTML = `
    <div class="af-header">
      <h1>How AI-Ready Is Your Practice?</h1>
      <p>${CONFIG.BRAND.tagline}</p>
    </div>
    <div class="af-card" style="text-align:center">
      <h2 class="af-question">Something went wrong</h2>
      <p class="af-subtitle">${escHtml(msg)}</p>
      <div style="padding-top:16px">
        <button class="af-btn af-btn-primary" data-action="retry">Try Again</button>
      </div>
    </div>
    <div class="af-footer">&copy; ${new Date().getFullYear()} ${CONFIG.BRAND.name}</div>
  `;
  root.querySelector("[data-action='retry']")?.addEventListener("click", () => {
    root.dispatchEvent(new CustomEvent("af-navigate", { detail: { action: "retry" } }));
  });
}

// ─── Helpers ────────────────────────────────────────────────────

function getTier(score) {
  for (const t of CONFIG.TIERS) {
    if (score < t.max) return t;
  }
  return CONFIG.TIERS[CONFIG.TIERS.length - 1];
}

function escHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
