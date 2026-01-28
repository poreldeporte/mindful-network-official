import {
  listingFieldsets,
  listingFields,
  listingOrderings,
  listingPreview,
} from '../helpers/listingFields'

export default {
  name: 'mindBodyPractices',
  title: '👨‍⚕️ Mind Body Practices',
  type: 'document',
  fieldsets: listingFieldsets,
  fields: listingFields(),
  orderings: listingOrderings,
  preview: listingPreview,
}
