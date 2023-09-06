// ==UserScript==
// @name Old Reddit Redirect
// @version      0.1.2
// @description  Redirects you to old.reddit.com
// @author       github.com/richkmls
// @match *://*.reddit.com/*
// @exclude /^https?://[a-z]{2}\.reddit\.com/*
// @exclude *out.reddit.com/*
// @exclude *://*.reddit.com/gallery/*
// @exclude *://*.reddit.com/media*
// @run-at document-start
// @grant        none
// ==/UserScript==

// Enforce strict mode for better code quality
'use strict';

// Function to check if a URL is a reddit.com/gallery URL
function isGalleryUrl(url) {
  return url.startsWith('https://www.reddit.com/gallery/') || url.startsWith('https://old.reddit.com/gallery/');
}

// Function to redirect URLs as needed
function redirectUrl() {
  const currentUrl = window.location.href;

  // Check if the current URL is a gallery URL
  if (isGalleryUrl(currentUrl)) {
    // Redirect to the equivalent URL on www.reddit.com
    const newUrl = currentUrl.replace('https://old.reddit.com/gallery/', 'https://www.reddit.com/gallery/');
    window.location.replace(newUrl);
  } else {
    // Declare constant for old reddit URL
    const oldRedditUrl = 'https://old.reddit.com/';

    // Check if the current URL does not include old.reddit.com
    if (!currentUrl.includes('old.reddit.com')) {
      // Use regex literal and constant for new URL
      const newUrl = currentUrl.replace(/^https?:\/\/(www\.)?reddit.com\//, oldRedditUrl);

      // Redirect to new URL without history entry
      window.location.replace(newUrl);
    }
  }
}

// Call the redirectUrl function on document start
redirectUrl();
