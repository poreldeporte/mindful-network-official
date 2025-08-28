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
  FaUser,
  FaBuilding,
} from 'react-icons/fa'

export default defineConfig({
  name: 'default',
  title: 'The Mindful Network',

  projectId: '3wiy7t9r',
  dataset: 'dev',

  plugins: [
    visionTool(),
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Orderable schemas
            orderableDocumentListDeskItem({
              type: 'insurance',
              title: 'Insurances',
              icon: FaShieldAlt,
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'professionals',
              title: 'Professionals',
              icon: FaUserMd,
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'resources',
              title: 'Resources',
              icon: FaBook,
              S,
              context,
            }),

            // Regular schemas
            S.listItem().title('Blog').icon(FaNewspaper).child(S.documentTypeList('blog')),
            S.listItem()
              .title('Blog Categories')
              .icon(FaFolder)
              .child(S.documentTypeList('blogCategories')),
            S.listItem()
              .title('Age Specialties')
              .icon(FaUsers)
              .child(S.documentTypeList('ageSpecialty')),
            S.listItem()
              .title('Condition Specialties')
              .icon(FaStethoscope)
              .child(S.documentTypeList('conditionSpecialty')),
            S.listItem()
              .title('Therapy Modalities')
              .icon(FaBrain)
              .child(S.documentTypeList('therapyModality')),
            S.listItem()
              .title('Admitted Languages')
              .icon(FaLanguage)
              .child(S.documentTypeList('admittedLanguages')),
            S.listItem()
              .title('Useful Links')
              .icon(FaLink)
              .child(S.documentTypeList('usefulLinks')),
            S.listItem().title('User').icon(FaUser).child(S.documentTypeList('user')),
            S.listItem()
              .title('Company Details')
              .icon(FaBuilding)
              .child(S.documentTypeList('companyDetails')),
            S.listItem().title('redirect').icon(FaUser).child(S.documentTypeList('redirect')),
          ])
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
