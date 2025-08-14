export const imageWithAlt = (options = {}) => ({
  type: 'image',
  options: {
    hotspot: true,
    ...options,
  },
  fields: [
    {
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description:
        'Describe the image for accessibility and SEO. This text will be read by screen readers and displayed if the image fails to load.',
      options: {
        isHighlighted: true,
      },
    },
  ],
})

export const imageArrayWithAlt = (options = {}) => ({
  type: 'array',
  of: [imageWithAlt(options)],
  ...options,
})
