export { CITIES, CONDITIONS, INSURANCES, LANGUAGES, generateIntro } from "./config";
export type { CityConfig, ConditionConfig, InsuranceConfig, LanguageConfig } from "./config";
export { resolveLandingPageSlug } from "./resolve-slug";
export type { LandingPageParams } from "./resolve-slug";
export { getAllLandingPageSlugs, getProviderCount } from "./generate-pages";
export type { LandingPageSlug } from "./generate-pages";
