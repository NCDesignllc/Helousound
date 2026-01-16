/**
 * Utility functions for form handling with Netlify Forms
 */

/**
 * Encodes form data for Netlify Forms submission
 * @param {Object} data - Key-value pairs of form data
 * @returns {string} URL-encoded form data string
 */
export const encodeFormData = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};
