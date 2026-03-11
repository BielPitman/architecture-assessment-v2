import { CONFIG } from "./config.js";

const c = CONFIG.BRAND.color;

export function injectStyles() {
  if (document.getElementById("af-v2-styles")) return;
  const style = document.createElement("style");
  style.id = "af-v2-styles";
  style.textContent = `
    #${CONFIG.ROOT_ID} {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      max-width: 720px;
      margin: 0 auto;
      padding: 0 20px;
      color: ${c.text};
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    #${CONFIG.ROOT_ID} * { box-sizing: border-box; }

    /* Header */
    .af-header {
      text-align: center;
      padding: 32px 0 24px;
    }
    .af-header h1 {
      font-size: 28px;
      font-weight: 700;
      color: ${c.primary};
      margin: 0 0 4px;
    }
    .af-header p {
      font-size: 15px;
      color: ${c.textLight};
      margin: 0;
    }

    /* Progress bar */
    .af-progress-wrap {
      background: ${c.progressBg};
      border-radius: 8px;
      height: 8px;
      margin-bottom: 32px;
      overflow: hidden;
    }
    .af-progress-bar {
      height: 100%;
      background: ${c.accent};
      border-radius: 8px;
      transition: width 0.4s ease;
    }
    .af-progress-text {
      text-align: right;
      font-size: 13px;
      color: ${c.textLight};
      margin-bottom: 8px;
    }

    /* Card */
    .af-card {
      background: ${c.card};
      border: 1px solid ${c.border};
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
      color: ${c.accent};
      margin-bottom: 12px;
    }

    /* Question */
    .af-question {
      font-size: 20px;
      font-weight: 600;
      color: ${c.primary};
      margin: 0 0 8px;
    }
    .af-subtitle {
      font-size: 14px;
      color: ${c.textLight};
      margin: 0 0 24px;
    }

    /* Text input */
    .af-input {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid ${c.border};
      border-radius: 8px;
      outline: none;
      transition: border-color 0.2s;
      font-family: inherit;
      color: ${c.text};
    }
    .af-input:focus {
      border-color: ${c.accent};
    }
    .af-input::placeholder {
      color: #adb5bd;
    }

    /* Textarea */
    .af-textarea {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid ${c.border};
      border-radius: 8px;
      outline: none;
      transition: border-color 0.2s;
      font-family: inherit;
      color: ${c.text};
      min-height: 120px;
      resize: vertical;
    }
    .af-textarea:focus {
      border-color: ${c.accent};
    }

    /* Option buttons (single-select) */
    .af-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .af-option {
      padding: 14px 18px;
      border: 2px solid ${c.border};
      border-radius: 10px;
      cursor: pointer;
      font-size: 15px;
      transition: all 0.2s;
      background: ${c.card};
      text-align: left;
      line-height: 1.4;
    }
    .af-option:hover {
      border-color: ${c.accent};
      background: #fff8f0;
    }
    .af-option.selected {
      border-color: ${c.accent};
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
      border: 2px solid ${c.border};
      background: ${c.card};
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .af-scale-btn:hover {
      border-color: ${c.accent};
      background: #fff8f0;
    }
    .af-scale-btn.selected {
      border-color: ${c.accent};
      background: ${c.accent};
      color: #fff;
    }
    .af-scale-labels {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: ${c.textLight};
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
      background: ${c.accent};
      color: #fff;
    }
    .af-btn-primary:hover {
      background: ${c.accentHover};
    }
    .af-btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .af-btn-secondary {
      background: transparent;
      color: ${c.textLight};
      border: 1px solid ${c.border};
    }
    .af-btn-secondary:hover {
      background: ${c.bg};
    }

    /* Submit button */
    .af-btn-submit {
      background: ${c.primary};
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
      border: 4px solid ${c.border};
      border-top-color: ${c.accent};
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
      background: ${c.bg};
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
      color: ${c.textLight};
      margin-bottom: 8px;
    }
    .af-dim-score {
      font-size: 32px;
      font-weight: 800;
      color: ${c.primary};
      margin-bottom: 4px;
    }
    .af-dim-bar {
      height: 6px;
      background: ${c.progressBg};
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
      color: ${c.textLight};
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
      color: ${c.primary};
    }
    .af-summary-section p, .af-summary-section li {
      font-size: 14px;
      color: ${c.textLight};
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
      color: ${c.text};
      margin: 0 0 20px;
      line-height: 1.5;
    }
    .af-cta p {
      font-size: 14px;
      color: ${c.textLight};
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
  `;
  document.head.appendChild(style);
}
