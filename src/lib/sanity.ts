import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

// Check if project ID is defined and not set to the placeholder
export const isSanityConfigured = 
  !!projectId && 
  projectId !== 'your_project_id_here' && 
  projectId.trim() !== '';

export const client = createClient({
  projectId: isSanityConfigured ? projectId : 'dummy-project-id',
  dataset: dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = createImageUrlBuilder().withConfig({ client });

export function urlFor(source: any) {
  if (!source) return '';
  return builder.image(source).url();
}
