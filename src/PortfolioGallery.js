// PortfolioGallery.js
// Defines the <portfolio-gallery> custom element.
// Uses light DOM so the artist can target the gallery with their own CSS.

import { renderItems } from './render/renderItems.js';

class PortfolioGallery extends HTMLElement {
  // Items are set as a JS property since attributes can only hold strings and items
  // is an array of objects.
  #items = [];

  get items() {
    return this.#items;
  }

  set items(value) {
    this.#items = value ?? [];
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = renderItems(this.#items);
  }
}

// Guard against re-registering if this file is loaded twice.
if (!customElements.get('portfolio-gallery')) {
  customElements.define('portfolio-gallery', PortfolioGallery);
}

export { PortfolioGallery };