import { defineConfig } from 'vite';
import path from 'path';

// Minimal Vite config for Studio; keeps Studio build isolated.
export default defineConfig(() => ({
  root: path.resolve(__dirname),
  base: '/studio/',
  resolve: {
    alias: {
      '@studio': path.resolve(__dirname),
    },
  },
  server: {
    port: 3333,
    hmr: true,
  },
}));
