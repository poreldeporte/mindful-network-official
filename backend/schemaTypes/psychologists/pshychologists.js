export default {
  name: 'psychologist',
  title: 'Psychologist',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'facility',
      title: 'Facility',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
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
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
