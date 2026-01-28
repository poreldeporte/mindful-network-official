import {
  listingFieldsets,
  listingFields,
  listingOrderings,
  listingPreview,
} from '../helpers/listingFields'

export default {
  name: 'psychologist',
  title: '👨‍⚕️ Psychologist',
  type: 'document',
  fieldsets: listingFieldsets,
  fields: listingFields({includeVideoMeta: false}),
  orderings: listingOrderings,
  preview: listingPreview,
}
