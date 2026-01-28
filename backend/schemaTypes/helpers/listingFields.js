import {imageArrayWithAlt, imageWithAlt} from './imageWithAlt'

export const listingFieldsets = [
  {name: 'basics', title: 'Basics', options: {collapsible: true, collapsed: false}},
  {name: 'contact', title: 'Contact', options: {collapsible: true, collapsed: true}},
  {name: 'specialties', title: 'Specialties', options: {collapsible: true, collapsed: true}},
  {name: 'media', title: 'Media', options: {collapsible: true, collapsed: true}},
  {name: 'editorial', title: 'Editorial', options: {collapsible: true, collapsed: true}},
]

export const listingOrderings = [
  {
    title: 'Name A-Z',
    name: 'nameAsc',
    by: [{field: 'name', direction: 'asc'}],
  },
  {
    title: 'Recently Updated',
    name: 'updatedDesc',
    by: [{field: '_updatedAt', direction: 'desc'}],
  },
  {
    title: 'City A-Z',
    name: 'cityAsc',
    by: [{field: 'address.city', direction: 'asc'}],
  },
]

export const listingPreview = {
  select: {
    title: 'name',
    facility: 'facility',
    city: 'address.city',
    status: 'status',
    media: 'image',
  },
  prepare({title, facility, city, status, media}) {
    const location = [facility, city].filter(Boolean).join(' | ')
    const statusLabel = status ? `Status: ${status}` : undefined
    const subtitle = [location, statusLabel].filter(Boolean).join(' | ')

    return {
      title,
      subtitle,
      media,
    }
  },
}

const videoMetaFields = [
  {
    name: 'caption',
    type: 'string',
    title: 'Caption',
  },
  {
    name: 'attribution',
    type: 'string',
    title: 'Attribution',
  },
]

const addressField = {
  name: 'address',
  title: 'Address',
  type: 'object',
  fieldset: 'contact',
  fields: [
    {name: 'address', title: 'Address', type: 'string'},
    {name: 'state', title: 'State', type: 'string'},
    {name: 'city', title: 'City', type: 'string'},
    {name: 'zip', title: 'Zip', type: 'string'},
  ],
}

export const listingFields = ({
  includeVideoMeta = true,
  insurancesHidden,
  imageFieldset = 'media',
  statusFieldset = 'editorial',
  includeLastReviewed = true,
} = {}) => {
  const videoField = {
    name: 'video',
    title: 'Video File',
    description: 'Suggestion: Ensure the video size is under 50MB.',
    type: 'file',
    fieldset: 'media',
    options: {
      accept: 'video/*',
    },
  }

  if (includeVideoMeta) {
    videoField.fields = videoMetaFields
  }

  const insurancesField = {
    name: 'insurances',
    title: 'Insurances',
    type: 'array',
    fieldset: 'specialties',
    of: [{type: 'reference', to: [{type: 'insurance'}]}],
  }

  if (insurancesHidden) {
    insurancesField.hidden = insurancesHidden
  }

  const statusField = {
    name: 'status',
    title: 'Status',
    type: 'string',
    fieldset: statusFieldset,
    options: {
      list: [
        {title: 'Active', value: 'active'},
        {title: 'Inactive', value: 'inactive'},
      ],
      layout: 'radio',
    },
    initialValue: 'active',
    validation: (Rule) => Rule.required(),
  }

  const lastReviewedField = {
    name: 'lastReviewed',
    title: 'Last Reviewed',
    type: 'date',
    fieldset: statusFieldset,
    description: 'Use this to track when the listing was last verified.',
  }

  const basicsFields = [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      fieldset: 'basics',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'basics',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (!slug) return true
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)) {
            return "The slug should be in lower case and use hyphens to separate words. Example: 'my-slug-example'"
          }
          return true
        }),
    },
    {
      name: 'facility',
      title: 'Facility',
      type: 'string',
      fieldset: 'basics',
    },
    {
      name: 'degree',
      title: 'Degree Type',
      type: 'string',
      fieldset: 'basics',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      fieldset: 'basics',
    },
  ]

  const contactFields = [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      fieldset: 'contact',
      validation: (Rule) => Rule.email().error('Please enter a valid email address'),
      description: 'The contact email for this listing',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      fieldset: 'contact',
    },
    addressField,
  ]

  const specialtyFields = [
    {
      name: 'languages',
      title: 'Languages',
      type: 'array',
      fieldset: 'specialties',
      of: [{type: 'reference', to: [{type: 'admittedLanguages'}]}],
    },
    insurancesField,
    {
      name: 'slidingScale',
      title: 'Sliding Scale',
      type: 'string',
      fieldset: 'specialties',
    },
    {
      name: 'ageSpecialty',
      title: 'Age Specialty',
      type: 'array',
      fieldset: 'specialties',
      of: [{type: 'reference', to: [{type: 'ageSpecialty'}]}],
    },
    {
      name: 'conditionSpecialty',
      title: 'Condition Specialty',
      type: 'array',
      fieldset: 'specialties',
      of: [{type: 'reference', to: [{type: 'conditionSpecialty'}]}],
    },
    {
      name: 'therapyOptions',
      title: 'Therapy Options',
      type: 'array',
      fieldset: 'specialties',
      of: [{type: 'reference', to: [{type: 'therapyModality'}]}],
    },
  ]

  const mediaFields = [
    {
      name: 'image',
      title: 'Image',
      description: 'Suggestion: Ensure the image size is under 1MB.',
      fieldset: imageFieldset,
      ...imageWithAlt(),
    },
    videoField,
    {
      name: 'imagesGallery',
      title: 'Images Gallery',
      fieldset: 'media',
      ...imageArrayWithAlt({validation: (Rule) => Rule.max(4)}),
    },
  ]

  const editorialFields = [statusField, ...(includeLastReviewed ? [lastReviewedField] : [])]

  return [...basicsFields, ...contactFields, ...specialtyFields, ...mediaFields, ...editorialFields]
}
