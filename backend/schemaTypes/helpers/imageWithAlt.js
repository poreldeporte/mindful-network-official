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
    {
      name: 'fit',
      title: 'Display fit',
      type: 'string',
      description:
        'How this image fits the gallery tile. Use "Contain" for logos or anything where the entire image must remain visible (letterboxed). Default is "Cover", which crops to fill — best for portraits.',
      options: {
        list: [
          {title: 'Cover — crop to fill tile (default, best for portraits)', value: 'cover'},
          {title: 'Contain — letterbox, no crop (best for logos)', value: 'contain'},
        ],
        layout: 'radio',
      },
      initialValue: 'cover',
    },
  ],
})

export const imageArrayWithAlt = (options = {}) => ({
  type: 'array',
  of: [imageWithAlt(options)],
  ...options,
})
