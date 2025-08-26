export interface TOCSettings {
	enableTOC: boolean;
	tocPosition: "before" | "after" | "sidebar" | "floating";
	includeLevels: string[];
}
