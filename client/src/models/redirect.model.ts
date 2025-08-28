export interface Redirect {
	_id: string;
	from: string;
	to: string;
	isActive: boolean;
	redirectType: "301" | "302";
	description?: string;
	dateCreated: string;
	lastModified: string;
}

export interface SanityRedirect {
	_id: string;
	from: string;
	to: string;
	isActive: boolean;
	redirectType: "301" | "302";
	description?: string;
	dateCreated: string;
	lastModified: string;
}
