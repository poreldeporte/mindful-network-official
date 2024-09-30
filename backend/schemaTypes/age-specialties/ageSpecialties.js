export default {
  name: 'ageSpecialty',
  title: '⚙️ Age Specialty',
  type: 'document',
  fields: [
    {
      name: 'age',
      title: 'Age',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'age',
      subtitle: '_id',
    },
  },
}
