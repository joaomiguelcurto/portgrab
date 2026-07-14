// connectors/deviantart.js
// Fetches an artist's public gallery from DeviantArt and normalizes it.

import { createPortfolioItem } from '../schema.js';

const TOKEN_URL = 'https://www.deviantart.com/oauth2/token';
const GALLERY_URL = 'https://www.deviantart.com/api/v1/oauth2/gallery/all';

// Gets a short-lived access token.
// This is DeviantArt's "client credentials" flow, it does not require the artist to log in
async function getAccessToken(clientId, clientSecret) {
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  });

  const res = await fetch(`${TOKEN_URL}?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`DeviantArt token request failed: ${res.status}`);
  }

  const data = await res.json();
  return data.access_token;
}

// Converts one raw DeviantArt "deviation" object into our normalized shape.
function normalizeDeviation(deviation) {
  return createPortfolioItem({
    id: deviation.deviationid,
    title: deviation.title,
    description: deviation.excerpt ?? '',
    tags: deviation.tags ? deviation.tags.map((t) => t.tag_name) : [],
    platform: 'deviantart',
    images: deviation.content ? [deviation.content.src] : [],
    sourceUrl: deviation.url,
    createdAt: deviation.published_time
      ? new Date(deviation.published_time * 1000).toISOString()
      : undefined,
  });
}

// Main function other code will call: fetches a full gallery for one artist.
export async function fetchDeviantArtPortfolio({ username, clientId, clientSecret }) {
  if (!username || !clientId || !clientSecret) {
    throw new Error('fetchDeviantArtPortfolio requires username, clientId, and clientSecret');
  }

  const accessToken = await getAccessToken(clientId, clientSecret);

  const params = new URLSearchParams({
    username,
    access_token: accessToken,
    limit: '24', // DeviantArt's max per request, ill think about adding pagination later
  });

  const res = await fetch(`${GALLERY_URL}?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`DeviantArt gallery request failed: ${res.status}`);
  }

  const data = await res.json();
  return data.results.map(normalizeDeviation);
}