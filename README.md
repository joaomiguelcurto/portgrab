# PortGrab

A free, zero-backend JavaScript library that pulls an artist's work from DeviantArt (with more platforms planned) and hands it to their website as clean, normalized data. Full creative freedom over how it's displayed.

## Why

Artists spread their work across multiple platforms and hate manually re-uploading everything to their personal site. PortGrab is a small library you drop into your existing website that fetches your work live and gives you clean data to display however you want. It does not dictate layout or styling.

## Current status

DeviantArt is the only platform connector working right now. Instagram and ArtStation are on hold, more details are in the project spec.

## Install

Using npm:

```bash
npm install portgrab
```

Using a CDN, no build step needed:

```html
<script src="https://cdn.jsdelivr.net/npm/portgrab"></script>
```

## Basic usage

With npm and React or a similar framework:

```jsx
import { PortfolioGallery } from 'portgrab';

<PortfolioGallery
  platforms={{
    deviantart: { username: 'artist-deviantart-name' },
  }}
/>
```

With plain HTML:

```html
<portfolio-gallery data-deviantart-username="artist-deviantart-name"></portfolio-gallery>
```

## Styling

PortGrab renders using plain, unstyled DOM elements with predictable class names, so you can style everything yourself. Common values can be adjusted with CSS variables:

```css
portfolio-gallery {
  --pg-gap: 24px;
  --pg-border-radius: 8px;
  --pg-bg: #111;
  --pg-caption-color: #eee;
}
```

For full control over layout, deep styling with class names such as .pg-item, .pg-image and .pg-caption is also supported.

## Manual curation

You can pin specific pieces to display them in a specific way, or group several pieces together into one visual cluster. See the project spec for the full curation config format.

## License

MIT