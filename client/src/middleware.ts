import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redirectService } from "@/services";
import { redirectCache } from "@/utilities/redirect-cache";

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const authUser = process.env.ADMIN_BASIC_AUTH_USER;
	const authPassword = process.env.ADMIN_BASIC_AUTH_PASSWORD;
	const isAuthEnabled = Boolean(authUser && authPassword);
	const isAdminPath = pathname.startsWith("/admin");
	const isProtectedApiPath =
		pathname === "/api/resources/psychologists" ||
		pathname === "/api/redirects";
	const needsAuth = isAuthEnabled && (isAdminPath || isProtectedApiPath);
	const unauthorizedResponse = () =>
		new NextResponse("Authentication required", {
			status: 401,
			headers: {
				"WWW-Authenticate": 'Basic realm="Secure Area"',
			},
		});

	if (needsAuth) {
		const authHeader = request.headers.get("authorization");
		const [type, token] = authHeader ? authHeader.split(" ") : [];

		if (type !== "Basic" || !token) {
			return unauthorizedResponse();
		}

		let decoded = "";
		try {
			decoded = atob(token);
		} catch {
			return unauthorizedResponse();
		}

		const [user, pass] = decoded.split(":");

		if (!user || !pass || user !== authUser || pass !== authPassword) {
			return unauthorizedResponse();
		}
	}

	if (isProtectedApiPath) {
		return NextResponse.next();
	}

	if (
		pathname.startsWith("/_next/") ||
		pathname.startsWith("/api/") ||
		pathname.startsWith("/admin") ||
		(pathname.includes(".") &&
			pathname.match(
				/\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|woff|woff2|ttf|eot)$/
			))
	) {
		return NextResponse.next();
	}

	try {
		let redirectMap = redirectCache.get();

		if (!redirectMap) {
			redirectMap = await redirectService.getRedirectMap();
			redirectCache.set(redirectMap);
		}

		const redirectRule = redirectMap.get(pathname);

		if (redirectRule) {
			const { to, type } = redirectRule;

			const isExternalUrl =
				to.startsWith("http://") || to.startsWith("https://");
			const redirectUrl = isExternalUrl
				? to
				: new URL(to, request.url).toString();

			if (type === "301") {
				return NextResponse.redirect(redirectUrl, { status: 301 });
			} else {
				return NextResponse.redirect(redirectUrl, { status: 302 });
			}
		}

		return NextResponse.next();
	} catch (error) {
		console.error("Middleware error:", error);
		return NextResponse.next();
	}
}

export const config = {
	matcher: ["/(.*)"],
};
