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
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description:
        'What kind of offering is this? Only "Modality" entries surface in page titles / meta descriptions for SEO.',
      options: {
        list: [
          {title: 'Modality (therapeutic approach — EMDR, CBT, Hypnotherapy)', value: 'modality'},
          {title: 'Program (level of care — IOP, PHP)', value: 'program'},
          {title: 'Format (session type — Group, Individual)', value: 'format'},
          {title: 'Delivery (mode — In-Person, Virtual)', value: 'delivery'},
        ],
        layout: 'radio',
      },
      initialValue: 'modality',
    },
  ],
  preview: {
    select: {
      title: 'type',
      subtitle: 'category',
    },
  },
}
