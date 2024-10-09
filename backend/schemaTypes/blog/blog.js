export default {
  name: 'blog',
  title: '📄 Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Health', value: 'health'},
          {title: 'Mental Health', value: 'mental-health'},
          {title: 'Personal Growth', value: 'personal-growth'},
          {title: 'Anxiety', value: 'anxiety'},
          {title: 'Depression', value: 'depression'},
          {title: 'Mindfulness', value: 'mindfulness'},
          {title: 'Self-care', value: 'self-care'},
          {title: 'Stress Management', value: 'stress-management'},
          {title: 'Emotional Well-being', value: 'emotional-well-being'},
          {title: 'Cognitive Behavioral Therapy', value: 'cbt'},
        ],
      },
    },
    {
      name: 'isInternal',
      title: 'Is Internal',
      type: 'boolean',
      description: 'Check this if the link is internal.',
      default: false,
    },
    {
      name: 'externalLink',
      title: 'Link',
      type: 'url',
      description: 'Provide the link if the post points to an external resource.',
      hidden: ({document}) => document?.isInternal === true,
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: `Some of your visitors cannot see images, 
                be they blind, color-blind, low-sighted; 
                alternative text is of great help for those 
                people that can rely on it to have a good idea of 
                what\'s on your page.`,
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
      ],
      hidden: ({document}) => document?.isInternal === false,
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short summary of the post.',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      fields: [
        {name: 'metaTitle', type: 'string', title: 'Meta Title'},
        {name: 'metaDescription', type: 'text', title: 'Meta Description'},
        {
          name: 'openGraphImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage',
    },
  },
}
