// PortfolioGallery.js
// Defines the <portfolio-gallery> custom element.
// Uses light DOM so the artist can target the gallery with their own CSS.

import { renderItems } from './render/renderItems.js';
import { applyCuration } from './curation/applyCuration.js';
 
class PortfolioGallery extends HTMLElement {
  #items = [];
  #curationConfig = null;
 
  get items() {
    return this.#items;
  }
 
  set items(value) {
    this.#items = value ?? [];
    this.render();
  }
 
  // Optional: an artist-authored pin/group config, see applyCuration.js
  get curationConfig() {
    return this.#curationConfig;
  }
 
  set curationConfig(value) {
    this.#curationConfig = value ?? null;
    this.render();
  }
 
  connectedCallback() {
    this.render();
  }
 
  render() {
    const slots = applyCuration(this.#items, this.#curationConfig);
    this.innerHTML = renderItems(slots);
  }
}
 
if (!customElements.get('portfolio-gallery')) {
  customElements.define('portfolio-gallery', PortfolioGallery);
}
 
export { PortfolioGallery };
