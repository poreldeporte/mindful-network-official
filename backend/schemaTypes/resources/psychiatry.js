import {
  listingFieldsets,
  listingFields,
  listingOrderings,
  listingPreview,
} from '../helpers/listingFields'

export default {
  name: 'psychiatry',
  title: '👨‍⚕️ Psychiatry',
  type: 'document',
  fieldsets: listingFieldsets,
  fields: listingFields(),
  orderings: listingOrderings,
  preview: listingPreview,
}
