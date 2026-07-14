// render/renderItems.js
// Turns an array of PortfolioItems into an HTML string.
// Kept separate from the Web Component so it can be tested on its own,
// without needing a browser DOM.

// Escapes text so item titles/descriptions cant break the HTML
// or inject scripts if a platform ever returns unexpected characters. (deviantart does this with some titles using "&")
function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

// Renders a single item as one gallery card.
// Class names and data-platform match what the spec promises artists
// for custom CSS targeting.
function renderItem(item) {
  const image = item.images[0] ?? '';

  return `
    <a class="pg-item" href="${escapeHtml(item.sourceUrl)}" data-platform="${escapeHtml(item.platform)}" target="_blank" rel="noopener">
      <img class="pg-image" src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" loading="lazy" />
      <div class="pg-caption">${escapeHtml(item.title)}</div>
    </a>
  `;
}

// Main export: takes the full items array, returns the full gallery HTML.
export function renderItems(items) {
  if (!items || items.length === 0) {
    return '<div class="pg-empty">No items to display</div>';
  }

  return `<div class="pg-grid">${items.map(renderItem).join('')}</div>`;
}