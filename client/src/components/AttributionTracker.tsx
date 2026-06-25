"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Captures first-party traffic attribution at session entry. Renders nothing.
 * Mounted once in the root layout so it runs on the first page of every
 * session, while document.referrer and the entry UTM query are still present.
 */
export function AttributionTracker() {
	useEffect(() => {
		captureAttribution();
	}, []);
	return null;
}
