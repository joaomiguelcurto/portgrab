// scripts/debug-gallery.js
// Prints the raw response from DeviantArts gallery/all endpoint,
// sending the token as an Authorization header instead of a query param.
// Run with: node --env-file=.env.local src/scripts/debug-gallery.js

const username = 'tonicsky';

const tokenParams = new URLSearchParams({
  client_id: process.env.DEVIANTART_CLIENT_ID,
  client_secret: process.env.DEVIANTART_CLIENT_SECRET,
  grant_type: 'client_credentials',
});
const tokenRes = await fetch(`https://www.deviantart.com/oauth2/token?${tokenParams.toString()}`);
const tokenBody = await tokenRes.json();
const accessToken = tokenBody.access_token;
console.log('Got access token:', Boolean(accessToken));

const galleryParams = new URLSearchParams({
  username,
  limit: '24',
});
const galleryRes = await fetch(
  `https://www.deviantart.com/api/v1/oauth2/gallery/all?${galleryParams.toString()}`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
);
const galleryBody = await galleryRes.json();

console.log('HTTP status:', galleryRes.status);
console.log('Response body:', galleryBody);