import { NextRequest, NextResponse } from "next/server";
import { redirectService } from "@/services";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const path = searchParams.get("path");

		if (!path) {
			return NextResponse.json(
				{ success: false, error: "Path parameter is required" },
				{ status: 400 }
			);
		}

		const redirect = await redirectService.findRedirectForPath(path);

		if (redirect) {
			return NextResponse.json({
				success: true,
				hasRedirect: true,
				redirect: {
					from: redirect.from,
					to: redirect.to,
					type: redirect.redirectType,
					description: redirect.description,
				},
			});
		}

		return NextResponse.json({
			success: true,
			hasRedirect: false,
			message: `No redirect found for path: ${path}`,
		});
	} catch (error) {
		console.error("Error checking redirect:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to check redirect" },
			{ status: 500 }
		);
	}
}
