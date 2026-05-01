type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
	interface Window {
		gtag?: (command: "event", eventName: string, params?: GtagParams) => void;
	}
}

export const trackEvent = (
	eventName: string,
	params?: GtagParams
): void => {
	if (typeof window === "undefined" || typeof window.gtag !== "function") {
		return;
	}
	window.gtag("event", eventName, { transport_type: "beacon", ...params });
};
