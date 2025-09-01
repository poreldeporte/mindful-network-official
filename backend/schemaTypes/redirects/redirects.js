import {FaCheck, FaTimes} from 'react-icons/fa'

export default {
  name: 'redirect',
  title: 'URL Redirects',
  type: 'document',
  fields: [
    {
      name: 'from',
      title: 'From Path',
      type: 'string',
      description: 'The old URL path that should redirect (e.g., /old-blog-post)',
      validation: (Rule) => [
        Rule.required().error('From path is required'),
        Rule.custom((value) => {
          if (!value) return true

          if (!value.startsWith('/')) {
            return 'Path must start with forward slash (/)'
          }

          if (value.includes('?') || value.includes('#')) {
            return 'Path should not contain query parameters (?) or fragments (#)'
          }

          if (value.includes(' ')) {
            return 'Path should not contain spaces'
          }

          return true
        }),
      ],
    },
    {
      name: 'to',
      title: 'To Path',
      type: 'string',
      description:
        'The new URL path to redirect to (e.g., /new-blog-post) or full URL for external redirects',
      validation: (Rule) => [
        Rule.required().error('To path is required'),
        Rule.custom((value) => {
          if (!value) return true

          const isExternalUrl = value.startsWith('http://') || value.startsWith('https://')
          const isInternalPath = value.startsWith('/')

          if (!isExternalUrl && !isInternalPath) {
            return 'Path must start with forward slash (/) for internal paths or http(s):// for external URLs'
          }

          return true
        }),
      ],
    },
    {
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      description: 'Whether this redirect is currently active',
      initialValue: true,
    },
    {
      name: 'redirectType',
      title: 'Redirect Type',
      type: 'string',
      options: {
        list: [
          {title: '301 - Permanent Redirect', value: '301'},
          {title: '302 - Temporary Redirect', value: '302'},
        ],
      },
      initialValue: '301',
      description: '301 for permanent redirects (SEO-friendly), 302 for temporary redirects',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description of why this redirect exists (for internal reference)',
      rows: 3,
    },
    {
      name: 'dateCreated',
      title: 'Date Created',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
    {
      name: 'lastModified',
      title: 'Last Modified',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  orderings: [
    {
      title: 'Created Date, Newest First',
      name: 'dateCreatedDesc',
      by: [{field: 'dateCreated', direction: 'desc'}],
    },
    {
      title: 'From Path A-Z',
      name: 'fromPathAsc',
      by: [{field: 'from', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'from',
      subtitle: 'to',
      isActive: 'isActive',
      redirectType: 'redirectType',
    },
    prepare(selection) {
      const {title, subtitle, isActive, redirectType} = selection
      return {
        title: title,
        subtitle: `→ ${subtitle} (${redirectType})`,
        media: isActive ? FaCheck : FaTimes,
      }
    },
  },
}
