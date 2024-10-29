type SocialPlatform = "twitter" | "linkedin" | "instagram";

interface SocialLink {
	platform: SocialPlatform;
	url: string;
}

export interface CompanyDetails {
	name: string;
	email: string;
	address: string;
	phoneNumber: string;
	socialLinks: SocialLink[];
}
