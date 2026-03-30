/**
 * GitHub Pages Configuration
 * Handles relative paths and routing for GitHub Pages deployment
 */

// Detect if running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// Get the repository name from the URL if on GitHub Pages
// Format: https://username.github.io/repo-name/
let repoPath = '';
if (isGitHubPages) {
  const pathparts = window.location.pathname.split('/').filter(part => part);
  if (pathparts.length > 0) {
    repoPath = '/' + pathparts[0];
  }
}

/**
 * Get the base path for all navigation
 * On GitHub Pages: /repo-name/
 * On local/production: /
 */
function getBasePath() {
  return repoPath || '/';
}

/**
 * Convert a page name to a full path
 * @param {string} pageName - Page name (e.g., 'home', 'card', 'documents')
 * @returns {string} Full path (e.g., '/repo-name/home.html' or '/home.html')
 */
function getPagePath(pageName) {
  const basePath = getBasePath();
  // Handle if pageName already includes .html
  const fileName = pageName.endsWith('.html') ? pageName : `${pageName}.html`;
  return `${basePath}${fileName}`;
}

/**
 * Navigate to a page with GitHub Pages compatibility
 * @param {string} pageName - Page name
 * @param {string} topState - Optional top state
 * @param {string} bottomState - Optional bottom state
 */
function navigateToPage(pageName, topState = null, bottomState = null) {
  if (topState) {
    localStorage.setItem('top', topState);
  }
  if (bottomState) {
    localStorage.setItem('bottom', bottomState);
  }
  
  const path = getPagePath(pageName);
  const params = new URLSearchParams(window.location.search);
  window.location.href = `${path}?${params}`;
}

/**
 * Backward compatible sendTo function
 * Replaces the old sendTo function in bar.js
 */
function sendTo(pageName, topState = null, bottomState = null) {
  navigateToPage(pageName, topState, bottomState);
}

// Store config globally
window.ghPagesConfig = {
  isGitHubPages,
  repoPath,
  getBasePath,
  getPagePath,
  navigateToPage,
  sendTo
};
