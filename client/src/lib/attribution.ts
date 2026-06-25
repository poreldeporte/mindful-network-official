/**
 * First-party traffic attribution.
 *
 * GA4 already records a source for every event, but it is a lossy reporting
 * layer (sampling, low-count row thresholding, consent/ad-blocker drops,
 * attribution re-modeling). For the handful of high-value contact-form
 * inquiries we send to providers, we want lossless, 1:1, factual attribution
 * carried INSIDE the lead itself.
 *
 * This module captures the session's entry context (referrer, landing page,
 * UTM params, ad click IDs) the moment the user lands — before they navigate
 * to a provider page, by which point document.referrer and the UTM query are
 * gone — and stashes it first-party. At submit time getAttribution() reads it
 * back, adds the GA client/session id, and the inquiry POST carries it to the
 * contact service.
 *
 * Two touches are stored:
 *   - first-touch: sticky, written once, never overwritten (the original entry)
 *   - last-touch:  refreshed at the start of each new session (the entry that
 *                  actually led to the submit)
 *
 * Everything is SSR-safe (guards `typeof window`) and dependency-free.
 */

const GA_MEASUREMENT_ID = "G-TLP8D1GLB5";

const FIRST_TOUCH_KEY = "tmn_attribution_first";
const LAST_TOUCH_KEY = "tmn_attribution_last";
const SESSION_FLAG_KEY = "tmn_attribution_session";

export interface TouchData {
	/** Classified channel — deterministic, computed here (not GA's model). */
	channel: string;
	/** Full referring URL as seen on the entry page ("" if none → direct). */
	referrer: string;
	/** Entry path + query string (e.g. "/find/spanish-therapists-miami?x=1"). */
	landing_page: string;
	/** Full entry URL. */
	landing_url: string;
	utm_source?: string;
	utm_medium?: string;
	utm_campaign?: string;
	utm_term?: string;
	utm_content?: string;
	/** Google Ads click id — reconciles to campaign/ad/keyword in Google Ads. */
	gclid?: string;
	/** Meta (Facebook/Instagram) click id. */
	fbclid?: string;
	/** Microsoft/Bing Ads click id. */
	msclkid?: string;
	/** ISO timestamp the touch was captured. */
	timestamp: string;
}

export interface AttributionPayload {
	first_touch: TouchData | null;
	last_touch: TouchData | null;
	ga_client_id?: string;
	ga_session_id?: string;
	/** The page the inquiry was submitted from (the provider page). */
	page_url: string;
	submitted_at: string;
}

const SEARCH_ENGINES = [
	"google.",
	"bing.",
	"yahoo.",
	"duckduckgo.",
	"ecosia.",
	"kagi.",
	"baidu.",
	"yandex.",
];

const SOCIAL_HOSTS = [
	"facebook.",
	"instagram.",
	"l.facebook",
	"m.facebook",
	"l.instagram",
	"lm.facebook",
	"t.co",
	"twitter.",
	"x.com",
	"linkedin.",
	"tiktok.",
	"pinterest.",
	"reddit.",
	"youtube.",
	"later-linkinbio",
];

/** Deterministically classify the channel from referrer + UTMs + click IDs. */
function classifyChannel(params: {
	referrerHost: string;
	utmMedium?: string;
	utmSource?: string;
	gclid?: string;
	fbclid?: string;
	msclkid?: string;
}): string {
	const medium = (params.utmMedium || "").toLowerCase();

	// Paid: an ad click id or a paid medium is unambiguous.
	if (params.gclid || params.msclkid || /cpc|ppc|paid|cpm/.test(medium)) {
		return "Paid Search";
	}
	if (params.fbclid || medium === "paid_social") {
		return "Paid Social";
	}
	// Explicit UTM medium wins over referrer guessing.
	if (medium === "email") return "Email";
	if (medium === "social") return "Organic Social";
	if (medium === "referral") return "Referral";
	if (medium === "organic") return "Organic Search";

	const host = params.referrerHost;
	if (host) {
		if (SOCIAL_HOSTS.some((h) => host.includes(h))) return "Organic Social";
		if (SEARCH_ENGINES.some((h) => host.includes(h))) return "Organic Search";
		if (host.includes("mailchimp") || host.includes("mail.google"))
			return "Email";
		return "Referral";
	}

	// No referrer, no UTM, no click id.
	return "Direct";
}

