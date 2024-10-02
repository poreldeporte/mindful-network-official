export default {
  name: 'conditionSpecialty',
  title: '⚙️ Condition Specialty',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'id',
    },
  },
}
