export { CITIES, CONDITIONS, INSURANCES, LANGUAGES, VIRTUAL_SLUG, VIRTUAL_MODALITY, generateIntro } from "./config";
export type { CityConfig, ConditionConfig, InsuranceConfig, LanguageConfig } from "./config";
export { resolveLandingPageSlug } from "./resolve-slug";
export type { LandingPageParams } from "./resolve-slug";
export { getAllLandingPageSlugs, computeLandingPageSlugs, getProviderCount, getRelatedSlugs } from "./generate-pages";
export type { LandingPageSlug, RelatedLink } from "./generate-pages";
