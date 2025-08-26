import {imageWithAlt} from '../helpers/imageWithAlt'

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
      ...imageWithAlt(),
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
      type: 'reference',
      to: [{type: 'blogCategories'}],
      validation: (Rule) => Rule.required(),
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
      name: 'tocSettings',
      title: '📚 Table of Contents Settings',
      type: 'object',
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
      name: 'content',
      title: 'Content',
      type: 'array',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short summary of the post.',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      ...imageWithAlt(),
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
