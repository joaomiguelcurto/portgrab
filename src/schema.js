// schema.js
// Defines the common shape every platform connector must convert its data into.

/**
 * @typedef {Object} PortfolioItem
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string[]} tags
 * @property {"instagram"|"artstation"|"behance"|"deviantart"} platform
 * @property {string[]} images
 * @property {string} sourceUrl
 * @property {string} createdAt
 * @property {ItemCuration} [curation] - added by the curation feature
 */

/**
 * @typedef {Object} ItemCuration
 * @property {boolean} pinned
 * @property {"featured"|"default"} [display]
 * @property {string} [groupId]
 */

// Builds one PortfolioItem and fills in defaults for optional fields.
// Throws if a required field is missing.
export function createPortfolioItem(raw) {
  const requiredFields = ['id', 'platform', 'sourceUrl'];
  for (const field of requiredFields) {
    if (!raw[field]) {
      throw new Error(`createPortfolioItem: missing required field "${field}"`);
    }
  }

  return {
    id: raw.id,
    title: raw.title ?? '',
    description: raw.description ?? '',
    tags: raw.tags ?? [],
    platform: raw.platform,
    images: raw.images ?? [],
    sourceUrl: raw.sourceUrl,
    createdAt: raw.createdAt ?? new Date().toISOString(),
  };
}

// Quick check used for tests, not used in normal rendering.
export function isValidPortfolioItem(item) {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.platform === 'string' &&
    typeof item.sourceUrl === 'string' &&
    Array.isArray(item.images) &&
    Array.isArray(item.tags)
  );
}