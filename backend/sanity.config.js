import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {
  FaUserMd,
  FaShieldAlt,
  FaBook,
  FaNewspaper,
  FaFolder,
  FaUsers,
  FaStethoscope,
  FaBrain,
  FaLanguage,
  FaLink,
  FaExternalLinkAlt,
  FaUser,
  FaBuilding,
} from 'react-icons/fa'

export default defineConfig({
  name: 'default',
  title: 'The Mindful Network',

  projectId: '3wiy7t9r',
  dataset: 'dev',

  document: {
    newDocumentOptions: (prev) =>
      prev.filter((templateItem) => templateItem.schemaType !== 'companyDetails'),
  },

  plugins: [
    visionTool(),
    structureTool({
      structure: (S, context) => {
        const listingOrder = [{field: 'name', direction: 'asc'}]
        const listingItems = (type) => [
          S.listItem()
            .title('All (A-Z)')
            .child(S.documentTypeList(type).defaultOrdering(listingOrder)),
          S.listItem()
            .title('Active')
            .child(
              S.documentList()
                .title('Active')
                .filter('_type == $type && (status == "active" || !defined(status))')
                .params({type})
                .defaultOrdering(listingOrder)
            ),
          S.listItem()
            .title('Inactive')
            .child(
              S.documentList()
                .title('Inactive')
                .filter('_type == $type && status == "inactive"')
                .params({type})
                .defaultOrdering(listingOrder)
            ),
        ]
        const listingMenu = (type, title, icon) =>
          S.listItem()
            .title(title)
            .icon(icon)
            .child(S.list().title(title).items(listingItems(type)))

        const taxonomyOrder = (field) => [{field, direction: 'asc'}]
        const taxonomyMenu = (type, title, icon, orderField, includeManualOrder = false) => {
          const items = [
            S.listItem()
              .title('All (A-Z)')
              .child(S.documentTypeList(type).title(title).defaultOrdering(taxonomyOrder(orderField))),
          ]

          if (includeManualOrder) {
            items.push(
              orderableDocumentListDeskItem({
                type,
                title: 'Manual Order',
                icon,
                S,
                context,
              })
            )
          }

          return S.listItem().title(title).icon(icon).child(S.list().title(title).items(items))
        }

        const professionalsMenu = S.listItem()
          .title('Professionals')
          .icon(FaUserMd)
          .child(
            S.list()
              .title('Professionals')
              .items([
                ...listingItems('professionals'),
                orderableDocumentListDeskItem({
                  type: 'professionals',
                  title: 'Manual Order',
                  icon: FaUserMd,
                  S,
                  context,
                }),
              ])
          )

        return S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Settings')
              .icon(FaBuilding)
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .icon(FaBuilding)
                      .child(S.document().schemaType('companyDetails').documentId('companyDetails')),
                    S.listItem()
                      .title('Company Details (All)')
                      .icon(FaBuilding)
                      .child(S.documentTypeList('companyDetails')),
                    S.listItem()
                      .title('Redirects')
                      .icon(FaExternalLinkAlt)
                      .child(S.documentTypeList('redirect')),
                    S.listItem()
                      .title('Users')
                      .icon(FaUser)
                      .child(S.documentTypeList('user')),
                  ])
              ),
            S.listItem()
              .title('Content')
              .icon(FaNewspaper)
              .child(
                S.list()
                  .title('Content')
                  .items([
                    S.listItem().title('Blog').icon(FaNewspaper).child(S.documentTypeList('blog')),
                    S.listItem()
                      .title('Blog Categories')
                      .icon(FaFolder)
                      .child(S.documentTypeList('blogCategories')),
                    S.listItem()
                      .title('Support Links')
                      .icon(FaLink)
                      .child(S.documentTypeList('usefulLinks')),
                  ])
              ),
            S.listItem()
              .title('Listings')
              .icon(FaUserMd)
              .child(
                S.list()
                  .title('Listings')
                  .items([
                    professionalsMenu,
                    listingMenu('psychologist', 'Psychologists', FaUserMd),
                    listingMenu('psychiatry', 'Psychiatry', FaUserMd),
                    listingMenu('outpatientFacilities', 'Outpatient Facilities', FaBuilding),
                    listingMenu('inpatientFacilities', 'Inpatient Facilities', FaBuilding),
                    listingMenu('bakerActFacilities', 'Baker Act Facilities', FaBuilding),
                    listingMenu('innovativeTherapies', 'Innovative Therapies', FaBrain),
                    listingMenu('mindBodyPractices', 'Mind Body Practices', FaBrain),
                    listingMenu('mentalHealthLawyers', 'Mental Health Lawyers', FaUser),
                    listingMenu('estatePlanningLawyers', 'Estate Planning Lawyers', FaUser),
                  ])
              ),
            S.listItem()
              .title('Taxonomy')
              .icon(FaBook)
              .child(
                S.list()
                  .title('Taxonomy')
                  .items([
                    taxonomyMenu('insurance', 'Insurances', FaShieldAlt, 'name', true),
                    taxonomyMenu('resources', 'Resource Categories', FaBook, 'title', true),
                    S.listItem()
                      .title('Age Specialties')
                      .icon(FaUsers)
                      .child(
                        S.documentTypeList('ageSpecialty').defaultOrdering(
                          taxonomyOrder('age')
                        )
                      ),
                    S.listItem()
                      .title('Condition Specialties')
                      .icon(FaStethoscope)
                      .child(
                        S.documentTypeList('conditionSpecialty').defaultOrdering(
                          taxonomyOrder('name')
                        )
                      ),
                    S.listItem()
                      .title('Therapy Modalities')
                      .icon(FaBrain)
                      .child(
                        S.documentTypeList('therapyModality').defaultOrdering(
                          taxonomyOrder('type')
                        )
                      ),
                    S.listItem()
                      .title('Admitted Languages')
                      .icon(FaLanguage)
                      .child(
                        S.documentTypeList('admittedLanguages').defaultOrdering(
                          taxonomyOrder('language')
                        )
                      ),
                  ])
              ),
          ])
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
