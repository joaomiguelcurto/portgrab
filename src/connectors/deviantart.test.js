// connectors/deviantart.test.js
// Tests DeviantArt connector using fake network responses.
// Run with: node src/connectors/deviantart.test.js

import { fetchDeviantArtPortfolio } from './deviantart.js';

// Fake responses simulating real DeviantArt API responses.
const fakeTokenResponse = { access_token: 'lmao-token-123' };

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

// Replaces the global fetch function with a fake.
global.fetch = async (url) => {
  const isTokenRequest = url.startsWith('https://www.deviantart.com/oauth2/token');
  const body = isTokenRequest ? fakeTokenResponse : fakeGalleryResponse;

  return {
    ok: true,
    status: 200,
    json: async () => body,
  };
};

const items = await fetchDeviantArtPortfolio({
  username: 'test-artist',
  clientId: 'fake-client-id',
  clientSecret: 'fake-client-secret',
});

console.log('Fetched items:', items);
console.log('Count:', items.length);
console.log('First item title:', items[0].title);
console.log('First item tags:', items[0].tags);
console.log('Second item tags (should be empty array):', items[1].tags);