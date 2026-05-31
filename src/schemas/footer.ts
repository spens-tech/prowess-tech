import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Footer Tagline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Physical Office Address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string', description: 'e.g. Globe, Instagram, Play, LinkedIn' },
            { name: 'url', title: 'URL', type: 'string' },
          ],
        },
      ],
    }),
  ],
});
