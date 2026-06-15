import type { CityBlock } from "./types";

// City blocks, keyed by CityConfig.slug (see config.ts CITIES). City-specific
// local context. Keep claims general (county, telehealth, surrounding areas) —
// do NOT assert specific neighborhoods, clinics, or facts that could be wrong
// across the many provider pages that reuse a block. Phase 0 pilot: coral-gables,
// weston, fort-lauderdale.
export const CITY_CONTENT: Record<string, CityBlock> = {
	"coral-gables": {
		heading: "Finding care in Coral Gables",
		paragraphs: [
			"Coral Gables sits in the heart of Miami-Dade County, and many therapists here also see clients from neighboring areas like South Miami, Coconut Grove, and greater Miami. Whether you prefer an in-person office visit or the flexibility of telehealth, you'll find providers below who serve the Gables and the surrounding communities.",
		],
	},
	weston: {
		heading: "Finding care in Weston",
		paragraphs: [
			"Weston is in western Broward County, close to Pembroke Pines, Davie, and the wider Fort Lauderdale area. Therapists serving Weston often offer both in-office appointments and secure video sessions, making it easier to fit care around work and family schedules. The providers below see clients in and around Weston.",
		],
	},
	"fort-lauderdale": {
		heading: "Finding care in Fort Lauderdale",
		paragraphs: [
			"Fort Lauderdale is the hub of Broward County, and its therapists serve a broad area that includes Hollywood, Pembroke Pines, and nearby communities. Many providers offer telehealth in addition to in-person sessions, so you can choose what works best for you. Browse the providers below to find care in and around Fort Lauderdale.",
		],
	},
};
