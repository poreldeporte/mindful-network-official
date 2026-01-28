import {
  listingFieldsets,
  listingFields,
  listingOrderings,
  listingPreview,
} from '../helpers/listingFields'

export default {
  name: 'outpatientFacilities',
  title: '👨‍⚕️ Outpatient Facilities',
  type: 'document',
  fieldsets: listingFieldsets,
  fields: listingFields(),
  orderings: listingOrderings,
  preview: listingPreview,
}
