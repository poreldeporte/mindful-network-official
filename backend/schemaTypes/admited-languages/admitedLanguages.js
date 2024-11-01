export default {
  name: 'admitedLanguages',
  title: '⚙️ Admited Languages',
  type: 'document',
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'language',
    },
  },
}
