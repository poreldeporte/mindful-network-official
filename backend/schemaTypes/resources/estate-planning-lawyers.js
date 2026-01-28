import {
  listingFieldsets,
  listingFields,
  listingOrderings,
  listingPreview,
} from '../helpers/listingFields'

export default {
  name: 'estatePlanningLawyers',
  title: '👨‍⚕️ Estate Planning Lawyers',
  type: 'document',
  fieldsets: listingFieldsets,
  fields: listingFields(),
  orderings: listingOrderings,
  preview: listingPreview,
}
