import {listingFields, listingOrderings, listingPreview} from '../helpers/listingFields'

const professionalFieldsets = [
  {name: 'profile', title: 'Profile Photo', options: {collapsible: true, collapsed: false}},
  {name: 'basics', title: 'Basics', options: {collapsible: true, collapsed: false}},
  {name: 'contact', title: 'Contact', options: {collapsible: true, collapsed: true}},
  {name: 'settings', title: 'Settings', options: {collapsible: true, collapsed: true}},
  {name: 'specialties', title: 'Specialties', options: {collapsible: true, collapsed: true}},
  {name: 'media', title: 'Media', options: {collapsible: true, collapsed: true}},
]

const professionalListingFields = listingFields({
  includeVideoMeta: false,
  insurancesHidden: ({document}) => !document?.showInsurances,
  imageFieldset: 'profile',
  statusFieldset: 'settings',
  includeLastReviewed: false,
})

const fieldsByFieldset = (fieldset) =>
  professionalListingFields.filter((field) => field.fieldset === fieldset)

export default {
  name: 'professionals',
  title: '👨‍⚕️ Professionals',
  type: 'document',
  fieldsets: professionalFieldsets,
  fields: [
    {
      name: 'orderRank',
      title: 'Order Rank',
      type: 'string',
      hidden: true,
    },
    ...fieldsByFieldset('profile'),
    ...fieldsByFieldset('basics'),
    ...fieldsByFieldset('contact'),
    ...fieldsByFieldset('settings'),
    {
      name: 'showInsurances',
      title: 'Show Insurances Section',
      type: 'boolean',
      fieldset: 'settings',
      initialValue: true,
      default: true,
      options: {
        layout: 'switch',
      },
      description: 'Toggle to show/hide the insurances section',
    },
    {
      name: 'resource',
      title: 'Resource Categories',
      type: 'array',
      fieldset: 'specialties',
      of: [{type: 'reference', to: [{type: 'resources'}]}],
    },
    ...fieldsByFieldset('specialties'),
    ...fieldsByFieldset('media'),
  ],
  orderings: listingOrderings,
  preview: listingPreview,
}
