type SocialPlatform = "twitter" | "linkedin" | "instagram";

interface SocialLink {
	platform: SocialPlatform;
	url: string;
}

export interface CompanyDetails {
	email: string;
	address: string;
	phoneNumber: string;
	socialLinks: SocialLink[];
}
