export default {
  name: 'insurance',
  title: '⚙️ Insurance',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'orderRank',
      title: 'Order Rank',
      type: 'string',
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'id',
    },
  },
}
