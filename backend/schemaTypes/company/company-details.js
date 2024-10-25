export default {
  name: 'companyDetails',
  title: '⚙️ Company Details',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Twitter', value: 'twitter'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Instagram', value: 'instagram'},
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri(),
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
}
