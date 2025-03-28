import debounceAndThrottle from "./debounce-and-throttle";
import deepEqualAndClone from "./deep-equal-and-clone";
import promiseUtils from "./promise-utils";
import arrayUtils from "./array-utils";
import objectArrayUtils from "./object-array-utils";
import jsLanguageUtils from "./js-language-utils";
import domUtils from "./dom-utils";

/**
 * Collection of all utility hooks and functions grouped by category
 * @typedef {Object} UtilityCategory
 * @property {string} description - Description of the category
 * @property {Array<UtilityModule>} files - Array of utility modules in this category
 *
 * @typedef {Object} UtilityModule
 * @property {string} title - Title of the utility module
 * @property {string} description - Description of the utility module
 * @property {Array<UtilityFunction>} files - Functions in this module
 */
const utilityHooks = {
  Performance: {
    description:
      "Functions for optimizing performance and handling rate-limiting",
    files: [debounceAndThrottle],
  },
  "Data Manipulation": {
    description:
      "Utilities for working with objects, arrays, and data structures",
    files: [deepEqualAndClone, arrayUtils, objectArrayUtils],
  },
  "Async & Promises": {
    description: "Functions for async operations and promise handling",
    files: [promiseUtils],
  },
  "JavaScript Core": {
    description:
      "Custom implementations of JavaScript core features and methods",
    files: [jsLanguageUtils],
  },
  "DOM & Browser": {
    description: "Utilities for DOM manipulation and browser interactions",
    files: [domUtils],
  },
  // Additional categories can be added as more utility files are created
};

export default utilityHooks;

// Named exports for direct use of individual utilities
export {
  debounceAndThrottle,
  deepEqualAndClone,
  promiseUtils,
  arrayUtils,
  objectArrayUtils,
  jsLanguageUtils,
  domUtils,
};
