// connectors/artstation.js
// Fetches an artist's public portfolio from ArtStation.
//
// IMPORTANT: this uses an unofficial, undocumented endpoint, ArtStation
// has no official public API. It could change or break without notice.
// It also likely will not work with a direct fetch from a browser due
// to CORS, so in production this must run through the Cloudflare Worker proxy

import { createPortfolioItem } from '../schema.js';

const ROOT = 'https://www.artstation.com';
const MAX_PROJECTS = 24; // keep v1 simple, ill add pagination later, im only using this for testing anyways

// Strips HTML tags from ArtStations description field, which comes
// back as raw HTML rather than plain text.
function stripHtml(html) {
  return String(html ?? '').replace(/<[^>]*>/g, '').trim();
}

// Fetches the list of a user's projects (title/hash_id only, no images yet).
async function fetchProjectList(username) {
  const url = `${ROOT}/users/${encodeURIComponent(username)}/projects.json?album_id=all&page=1`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json, text/plain, */*',
      Origin: ROOT,
    },
  });

  if (!res.ok) {
    throw new Error(`ArtStation project list request failed: ${res.status}`);
  }

  const body = await res.json();
  return body.data.slice(0, MAX_PROJECTS);
}

// Fetches full details (title, description, images) for one project.
async function fetchProjectDetail(hashId) {
  const url = `${ROOT}/projects/${hashId}.json`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json, text/plain, */*',
      Origin: ROOT,
    },
  });

  if (!res.ok) {
    throw new Error(`ArtStation project detail request failed: ${res.status}`);
  }

  return res.json();
}

// Converts one raw project detail object into our normalized shape.
function normalizeProject(detail) {
  const images = (detail.assets ?? [])
    .filter((asset) => asset.has_image && asset.image_url)
    .map((asset) => asset.image_url);

  return createPortfolioItem({
    id: detail.hash_id,
    title: detail.title,
    description: stripHtml(detail.description),
    tags: [], // ArtStation project tags are not included in this endpoint
    platform: 'artstation',
    images,
    sourceUrl: `${ROOT}/artwork/${detail.hash_id}`,
    createdAt: detail.created_at,
  });
}

// Main function other code will call: fetches a full portfolio for one artist.
export async function fetchArtStationPortfolio({ username }) {
  if (!username) {
    throw new Error('fetchArtStationPortfolio requires a username');
  }

  const projectList = await fetchProjectList(username);

  // Fetch full details for every project. Done one at a time (not
  // Promise.all) to avoid hammering ArtStation with a burst of parallel requests.
  const items = [];
  for (const project of projectList) {
    const detail = await fetchProjectDetail(project.hash_id);
    items.push(normalizeProject(detail));
  }

  return items;
}