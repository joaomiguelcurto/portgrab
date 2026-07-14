// render/renderItems.test.js
// Checks that renderItems produces the expected HTML structure.
// Run with: node src/render/renderItems.test.js

import { renderItems } from './renderItems.js';

const fakeItems = [
  {
    id: 'a1',
    title: 'Forest Sprite',
    description: 'desc',
    tags: ['fantasy'],
    platform: 'deviantart',
    images: ['https://example.com/forest.jpg'],
    sourceUrl: 'https://deviantart.com/a/forest',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'a2',
    title: 'Title with <script>alert(1)</script>', // checks escaping works
    description: '',
    tags: [],
    platform: 'instagram',
    images: [],
    sourceUrl: 'https://instagram.com/p/a2',
    createdAt: '2026-01-02T00:00:00.000Z',
  },
];

const html = renderItems(fakeItems);

console.log('Output HTML');
console.log(html);
console.log('Checks');
console.log('Contains pg-grid wrapper?', html.includes('class="pg-grid"'));
console.log('Contains 2 pg-item cards?', (html.match(/class="pg-item"/g) || []).length === 2);
console.log('Has data-platform="deviantart"?', html.includes('data-platform="deviantart"'));
console.log('Script tag was escaped (not executable)?', !html.includes('<script>'));
console.log('Empty case works?', renderItems([]).includes('pg-empty'));