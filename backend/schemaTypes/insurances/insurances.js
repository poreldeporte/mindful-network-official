export default {
  name: 'insurance',
  title: '⚙️ Insurance',
  type: 'document',
  fields: [
    {
      name: 'orderRank',
      title: 'Order Rank',
      type: 'string',
      hidden: true,
    },
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
