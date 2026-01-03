import {imageWithAlt, imageArrayWithAlt} from '../helpers/imageWithAlt'

export default {
  name: 'professionals',
  title: '👨‍⚕️ Professionals',
  type: 'document',
  fields: [
    {
      name: 'orderRank',
      title: 'Order Rank',
      type: 'string',
      hidden: true,
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (!slug) return true
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)) {
            return "The slug should be in lower case and use hyphens to separate words. Example: 'my-slug-example'"
          }
          return true
        }),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email().error('Please enter a valid email address'),
      description: 'The contact email for the psychologist',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
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
          initialValue: true,
        },
        {
          name: 'tocPosition',
          title: 'TOC Position',
          type: 'string',
          options: {
            list: [
              {title: 'Before content', value: 'before'},
              {title: 'After content', value: 'after'},
              {title: 'Sidebar', value: 'sidebar'},
            ],
          },
          default: 'sidebar',
          initialValue: 'sidebar',
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
      name: 'resource',
      title: 'Resources',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'resources'}]}],
    },
    {
      name: 'image',
      title: 'Image',
      description: 'Suggestion: Ensure the image size is under 1MB.',
      ...imageWithAlt(),
    },
    {
      name: 'video',
      title: 'Video File',
      description: 'Suggestion: Ensure the video size is under 50MB.',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    },
    {
      name: 'imagesGallery',
      title: 'Images Gallery',
      ...imageArrayWithAlt({validation: (Rule) => Rule.max(4)}),
    },
    {
      name: 'facility',
      title: 'Facility',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        {name: 'address', title: 'Address', type: 'string'},
        {name: 'state', title: 'State', type: 'string'},
        {name: 'city', title: 'City', type: 'string'},
        {name: 'zip', title: 'Zip', type: 'string'},
      ],
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'admittedLanguages'}]}],
    },
    {
      name: 'degree',
      title: 'Degree Type',
      type: 'string',
    },
    {
      name: 'showInsurances',
      title: 'Show Insurances Section',
      type: 'boolean',
      initialValue: true,
      default: true,
      options: {
        layout: 'switch',
      },
      description: 'Toggle to show/hide the insurances section',
    },
    {
      name: 'insurances',
      title: 'Insurances',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'insurance'}]}],
      hidden: ({document}) => !document?.showInsurances,
    },
    {
      name: 'slidingScale',
      title: 'Sliding Scale',
      type: 'string',
    },
    {
      name: 'ageSpecialty',
      title: 'Age Specialty',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'ageSpecialty'}]}],
    },
    {
      name: 'conditionSpecialty',
      title: 'Condition Specialty',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'conditionSpecialty'}]}],
    },
    {
      name: 'therapyOptions',
      title: 'Therapy Options',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'therapyModality'}]}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'facility',
      media: 'image',
    },
  },
}
