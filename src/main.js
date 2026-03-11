/**
 * Main entry point for Archificials Architecture Practice AI Readiness Assessment v2.
 * Orchestrates: Core -> Route -> Module -> Closing -> Submit -> Results
 */
import { CONFIG } from "./config.js";
import { state, updateState, setAnswer } from "./state.js";
import { injectStyles } from "./styles.js";
import { CORE_QUESTIONS } from "./questions/core.js";
import { CLOSING_QUESTIONS } from "./questions/closing.js";
import { getModule } from "./router.js";
import {
  setRoot,
  renderSlide,
  renderSubmitting,
  renderResults,
  renderError,
} from "./ui.js";

/**
 * Boot the assessment into the given container element.
 * Called automatically on load - finds #ach-af-v2 or first match.
 */
function mount() {
  const root = document.getElementById(CONFIG.ROOT_ID);
  if (!root) {
    console.warn(`[Archificials V2] Mount element #${CONFIG.ROOT_ID} not found.`);
    return;
  }

  injectStyles();
  setRoot(root);

  updateState({
    phase: "CORE",
    slideIndex: 0,
    slides: CORE_QUESTIONS,
    slideOffset: 0,
    totalAllSlides: 0,
  });

  renderSlide();
  bindNavigation(root);
}

// ─── Navigation controller ──────────────────────────────────────

function bindNavigation(root) {
  root.addEventListener("af-navigate", (e) => {
    const { action } = e.detail;

    if (action === "next") {
      handleNext(root);
    } else if (action === "prev") {
      handlePrev(root);
    } else if (action === "retry") {
      handleRetry(root);
    }
  });
}

function handleNext(root) {
  const slide = state.slides[state.slideIndex];

  // Validate required
  if (slide && slide.required) {
    const answer = state.answers[slide.id];
    if (!answer || answer === "") return;
  }

  // Validate email
  if (slide && slide.type === "email") {
    const email = state.answers[slide.id] || "";
    if (!isValidEmail(email)) return;
  }

  // Check if we're at the end of the current phase
  if (state.slideIndex >= state.slides.length - 1) {
    advancePhase(root);
    return;
  }

  // Normal: advance slide
  updateState({ slideIndex: state.slideIndex + 1 });
  renderSlide();
  scrollToTop();
}

function handlePrev(root) {
  if (state.slideIndex > 0) {
    updateState({ slideIndex: state.slideIndex - 1 });
    renderSlide();
    scrollToTop();
  } else if (state.phase === "CLOSING") {
    // Go back to last module question
    const mod = getModule(state.selectedModule);
    updateState({
      phase: "MODULE",
      slides: mod.questions,
      slideIndex: mod.questions.length - 1,
      slideOffset: 0,
    });
    renderSlide();
    scrollToTop();
  } else if (state.phase === "MODULE") {
    // Go back to last core question
    updateState({
      phase: "CORE",
      slides: CORE_QUESTIONS,
      slideIndex: CORE_QUESTIONS.length - 1,
      slideOffset: 0,
    });
    renderSlide();
    scrollToTop();
  }
}

function handleRetry(root) {
  updateState({
    error: null,
    isSubmitting: false,
  });
  updateState({
    phase: "CLOSING",
    slides: CLOSING_QUESTIONS,
    slideIndex: CLOSING_QUESTIONS.length - 1,
  });
  renderSlide();
}

// ─── Phase transitions ──────────────────────────────────────────

function advancePhase(root) {
  if (state.phase === "CORE") {
    // Route to the correct module based on Q5 answer
    const firmTypeAnswer = state.answers.firm_type;
    const routeKey = getRouteKey(firmTypeAnswer);

    updateState({
      selectedModule: routeKey,
      moduleName: getModule(routeKey).name,
    });

    // Load module questions (progress counter excludes core questions)
    const mod = getModule(routeKey);
    const totalAll = mod.questions.length + CLOSING_QUESTIONS.length;
    updateState({
      phase: "MODULE",
      slides: mod.questions,
      slideIndex: 0,
      slideOffset: 0,
      totalAllSlides: totalAll,
    });
    renderSlide();
    scrollToTop();
  } else if (state.phase === "MODULE") {
    // Move to closing questions (offset = number of module questions)
    updateState({
      phase: "CLOSING",
      slides: CLOSING_QUESTIONS,
      slideIndex: 0,
      slideOffset: state.slides.length,
    });
    renderSlide();
    scrollToTop();
  } else if (state.phase === "CLOSING") {
    submitAssessment(root);
  }
}

// ─── Route key extraction ───────────────────────────────────────

function getRouteKey(firmTypeAnswer) {
  const q5 = CORE_QUESTIONS.find((q) => q.id === "firm_type");
  if (!q5) return "H";

  const match = q5.options.find((opt) => {
    const label = typeof opt === "string" ? opt : opt.label;
    return label === firmTypeAnswer;
  });

  return match && match.route ? match.route : "H";
}

// ─── Submission ─────────────────────────────────────────────────

async function submitAssessment(root) {
  updateState({
    phase: "SUBMITTING",
    isSubmitting: true,
  });
  renderSubmitting();
  scrollToTop();

  try {
    const payload = {
      ...state.answers,
      version: CONFIG.VERSION,
      firm_type: state.moduleName,
      module_key: state.selectedModule,
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(CONFIG.WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Server error (${res.status}): ${text}`);
    }

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    updateState({
      phase: "RESULTS",
      scores: data.scores || data,
      isSubmitting: false,
    });

    renderResults(state.scores);
    scrollToTop();
  } catch (err) {
    console.error("[Archificials V2] Submission error:", err);
    updateState({
      phase: "CLOSING",
      error: err.message,
      isSubmitting: false,
    });
    renderError(
      err.message || "We were unable to process your assessment. Please try again."
    );
  }
}

// ─── Helpers ────────────────────────────────────────────────────

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function scrollToTop() {
  const el = document.getElementById(CONFIG.ROOT_ID);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ─── Auto-mount ─────────────────────────────────────────────────

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