/** Build a TouchData from the current location + referrer. */
function readCurrentTouch(): TouchData {
	const url = new URL(window.location.href);
	const qs = url.searchParams;

	const referrer = document.referrer || "";
	let referrerHost = "";
	try {
		if (referrer) referrerHost = new URL(referrer).hostname.toLowerCase();
	} catch {
		referrerHost = "";
	}
	// A same-host referrer is an internal navigation, not an entry source.
	if (referrerHost && referrerHost === window.location.hostname.toLowerCase()) {
		referrerHost = "";
	}

	const get = (k: string) => qs.get(k) || undefined;
	const utm_source = get("utm_source");
	const utm_medium = get("utm_medium");
	const gclid = get("gclid");
	const fbclid = get("fbclid");
	const msclkid = get("msclkid");

	return {
		channel: classifyChannel({
			referrerHost,
			utmMedium: utm_medium,
			utmSource: utm_source,
			gclid,
			fbclid,
			msclkid,
		}),
		referrer: referrerHost ? referrer : "",
		landing_page: url.pathname + url.search,
		landing_url: url.href,
		utm_source,
		utm_medium,
		utm_campaign: get("utm_campaign"),
		utm_term: get("utm_term"),
		utm_content: get("utm_content"),
		gclid,
		fbclid,
		msclkid,
		timestamp: new Date().toISOString(),
	};
}

function readStored(key: string): TouchData | null {
	try {
		const raw = window.localStorage.getItem(key);
		return raw ? (JSON.parse(raw) as TouchData) : null;
	} catch {
		return null;
	}
}

/**
 * Capture entry attribution. Call once per page load (cheap; no-ops after the
 * first call of a session for last-touch). Safe to call on every route change.
 */
export function captureAttribution(): void {
	if (typeof window === "undefined") return;
	try {
		const isNewSession = !window.sessionStorage.getItem(SESSION_FLAG_KEY);
		if (!isNewSession) return;
		window.sessionStorage.setItem(SESSION_FLAG_KEY, "1");

		const touch = readCurrentTouch();

		// last-touch: refresh every new session.
		window.localStorage.setItem(LAST_TOUCH_KEY, JSON.stringify(touch));

		// first-touch: write once, never overwrite.
		if (!window.localStorage.getItem(FIRST_TOUCH_KEY)) {
			window.localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(touch));
		}
	} catch {
		// localStorage/sessionStorage unavailable (private mode, etc.) — skip.
	}
}

/** Read GA's client_id / session_id via gtag (async, best-effort). */
function getGaIds(): Promise<{ clientId?: string; sessionId?: string }> {
	return new Promise((resolve) => {
		const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void })
			.gtag;
		if (typeof gtag !== "function") {
			resolve({});
			return;
		}
		const out: { clientId?: string; sessionId?: string } = {};
		let pending = 2;
		const done = () => {
			pending -= 1;
			if (pending === 0) resolve(out);
		};
		// Hard timeout so a missing callback never blocks the submit.
		const timer = window.setTimeout(() => resolve(out), 800);
		const finish = () => {
			if (pending <= 0) window.clearTimeout(timer);
		};
		try {
			gtag("get", GA_MEASUREMENT_ID, "client_id", (id: string) => {
				out.clientId = id;
				done();
				finish();
			});
			gtag("get", GA_MEASUREMENT_ID, "session_id", (id: string) => {
				out.sessionId = id;
				done();
				finish();
			});
		} catch {
			resolve(out);
		}
	});
}

/**
 * Read the full attribution payload to attach to an inquiry. Resolves quickly
 * (GA id lookup is time-boxed). Never rejects.
 */
export async function getAttribution(): Promise<AttributionPayload> {
	const base: AttributionPayload = {
		first_touch: null,
		last_touch: null,
		page_url: typeof window !== "undefined" ? window.location.href : "",
		submitted_at: new Date().toISOString(),
	};
	if (typeof window === "undefined") return base;

	base.first_touch = readStored(FIRST_TOUCH_KEY);
	base.last_touch = readStored(LAST_TOUCH_KEY);

	// If capture never ran (e.g. user landed directly on this page and storage
	// was empty), synthesize from the current context so we still record one.
	if (!base.first_touch && !base.last_touch) {
		const touch = readCurrentTouch();
		base.first_touch = touch;
		base.last_touch = touch;
	}

	try {
		const { clientId, sessionId } = await getGaIds();
		base.ga_client_id = clientId;
		base.ga_session_id = sessionId;
	} catch {
		// best-effort
	}
	return base;
}
