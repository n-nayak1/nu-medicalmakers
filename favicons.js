
(function injectFavicons(){
  // Optional: include a minimal fallback immediately so the tab icon shows even if JS is slow.
  if (!document.querySelector('link[rel="icon"]')) {
    const fallback = document.createElement('link');
    fallback.rel = 'icon';
    fallback.href = '/images/favicons/favicon.ico';
    document.head.appendChild(fallback);
  }

  // Fetch and inject the full snippet
  fetch('favicons.html')
    .then(r => r.text())
    .then(html => {
      // Avoid duplicates if you ever call this twice
      if (!document.querySelector('link[href*="/images/favicons/"]')) {
        document.head.insertAdjacentHTML('beforeend', html);
      }
    })
    .catch(()=>{/* silently ignore */});
})();
