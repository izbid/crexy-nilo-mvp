// Try to load the new scoped PostCSS plugin for Tailwind if available.
// If it's not installed (some registries or Tailwind versions), fall back
// to requiring `tailwindcss` directly so builds continue to work.
let tailwindPostcss;
try {
  tailwindPostcss = require('@tailwindcss/postcss');
} catch (e) {
  // fallback to legacy tailwindcss plugin if scoped package isn't available
  tailwindPostcss = require('tailwindcss');
}

module.exports = {
  plugins: [
    tailwindPostcss,
    require('autoprefixer'),
  ],
}


