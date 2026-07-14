// connectors/deviantart.test.js
// Tests the DeviantArt connector using fake network responses.
// Run with: node src/connectors/deviantart.test.js

import { fetchDeviantArtPortfolio } from './deviantart.js';

const fakeTokenResponse = { access_token: 'focken-123' };

const fakeGalleryResponse = {
  results: [
    {
      deviationid: 'dev-1',
      title: 'Forest Sprite',
      excerpt: 'A digital painting of a forest spirit',
      tags: [{ tag_name: 'fantasy' }, { tag_name: 'digitalpainting' }],
      content: { src: 'https://example.com/forest-sprite.jpg' },
      url: 'https://deviantart.com/artist/art/forest-sprite-1',
      published_time: 1750000000,
    },
    {
      deviationid: 'dev-2',
      title: 'Ocean Dream',
      excerpt: '',
      tags: [],
      content: { src: 'https://example.com/ocean-dream.jpg' },
      url: 'https://deviantart.com/artist/art/ocean-dream-2',
      published_time: 1751000000,
    },
  ],
};

// Tracks whether the gallery request included the right Authorization header.
let galleryRequestHeaders = null;

global.fetch = async (url, options) => {
  const isTokenRequest = url.startsWith('https://www.deviantart.com/oauth2/token');

  if (isTokenRequest) {
    return { ok: true, status: 200, json: async () => fakeTokenResponse };
  }

  galleryRequestHeaders = options?.headers ?? {};
  return { ok: true, status: 200, json: async () => fakeGalleryResponse };
};

const items = await fetchDeviantArtPortfolio({
  username: 'test-artist',
  clientId: 'fake-client-id',
  clientSecret: 'fake-client-secret',
});

console.log('Count:', items.length);
console.log('First item title:', items[0].title);
console.log('First item tags:', items[0].tags);
console.log('Second item tags (should be empty array):', items[1].tags);

const expectedAuthHeader = 'Bearer foken-123';
const gotAuthHeader = galleryRequestHeaders?.Authorization;
console.log(
  'Authorization header sent correctly?',
  gotAuthHeader === expectedAuthHeader,
  `(got: "${gotAuthHeader}")`
);