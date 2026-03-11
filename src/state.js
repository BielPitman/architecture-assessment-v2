/**
 * Simple reactive state manager for the assessment.
 * No framework dependency - just a plain object with change listeners.
 */

const listeners = [];

export const state = {
  // Flow control
  phase: "CORE",        // CORE | MODULE | CLOSING | SUBMITTING | RESULTS
  slideIndex: 0,        // Current slide index within the active question set
  slides: [],           // The assembled question array for the current path

  // Routing
  selectedModule: null,  // Module key: "A" through "H"
  moduleName: "",        // Display name: "Solo Practitioner / Micro Studio"

  // Answers
  answers: {},           // All collected answers keyed by question id

  // Results (returned from Worker)
  scores: null,
  error: null,

  // Global progress tracking (across all phases)
  slideOffset: 0,       // Number of questions completed in prior phases
  totalAllSlides: 0,    // Total questions across all phases (module + closing)

  // UI state
  isSubmitting: false,
};

export function updateState(partial) {
  Object.assign(state, partial);
  listeners.forEach((fn) => fn(state));
}

export function onStateChange(fn) {
  listeners.push(fn);
}

export function setAnswer(id, value) {
  state.answers[id] = value;
  listeners.forEach((fn) => fn(state));
}

export function getTotalSlides() {
  return state.totalAllSlides || state.slides.length;
}

export function getGlobalIndex() {
  return state.slideOffset + state.slideIndex + 1;
}

export function getCurrentSlide() {
  return state.slides[state.slideIndex] || null;
}

export function getProgress() {
  const total = state.totalAllSlides || state.slides.length;
  if (total === 0) return 0;
  return Math.round(((state.slideOffset + state.slideIndex + 1) / total) * 100);
}
