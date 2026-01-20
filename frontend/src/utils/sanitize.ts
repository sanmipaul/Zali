/**
 * @file Utility functions for input sanitization
 * @description Provides functions to sanitize and validate user input to prevent XSS and injection attacks
 * @module utils/sanitize
 */

/**
 * Sanitizes a string input by removing potentially dangerous HTML/JS
 * @param {string} input - The input string to sanitize
 * @returns {string} The sanitized string with HTML/JS removed and special characters escaped
 * 
 * @example
 * // Returns 'Hello &amp;lt;script&amp;gt;'
 * sanitizeString('Hello <script>')
 */
export const sanitizeString = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  // Remove any HTML tags
  const stripped = input.replace(/(<([^>]+)>)/gi, '');
  
  // Escape special characters
  return stripped
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Sanitizes a username according to our requirements
 * @param {string} username - The username to sanitize
 * @returns {string} The sanitized username
 */
export const sanitizeUsername = (username: string): string => {
  if (typeof username !== 'string') return '';
  
  // First sanitize the string
  let sanitized = sanitizeString(username);
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  // Remove any remaining non-alphanumeric characters except underscore
  sanitized = sanitized.replace(/[^a-zA-Z0-9_]/g, '');
  
  // Enforce length constraints
  if (sanitized.length > 20) {
    return sanitized.substring(0, 20);
  }
  
  return sanitized;
};

/**
 * Sanitizes a number input
 * @param {unknown} input - The input to convert to a number
 * @returns {number} The sanitized number
 */
export const sanitizeNumber = (input: unknown): number => {
  if (typeof input === 'number') {
    return isNaN(input) ? 0 : input;
  }
  
  if (typeof input === 'string') {
    const num = parseFloat(input);
    return isNaN(num) ? 0 : num;
  }
  
  return 0;
};

/**
 * Sanitizes an Ethereum address
 * @param {string} address - The Ethereum address to validate
 * @returns {string} The validated address or empty string if invalid
 */
export const sanitizeAddress = (address: string): string => {
  if (typeof address !== 'string') return '';
  
  // Basic Ethereum address validation
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(address) ? address : '';
};
