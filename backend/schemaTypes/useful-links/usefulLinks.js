export default {
  name: 'usefulLinks',
  title: '📄 Support Links',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Link Label',
              type: 'string',
            },
            {
              name: 'type',
              title: 'Link Redirect Type',
              type: 'string',
              options: {
                list: [
                  {title: 'External', value: 'external'},
                  {title: 'Internal', value: 'internal'},
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
