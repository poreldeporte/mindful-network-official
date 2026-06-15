import type { CityBlock } from "./types";

// City blocks, keyed by CityConfig.slug (see config.ts CITIES). City-specific
// local context. Keep claims GENERAL (county, telehealth, neighboring areas) —
// do NOT assert specific neighborhoods, clinics, or facts that could be wrong
// across the many provider pages that reuse a block.
export const CITY_CONTENT: Record<string, CityBlock> = {
	miami: {
		heading: "Finding care in Miami",
		paragraphs: [
			"Miami is the largest city in South Florida and one of the most diverse, and its therapists reflect that — including many bilingual and culturally attuned providers. Whether you're looking for an in-person office across Miami-Dade or the flexibility of telehealth, the providers below see clients throughout the greater Miami area.",
		],
	},
	"fort-lauderdale": {
		heading: "Finding care in Fort Lauderdale",
		paragraphs: [
			"Fort Lauderdale is the hub of Broward County, and its therapists serve a broad area that includes Hollywood, Pembroke Pines, and nearby communities. Many providers offer telehealth in addition to in-person sessions, so you can choose what works best for you. Browse the providers below to find care in and around Fort Lauderdale.",
		],
	},
	"boca-raton": {
		heading: "Finding care in Boca Raton",
		paragraphs: [
			"Boca Raton sits in southern Palm Beach County, close to Delray Beach, Deerfield Beach, and the broader Fort Lauderdale–West Palm corridor. Therapists here often offer both in-office visits and secure video sessions. The providers below see clients in and around Boca Raton.",
		],
	},
	"coral-gables": {
		heading: "Finding care in Coral Gables",
		paragraphs: [
			"Coral Gables sits in the heart of Miami-Dade County, and many therapists here also see clients from neighboring areas like South Miami, Coconut Grove, and greater Miami. Whether you prefer an in-person office visit or the flexibility of telehealth, you'll find providers below who serve the Gables and the surrounding communities.",
		],
	},
	"west-palm-beach": {
		heading: "Finding care in West Palm Beach",
		paragraphs: [
			"West Palm Beach is the urban center of Palm Beach County, serving a wide area that includes Boca Raton, Delray Beach, and nearby communities. Many therapists here offer in-person and telehealth options. The providers below see clients in and around West Palm Beach.",
		],
	},
	hollywood: {
		heading: "Finding care in Hollywood",
		paragraphs: [
			"Hollywood sits between Miami and Fort Lauderdale in southern Broward County, convenient to Hallandale Beach, Pembroke Pines, and Aventura. Therapists here commonly offer both in-office appointments and secure video sessions. The providers below serve Hollywood and the surrounding area.",
		],
	},
	aventura: {
		heading: "Finding care in Aventura",
		paragraphs: [
			"Aventura is in northeast Miami-Dade, close to Sunny Isles Beach, North Miami Beach, and the Hollywood area to the north. Many therapists serving Aventura offer in-person and telehealth sessions. The providers below see clients in and around Aventura.",
		],
	},
	"pembroke-pines": {
		heading: "Finding care in Pembroke Pines",
		paragraphs: [
			"Pembroke Pines is one of Broward County's largest communities, near Miramar, Hollywood, and Weston. Therapists here often offer flexible options, including in-office visits and secure video sessions. The providers below serve Pembroke Pines and the surrounding area.",
		],
	},
	hialeah: {
		heading: "Finding care in Hialeah",
		paragraphs: [
			"Hialeah is one of Miami-Dade's largest cities and home to a large Spanish-speaking community, so many providers serving the area offer bilingual care. Whether you prefer in-person or telehealth, the providers below see clients in and around Hialeah and greater Miami.",
		],
	},
	"coral-springs": {
		heading: "Finding care in Coral Springs",
		paragraphs: [
			"Coral Springs is in northwest Broward County, close to Parkland, Coconut Creek, and Margate. Therapists here commonly offer both in-office and online sessions. The providers below see clients in and around Coral Springs.",
		],
	},
	weston: {
		heading: "Finding care in Weston",
		paragraphs: [
			"Weston is in western Broward County, close to Pembroke Pines, Davie, and the wider Fort Lauderdale area. Therapists serving Weston often offer both in-office appointments and secure video sessions, making it easier to fit care around work and family schedules. The providers below see clients in and around Weston.",
		],
	},
	"delray-beach": {
		heading: "Finding care in Delray Beach",
		paragraphs: [
			"Delray Beach sits in central Palm Beach County, between Boca Raton and Boynton Beach. Many therapists here offer in-person and telehealth options. The providers below see clients in and around Delray Beach.",
		],
	},
	"south-miami": {
		heading: "Finding care in South Miami",
		paragraphs: [
			"South Miami is in the heart of southern Miami-Dade, close to Coral Gables, Kendall, and greater Miami. Therapists here often serve the surrounding communities and offer both in-person and online sessions. The providers below see clients in and around South Miami.",
		],
	},
	"sunny-isles-beach": {
		heading: "Finding care in Sunny Isles Beach",
		paragraphs: [
			"Sunny Isles Beach sits on northeast Miami-Dade's coast, close to Aventura and North Miami Beach. Many therapists serving the area offer in-person and telehealth options. The providers below see clients in and around Sunny Isles Beach.",
		],
	},
	"miami-beach": {
		heading: "Finding care in Miami Beach",
		paragraphs: [
			"Miami Beach sits on the barrier island just east of downtown Miami, convenient to greater Miami-Dade. Therapists here commonly offer both in-office visits and secure video sessions. The providers below see clients in and around Miami Beach.",
		],
	},
};
