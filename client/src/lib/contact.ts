/**
 * Submits a contact-form inquiry to the standalone TMN contact service
 * (tmn-contact-service, deployed on our own Vercel — replaces EmailJS).
 *
 * The endpoint URL is a PUBLIC value (not a secret), so it's hardcoded here
 * rather than read from an env var — we don't have env-var access on the
 * site's Vercel project.
 */

const CONTACT_ENDPOINT = "https://tmn-contact-service.vercel.app/api/contact";

export interface InquiryPayload {
	name: string;
	email: string;
	phone: string;
	message: string;
	/** Display name of the provider the inquiry is about (per-provider form). */
	professionalName?: string;
	/** Provider slug; the service resolves their email server-side. */
	professionalSlug?: string;
}

/**
 * Sends the inquiry. Resolves on success; throws an Error (with a
 * user-displayable message) on validation or delivery failure.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<void> {
	const res = await fetch(CONTACT_ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (!res.ok) {
		const data = (await res.json().catch(() => null)) as
			| { error?: string }
			| null;
		throw new Error(
			data?.error || "Failed to send message. Please try again later."
		);
	}
}
