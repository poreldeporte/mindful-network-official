export default {
  name: 'headingBlock',
  title: 'Heading Block',
  type: 'object',
  fields: [
    {
      name: 'style',
      title: 'Heading Style',
      type: 'string',
      options: {
        list: [
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'text',
      title: 'Heading Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'customId',
      title: 'Custom ID',
      type: 'string',
      description:
        'Custom ID for this heading (optional). If left empty, will auto-generate from text.',
    },
    {
      name: 'tocExclude',
      title: 'Exclude from TOC',
      type: 'boolean',
      description: 'Hide this heading from table of contents',
      default: false,
    },
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'style',
    },
  },
}

