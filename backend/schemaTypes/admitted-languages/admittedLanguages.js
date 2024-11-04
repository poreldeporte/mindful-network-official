export default {
  name: 'admittedLanguages',
  title: '⚙️ Admitted Languages',
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
