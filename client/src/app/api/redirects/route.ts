import { NextRequest, NextResponse } from "next/server";
import { redirectService } from "@/services";
import { redirectCache } from "@/utilities/redirect-cache";

export async function GET() {
	try {
		const redirects = await redirectService.getAllRedirects();
		return NextResponse.json({
			success: true,
			data: redirects,
			count: redirects.length,
		});
	} catch (error) {
		console.error("Error fetching redirects:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to fetch redirects" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		if (body.action === "invalidate-cache") {
			redirectCache.clear();

			if (body.preWarm) {
				const redirectMap = await redirectService.getRedirectMap();
				redirectCache.set(redirectMap);
			}

			return NextResponse.json({
				success: true,
				message: "Cache invalidated successfully",
				preWarmed: !!body.preWarm,
			});
		}

		return NextResponse.json(
			{ success: false, error: "Invalid action" },
			{ status: 400 }
		);
	} catch (error) {
		console.error("Error processing request:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to process request" },
			{ status: 500 }
		);
	}
}
