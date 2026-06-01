import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // Prevent Sanity Studio packages from being pre-bundled or included
    optimizeDeps: {
      exclude: [
        'sanity',
        '@sanity/vision',
        'sanity/desk',
        'sanity/router'
      ]
    },
    // Treat Sanity Studio packages as external during the site build
    build: {
      rollupOptions: {
        external: [
          'sanity',
          '@sanity/vision',
          'sanity/desk',
          'sanity/router'
        ]
      }
    },
    // Ensure SSR also treats these deps as external (if SSR is used)
    ssr: {
      external: [
        'sanity',
        '@sanity/vision',
        'sanity/desk',
        'sanity/router'
      ]
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
