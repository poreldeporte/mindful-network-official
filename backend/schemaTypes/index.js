import blog from './blog/blog'
import headingBlock from './blog/headingBlock'

import professionals from './professionals/professionals'

import resources from './resources/resources'
import {
  psychologists,
  psychiatry,
  bakerActFacilities,
  innovativeTherapies,
  inpatient,
  mindBodyPractices,
  outpatient,
  mentalHealthLawyers,
  estatePlanningLawyers,
} from './resources'

import companyDetail from './company/company-details'
import ageSpecialties from './age-specialties/ageSpecialties'
import conditionSpecialties from './condition-specialties/conditionSpecialties'
import insurances from './insurances/insurances'
import therapyModalities from './therapy-modalities/therapyModalities'
import user from './user/user'
import usefulLinks from './useful-links/usefulLinks'
import blogCategories from './blog/blogCategories'
import admittedLanguages from './admitted-languages/admittedLanguages'
import redirects from './redirects/redirects'

export const schemaTypes = [
  // Listings
  professionals,
  psychologists,
  psychiatry,
  outpatient,
  inpatient,
  bakerActFacilities,
  innovativeTherapies,
  mindBodyPractices,
  mentalHealthLawyers,
  estatePlanningLawyers,

  // Content
  usefulLinks,
  blog,
  blogCategories,
  headingBlock,

  // Taxonomy
  resources,
  ageSpecialties,
  conditionSpecialties,
  insurances,
  therapyModalities,
  admittedLanguages,

  // Settings
  user,
  companyDetail,
  redirects,
]
