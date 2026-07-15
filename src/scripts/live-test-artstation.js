// scripts/live-test-artstation.js
// Runs the real ArtStation connector against a live username.
// Run with: node src/scripts/live-test-artstation.js

import { fetchArtStationPortfolio } from '../connectors/artstation.js';

const username = 'ngm';

const items = await fetchArtStationPortfolio({ username });

console.log(`Fetched ${items.length} items for ${username}`);
console.log(items.slice(0, 2));