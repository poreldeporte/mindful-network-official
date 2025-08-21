type SocialPlatform = "twitter" | "linkedin" | "instagram";

interface SocialLink {
	platform: SocialPlatform;
	url: string;
}

export interface HeroBackground {
	mediaType: "image" | "video";
	url: string;
}

export interface CompanyDetails {
	logo: string;
	logoAlt?: string;
	heroBackground: HeroBackground;
	email: string;
	address: string;
	phoneNumber: string;
	socialLinks: SocialLink[];
}
