import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schemas';

export default defineConfig({
  name: 'default',
  title: 'Prowess Technologies CMS',

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your_project_id_here',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
