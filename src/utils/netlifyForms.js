/**
 * Encodes form data for Netlify Forms submission
 * @param {Object} data - Form data object
 * @returns {string} URL-encoded string
 */
export const encodeFormData = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};
