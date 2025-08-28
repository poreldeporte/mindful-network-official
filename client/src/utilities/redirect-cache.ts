interface CacheEntry {
	data: Map<string, { to: string; type: "301" | "302" }>;
	timestamp: number;
}

class RedirectCache {
	private cache: CacheEntry | null = null;
	private readonly TTL = 5 * 60 * 1000;

	set(redirectMap: Map<string, { to: string; type: "301" | "302" }>): void {
		this.cache = {
			data: redirectMap,
			timestamp: Date.now(),
		};
	}

	get(): Map<string, { to: string; type: "301" | "302" }> | null {
		if (!this.cache) {
			return null;
		}

		const isExpired = Date.now() - this.cache.timestamp > this.TTL;
		if (isExpired) {
			this.cache = null;
			return null;
		}

		return this.cache.data;
	}

	clear(): void {
		this.cache = null;
	}

	isValid(): boolean {
		return this.get() !== null;
	}
}

export const redirectCache = new RedirectCache();
