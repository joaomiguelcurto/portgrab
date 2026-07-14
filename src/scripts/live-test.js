// scripts/live-test.js
// Runs the real DeviantArts connector against a live username.
// Run with: node --env-file=.env.local src/scripts/live-test.js

import { fetchDeviantArtPortfolio } from '../connectors/deviantart.js';

const username = 'tonicsky';

const items = await fetchDeviantArtPortfolio({
  username,
  clientId: process.env.DEVIANTART_CLIENT_ID,
  clientSecret: process.env.DEVIANTART_CLIENT_SECRET,
});

console.log(`Fetched ${items.length} items for ${username}`);
console.log(items.slice(0, 2)); // prints the first 2 items (quick sanity check)