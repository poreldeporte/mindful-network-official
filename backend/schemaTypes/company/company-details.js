import {imageWithAlt} from '../helpers/imageWithAlt'

export default {
  name: 'companyDetails',
  title: '⚙️ Company Details',
  type: 'document',
  fieldsets: [
    {name: 'branding', title: 'Branding', options: {collapsible: true, collapsed: false}},
    {name: 'contact', title: 'Contact', options: {collapsible: true, collapsed: false}},
    {name: 'social', title: 'Social', options: {collapsible: true, collapsed: true}},
    {name: 'homepage', title: 'Homepage', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    {
      name: 'logo',
      title: 'Image Company Logo',
      description: 'Suggestion: Ensure the image size is under 1MB. Logo for topbar and footer',
      fieldset: 'branding',
      ...imageWithAlt(),
    },
    {
      name: 'address',
      title: 'Company Address',
      type: 'string',
      fieldset: 'contact',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      fieldset: 'contact',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      fieldset: 'contact',
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      fieldset: 'social',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Twitter', value: 'twitter'},
                  {title: 'Linkedin', value: 'linkedin'},
                  {title: 'Instagram', value: 'instagram'},
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri(),
            },
          ],
        },
      ],
    },
    {
      name: 'heroBackground',
      title: 'Hero Background Media',
      description:
        'Choose between image or video for the hero section background. Images: under 1MB, recommended 1920x1080 .webp format. Videos: under 10MB, recommended MP4 format.',
      type: 'object',
      fieldset: 'homepage',
      fields: [
        {
          name: 'mediaType',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              {title: 'Image', value: 'image'},
              {title: 'Video', value: 'video'},
            ],
            layout: 'radio',
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'image',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({parent}) => parent?.mediaType !== 'image',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              if (context.parent?.mediaType === 'image' && !value) {
                return 'Image is required when media type is image'
              }
              return true
            }),
        },
        {
          name: 'video',
          title: 'Background Video',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          hidden: ({parent}) => parent?.mediaType !== 'video',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              if (context.parent?.mediaType === 'video' && !value) {
                return 'Video is required when media type is video'
              }
              return true
            }),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'eventsSection',
      title: 'Events Section',
      description: 'Configure the title and subtitle for the Events section',
      type: 'object',
      fieldset: 'homepage',
      fields: [
        {
          name: 'title',
          title: 'Events Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Events Section Subtitle',
          type: 'text',
          rows: 3,
        },
      ],
    },
    {
      name: 'blogsSection',
      title: 'Blogs Section',
      description: 'Configure the title and subtitle for the Blogs section',
      type: 'object',
      fieldset: 'homepage',
      fields: [
        {
          name: 'title',
          title: 'Blogs Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Blogs Section Subtitle',
          type: 'text',
          rows: 3,
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'email',
    },
  },
}
