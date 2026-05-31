import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name (Lucide)',
      type: 'string',
      description: 'Lucide Icon name, e.g., Video, Printer, Share2, Target, TrendingUp',
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
      title: 'Long Blueprint Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'features',
      title: 'Features/Deliverables',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits/Value Propositions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
