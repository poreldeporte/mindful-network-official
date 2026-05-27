import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SIGNUP_TAG = "website signup";

type SubscribeResult = {
	ok: boolean;
	alreadySubscribed: boolean;
	status: number;
	message: string;
};

async function subscribeToMailchimp(
	email: string,
	firstName: string
): Promise<SubscribeResult> {
	const apiKey = process.env.MAILCHIMP_API_KEY;
	const listId = process.env.MAILCHIMP_LIST_ID;

	if (!apiKey || !listId) {
		console.error("Mailchimp env vars are not configured");
		return {
			ok: false,
			alreadySubscribed: false,
			status: 500,
			message: "Newsletter service is not configured.",
		};
	}

	const dc = apiKey.split("-")[1];
	if (!dc) {
		console.error("Mailchimp API key is missing data-center suffix");
		return {
			ok: false,
			alreadySubscribed: false,
			status: 500,
			message: "Newsletter service is misconfigured.",
		};
	}

	const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;
	const auth = Buffer.from(`anystring:${apiKey}`).toString("base64");

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Basic ${auth}`,
		},
		body: JSON.stringify({
			email_address: email,
			status: "subscribed",
			merge_fields: { FNAME: firstName },
			tags: [SIGNUP_TAG],
		}),
	});

	if (response.ok) {
		return { ok: true, alreadySubscribed: false, status: 200, message: "" };
	}

	const payload = await response.json().catch(() => null);
	const title: string | undefined = payload?.title;

	if (response.status === 400 && title === "Member Exists") {
		return { ok: true, alreadySubscribed: true, status: 200, message: "" };
	}

	if (response.status === 400 && title === "Invalid Resource") {
		return {
			ok: false,
			alreadySubscribed: false,
			status: 400,
			message: "Please enter a valid email address.",
		};
	}

	console.error("Mailchimp subscribe failed", {
		status: response.status,
		payload,
	});
	return {
		ok: false,
		alreadySubscribed: false,
		status: 502,
		message: "We couldn't sign you up right now. Please try again shortly.",
	};
}

export async function POST(request: Request) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json(
			{ error: "Invalid request body." },
			{ status: 400 }
		);
	}

	const rawEmail = (body as { email?: unknown })?.email;
	if (typeof rawEmail !== "string") {
		return NextResponse.json(
			{ error: "Email is required." },
			{ status: 400 }
		);
	}

	const email = rawEmail.trim().toLowerCase();
	if (!EMAIL_REGEX.test(email)) {
		return NextResponse.json(
			{ error: "Please enter a valid email address." },
			{ status: 400 }
		);
	}

	const rawFirstName = (body as { firstName?: unknown })?.firstName;
	const firstName =
		typeof rawFirstName === "string" ? rawFirstName.trim().slice(0, 80) : "";
	if (!firstName) {
		return NextResponse.json(
			{ error: "Please enter your first name." },
			{ status: 400 }
		);
	}

	const result = await subscribeToMailchimp(email, firstName);

	if (result.ok) {
		return NextResponse.json({
			ok: true,
			alreadySubscribed: result.alreadySubscribed,
		});
	}

	return NextResponse.json(
		{ error: result.message },
		{ status: result.status }
	);
}
