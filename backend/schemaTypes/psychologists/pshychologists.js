export default {
  name: 'psychologist',
  title: 'Psychologist',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      of: [
        {
          type: 'object',
          fields: [
            {name: 'id', title: 'ID', type: 'string'},
            {name: 'name', title: 'Name', type: 'string'},
          ],
        },
      ],
    },
    {
      name: 'ageSpecialty',
      title: 'Age Specialty',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'id', title: 'ID', type: 'string'},
            {name: 'age', title: 'Age', type: 'string'},
          ],
        },
      ],
    },
    {
      name: 'conditionSpecialty',
      title: 'Condition Specialty',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'id', title: 'ID', type: 'string'},
            {name: 'name', title: 'Name', type: 'string'},
          ],
        },
      ],
    },
    {
      name: 'therapyOptions',
      title: 'Therapy Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'id', title: 'ID', type: 'string'},
            {name: 'type', title: 'Type', type: 'string'},
          ],
        },
      ],
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
