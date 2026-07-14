// curation/applyCuration.test.js
// Tests pin and group logic with fake items and a fake curation config.
// Run with: node src/curation/applyCuration.test.js

import { applyCuration } from './applyCuration.js';

const fakeItems = [
  { id: '1', sourceUrl: 'url-1', title: 'Item 1' },
  { id: '2', sourceUrl: 'url-2', title: 'Item 2' },
  { id: '3', sourceUrl: 'url-3', title: 'Item 3' },
  { id: '4', sourceUrl: 'url-4', title: 'Item 4' },
  { id: '5', sourceUrl: 'url-5', title: 'Item 5' },
];

// Test 1: no config, everything should pass through untouched
const noConfigResult = applyCuration(fakeItems, null);
console.log('No config, slot count matches item count?', noConfigResult.length === 5);

// Test 2: pin item 3 to the top as featured
const pinConfig = {
  pins: [{ match: 'id', value: '3', display: 'featured', position: 'top' }],
};
const pinResult = applyCuration(fakeItems, pinConfig);
console.log('Pin: first slot is the pinned item?', pinResult[0].item.id === '3');
console.log('Pin: first slot is featured?', pinResult[0].item.curation.display === 'featured');
console.log('Pin: total slot count still 5 (no duplicates)?', pinResult.length === 5);

// Test 3: group items 1, 2, and 4 into a stack
const groupConfig = {
  groups: [
    {
      label: 'trio',
      layout: 'stack',
      position: 'top',
      items: [
        { match: 'id', value: '1' },
        { match: 'id', value: '2' },
        { match: 'id', value: '4' },
      ],
    },
  ],
};
const groupResult = applyCuration(fakeItems, groupConfig);
console.log('Group: first slot is type group?', groupResult[0].type === 'group');
console.log('Group: group has 3 items?', groupResult[0].items.length === 3);
console.log('Group: total slot count is 3 (1 group + 2 remaining)?', groupResult.length === 3);

// Test 4: pin referencing an item that does not exist should not crash
const badPinConfig = {
  pins: [{ match: 'id', value: 'does-not-exist', position: 'top' }],
};
const badPinResult = applyCuration(fakeItems, badPinConfig);
console.log('Bad pin: does not crash, returns all 5 items untouched?', badPinResult.length === 5);