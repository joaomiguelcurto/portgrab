// connectors/artstation.test.js
// Tests the ArtStation connector using fake network responses.
// Run with: node src/connectors/artstation.test.js

import { fetchArtStationPortfolio } from './artstation.js';

const fakeProjectList = {
  data: [
    { hash_id: 'proj-1' },
    { hash_id: 'proj-2' },
  ],
  total_count: 2,
};

const fakeProjectDetails = {
  'proj-1': {
    hash_id: 'proj-1',
    title: 'Cyber City',
    description: '<p>A <strong>neon</strong> cityscape</p>',
    created_at: '2026-02-01T00:00:00.000Z',
    assets: [
      { has_image: true, image_url: 'https://example.com/cyber-1.jpg' },
      { has_image: true, image_url: 'https://example.com/cyber-2.jpg' },
      { has_image: false, image_url: null }, // for example a video asset, should be skipped
    ],
  },
  'proj-2': {
    hash_id: 'proj-2',
    title: 'Desert Ruins',
    description: '',
    created_at: '2026-02-05T00:00:00.000Z',
    assets: [],
  },
};

global.fetch = async (url) => {
  if (url.includes('/projects.json')) {
    return { ok: true, status: 200, json: async () => fakeProjectList };
  }

  const hashId = url.split('/projects/')[1].replace('.json', '');
  return { ok: true, status: 200, json: async () => fakeProjectDetails[hashId] };
};

const items = await fetchArtStationPortfolio({ username: 'test-artist' });

console.log('Count:', items.length);
console.log('First item title:', items[0].title);
console.log('HTML stripped from description?', items[0].description === 'A neon cityscape');
console.log('Only has_image assets included?', items[0].images.length === 2);
console.log('sourceUrl built correctly?', items[0].sourceUrl === 'https://www.artstation.com/artwork/proj-1');
console.log('Empty assets handled?', items[1].images.length === 0);