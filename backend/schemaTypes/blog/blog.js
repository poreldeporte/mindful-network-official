import {imageWithAlt} from '../helpers/imageWithAlt'

export default {
  name: 'blog',
  title: '📄 Blog',
  type: 'document',
  fieldsets: [
    {name: 'basics', title: 'Basics', options: {collapsible: true, collapsed: false}},
    {name: 'content', title: 'Content', options: {collapsible: true, collapsed: false}},
    {name: 'media', title: 'Media', options: {collapsible: true, collapsed: true}},
    {name: 'seo', title: 'SEO', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'basics',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'basics',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isInternal',
      title: 'Is Internal',
      type: 'boolean',
      fieldset: 'basics',
      description: 'Check this if the link is internal.',
      default: false,
    },
    {
      name: 'externalLink',
      title: 'Link',
      type: 'url',
      fieldset: 'basics',
      description: 'Provide the link if the post points to an external resource.',
      hidden: ({document}) => document?.isInternal === true,
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      fieldset: 'basics',
      to: [{type: 'blogCategories'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      fieldset: 'basics',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      fieldset: 'basics',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      fieldset: 'basics',
      description: 'A short summary of the post.',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      fieldset: 'basics',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      fieldset: 'content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
            {title: 'H6', value: 'h6'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in new tab',
                    default: false,
                  },
                ],
              },
            ],
          },
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
                what\'s on the page.`,
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
      name: 'tocSettings',
      title: '📚 Table of Contents Settings',
      type: 'object',
      fieldset: 'content',
      fields: [
        {
          name: 'enableTOC',
          title: 'Enable Table of Contents',
          type: 'boolean',
          description: 'Generate automatic TOC from headings',
          default: true,
        },
        {
          name: 'tocPosition',
          title: 'TOC Position',
          type: 'string',
          options: {
            list: [
              {title: 'Before content', value: 'before'},
              {title: 'After content', value: 'after'},
              {title: 'Floating', value: 'floating'},
            ],
          },
          default: 'before',
        },
        {
          name: 'includeLevels',
          title: 'Include Heading Levels',
          type: 'array',
          of: [{type: 'string'}],
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
          default: ['h1', 'h2', 'h3'],
          description: 'Which heading levels to include in TOC',
        },
      ],
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      fieldset: 'media',
      ...imageWithAlt(),
    },
    {
      name: 'authorImage',
      title: 'Author Image',
      fieldset: 'media',
      ...imageWithAlt(),
    },
    {
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      fieldset: 'seo',
      fields: [
        {name: 'metaTitle', type: 'string', title: 'Meta Title'},
        {name: 'metaDescription', type: 'text', title: 'Meta Description'},
        {
          name: 'openGraphImage',
          title: 'Open Graph Image',
          ...imageWithAlt(),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      media: 'featuredImage',
    },
  },
}
