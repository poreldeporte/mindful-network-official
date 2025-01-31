import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'The Mindful Network',

  projectId: '3wiy7t9r',
  dataset: 'dev',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
