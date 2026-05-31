import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Video Production', value: 'video' },
          { title: 'Print Design & Packaging', value: 'design' },
          { title: 'Social Media Strategy', value: 'social' },
          { title: 'Ad Campaigns', value: 'campaigns' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'impactLabel',
      title: 'Impact Label (e.g. increase in VC inbound)',
      type: 'string',
    }),
    defineField({
      name: 'impactValue',
      title: 'Impact Value (e.g. +150%)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Project Showcase Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tags',
      title: 'Service Component Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
