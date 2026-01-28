import {
  listingFieldsets,
  listingFields,
  listingOrderings,
  listingPreview,
} from '../helpers/listingFields'

export default {
  name: 'innovativeTherapies',
  title: '👨‍⚕️ Innovative Therapies',
  type: 'document',
  fieldsets: listingFieldsets,
  fields: listingFields(),
  orderings: listingOrderings,
  preview: listingPreview,
}
