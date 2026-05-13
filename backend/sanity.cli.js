import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '3wiy7t9r',
    dataset: 'dev',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  studioHost: 'mindful-network',
  deployment: {
    autoUpdates: true,
    appId: 'gsajg4l5pcvf7jus6qa5envr',
  },
})
