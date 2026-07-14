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
 
// Renders one item as a gallery card. Adds pg-pinned if it was pinned
// by the artists curation config.
function renderCard(item) {
  const image = item.images[0] ?? '';
  const pinnedClass = item.curation?.pinned ? ' pg-pinned' : '';
 
  return `
    <a class="pg-item${pinnedClass}" href="${escapeHtml(item.sourceUrl)}" data-platform="${escapeHtml(item.platform)}" target="_blank" rel="noopener">
      <img class="pg-image" src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" loading="lazy" />
      <div class="pg-caption">${escapeHtml(item.title)}</div>
    </a>
  `;
}
 
// Renders a group as one wrapped block, example a stack of 3 images.
function renderGroup(group) {
  return `
    <div class="pg-group pg-group--${escapeHtml(group.layout)}">
      ${group.items.map(renderCard).join('')}
    </div>
  `;
}
 
// Main export: takes the slots array from applyCuration and returns HTML.
export function renderItems(slots) {
  if (!slots || slots.length === 0) {
    return '<div class="pg-empty">No items to display</div>';
  }
 
  const html = slots
    .map((slot) => (slot.type === 'group' ? renderGroup(slot) : renderCard(slot.item)))
    .join('');
 
  return `<div class="pg-grid">${html}</div>`;
}
