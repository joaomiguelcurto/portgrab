// vite.config.js
// Configures Vites "library mode" to build portgrab for both:
//   - ES module (npm import)
//   - UMD (works as a plain <script> tag)

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'PortGrab', // global variable name when loaded via plain <script> tag
      fileName: (format) => `portgrab.${format}.js`,
      formats: ['es', 'umd'],
    },
  },
});