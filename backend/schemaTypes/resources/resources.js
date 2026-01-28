export default {
  name: 'resources',
  title: '⚙️ Resource Categories',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      title: 'title',
    },
  },
}
