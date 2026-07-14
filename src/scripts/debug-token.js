// scripts/debug-token.js
// Prints the raw response from DeviantArt token endpoint, to see
// exactly what it returns when something goes wrong. (Created this because i was running into some issues...)
// Run with: node --env-file=.env.local src/scripts/debug-token.js

const params = new URLSearchParams({
  client_id: process.env.DEVIANTART_CLIENT_ID,
  client_secret: process.env.DEVIANTART_CLIENT_SECRET,
  grant_type: 'client_credentials',
});

console.log('Using client_id:', process.env.DEVIANTART_CLIENT_ID);
console.log('Client secret loaded?', Boolean(process.env.DEVIANTART_CLIENT_SECRET));

const res = await fetch(`https://www.deviantart.com/oauth2/token?${params.toString()}`);
const body = await res.json();

console.log('HTTP status:', res.status);
console.log('Response body:', body);