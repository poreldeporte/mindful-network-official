export default {
  name: 'psychologist',
  title: '👨‍⚕️ Psychologist',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
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
      name: 'position',
      title: 'Position',
      type: 'object',
      fields: [
        {name: 'lat', title: 'Latitude', type: 'number'},
        {name: 'lng', title: 'Longitude', type: 'number'},
      ],
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'insurances',
      title: 'Insurances',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'insurance'}]}],
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
