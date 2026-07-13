// schema.test.js
// Quick manual check that createPortfolioItem.
// Run with: node src/schema.test.js

import { createPortfolioItem, isValidPortfolioItem } from './schema.js';

// Test 1: valid item with all fields
const fullItem = createPortfolioItem({
  id: 'abc123',
  title: 'Forest Sprite',
  description: 'A digital painting of a forest spirit',
  tags: ['fantasy', 'digitalpainting'],
  platform: 'deviantart',
  images: ['https://example.com/image1.jpg'],
  sourceUrl: 'https://deviantart.com/artist/art/forest-sprite-123',
  createdAt: '2026-01-01T00:00:00.000Z',
});
console.log('Full item:', fullItem);
console.log('Valid?', isValidPortfolioItem(fullItem));

// Test 2: item missing optional fields, should fill in defaults
const minimalItem = createPortfolioItem({
  id: 'xyz789',
  platform: 'instagram',
  sourceUrl: 'https://instagram.com/p/xyz789',
});
console.log('Minimal item (defaults filled in):', minimalItem);
console.log('Valid?', isValidPortfolioItem(minimalItem));

// Test 3: item missing a required field, should throw an error
try {
  createPortfolioItem({ title: 'No ID or platform' });
  console.log('ERROR: this should have thrown but did not');
} catch (err) {
  console.log('Correctly threw an error:', err.message);
}