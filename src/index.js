// index.js
// The single entry point for the published npm package.
// Anything an artist/developer is meant to import from "portgrab"
// must be exported here.

// Importing this registers the <portfolio-gallery> custom element
// automatically, so plain HTML/CDN users just need the script tag.
import './PortfolioGallery.js';

export { PortfolioGallery } from './PortfolioGallery.js';
export { createPortfolioItem, isValidPortfolioItem } from './schema.js';
export { applyCuration } from './curation/applyCuration.js';
export { fetchDeviantArtPortfolio } from './connectors/deviantart.js';