// render/renderItems.test.js
// Checks that renderItems produces the expected HTML structure.
// Run with: node src/render/renderItems.test.js

import { renderItems } from './renderItems.js';
import { applyCuration } from '../curation/applyCuration.js';
 
const fakeItems = [
  { id: 'a1', title: 'Forest Sprite', description: '', tags: [], platform: 'deviantart', images: ['https://example.com/forest.jpg'], sourceUrl: 'url-1', createdAt: '2026-01-01' },
  { id: 'a2', title: 'Title with <script>alert(1)</script>', description: '', tags: [], platform: 'instagram', images: [], sourceUrl: 'url-2', createdAt: '2026-01-02' },
];
 
// Plain rendering, no curation config
const plainSlots = applyCuration(fakeItems, null);
const plainHtml = renderItems(plainSlots);
console.log('Plain: contains pg-grid wrapper?', plainHtml.includes('class="pg-grid"'));
console.log('Plain: contains 2 pg-item cards?', (plainHtml.match(/pg-item/g) || []).length === 2);
console.log('Plain: script tag escaped?', !plainHtml.includes('<script>'));
console.log('Plain: empty case works?', renderItems([]).includes('pg-empty'));
 
// Curated rendering: pin item a1
const curatedSlots = applyCuration(fakeItems, {
  pins: [{ match: 'id', value: 'a1', position: 'top' }],
});
const curatedHtml = renderItems(curatedSlots);
console.log('Pin: pg-pinned class present?', curatedHtml.includes('pg-pinned'));
 
// Curated rendering: group both items
const groupedSlots = applyCuration(fakeItems, {
  groups: [
    {
      label: 'test-group',
      layout: 'stack',
      position: 'top',
      items: [{ match: 'id', value: 'a1' }, { match: 'id', value: 'a2' }],
    },
  ],
});
const groupedHtml = renderItems(groupedSlots);
console.log('Group: pg-group wrapper present?', groupedHtml.includes('pg-group'));
console.log('Group: pg-group--stack class present?', groupedHtml.includes('pg-group--stack'));
