import dotenv from 'dotenv'

dotenv.config()

export const SanityConfig = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
}
