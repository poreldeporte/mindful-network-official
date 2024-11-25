export default {
  name: 'bakerActFacilities',
  title: '👨‍⚕️ Baker Act Facilities',
  type: 'document',
  fields: [
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
      name: 'image',
      title: 'Image',
      description: 'Suggestion: Ensure the image size is under 1MB.',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'video',
      title: 'Video File',
      description: 'Suggestion: Ensure the video size is under 50MB.',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
        {
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
        },
      ],
    },
    {
      name: 'imagesGallery',
      title: 'Images Gallery',
      type: 'array',
      validation: (Rule) => Rule.max(4),
      of: [{type: 'image'}],
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
      name: 'insurances',
      title: 'Insurances',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'insurance'}]}],
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
