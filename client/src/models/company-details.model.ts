type SocialPlatform = "twitter" | "linkedin" | "instagram";

interface SocialLink {
	platform: SocialPlatform;
	url: string;
}

export interface CompanyDetails {
	name: string;
	email: string;
	phoneNumber?: string;
	socialLinks?: SocialLink[];
}
