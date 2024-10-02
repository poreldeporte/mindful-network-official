export default {
  name: 'therapyModality',
  title: '⚙️ Therapy Modality',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'type',
      subtitle: '_id',
    },
  },
}
