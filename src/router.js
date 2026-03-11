/**
 * Router: maps Q5 firm type selection to the correct module.
 * Architecture vertical has 8 modules (A through H), no hybrid picker.
 */
import { QUESTIONS as MODULE_A, MODULE_KEY as KEY_A, MODULE_NAME as NAME_A } from "./questions/moduleA.js";
import { QUESTIONS as MODULE_B, MODULE_KEY as KEY_B, MODULE_NAME as NAME_B } from "./questions/moduleB.js";
import { QUESTIONS as MODULE_C, MODULE_KEY as KEY_C, MODULE_NAME as NAME_C } from "./questions/moduleC.js";
import { QUESTIONS as MODULE_D, MODULE_KEY as KEY_D, MODULE_NAME as NAME_D } from "./questions/moduleD.js";
import { QUESTIONS as MODULE_E, MODULE_KEY as KEY_E, MODULE_NAME as NAME_E } from "./questions/moduleE.js";
import { QUESTIONS as MODULE_F, MODULE_KEY as KEY_F, MODULE_NAME as NAME_F } from "./questions/moduleF.js";
import { QUESTIONS as MODULE_G, MODULE_KEY as KEY_G, MODULE_NAME as NAME_G } from "./questions/moduleG.js";
import { QUESTIONS as MODULE_H, MODULE_KEY as KEY_H, MODULE_NAME as NAME_H } from "./questions/moduleH.js";

const MODULES = {
  A: { key: KEY_A, name: NAME_A, questions: MODULE_A },
  B: { key: KEY_B, name: NAME_B, questions: MODULE_B },
  C: { key: KEY_C, name: NAME_C, questions: MODULE_C },
  D: { key: KEY_D, name: NAME_D, questions: MODULE_D },
  E: { key: KEY_E, name: NAME_E, questions: MODULE_E },
  F: { key: KEY_F, name: NAME_F, questions: MODULE_F },
  G: { key: KEY_G, name: NAME_G, questions: MODULE_G },
  H: { key: KEY_H, name: NAME_H, questions: MODULE_H },
};

/**
 * Get the module for a given route key.
 * @param {string} routeKey - "A" through "H"
 * @returns {{ key: string, name: string, questions: Array }}
 */
export function getModule(routeKey) {
  return MODULES[routeKey] || MODULES["H"];
}
