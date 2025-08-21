"use client";

import { useState, useEffect, useRef } from "react";
import { HeroBackground } from "@/models";

interface UseMediaLoaderReturn {
	isLoading: boolean;
	isLoaded: boolean;
	hasError: boolean;
}

export const useMediaLoader = (
	heroBackground: HeroBackground | undefined
): UseMediaLoaderReturn => {
	const [isLoading, setIsLoading] = useState(true);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		if (!heroBackground?.url) {
			setIsLoading(false);
			setHasError(true);
			return;
		}

		setIsLoading(true);
		setIsLoaded(false);
		setHasError(false);

		if (heroBackground.mediaType === "image") {
			// Handle image loading
			const img = new Image();

			img.onload = () => {
				timeoutRef.current = setTimeout(() => {
					setIsLoading(false);
					setIsLoaded(true);
					setHasError(false);
				}, 100);
			};

			img.onerror = () => {
				timeoutRef.current = setTimeout(() => {
					setIsLoading(false);
					setIsLoaded(false);
					setHasError(true);
				}, 100);
			};

			img.src = heroBackground.url;

			return () => {
				img.onload = null;
				img.onerror = null;
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
				}
			};
		} else if (heroBackground.mediaType === "video") {
			// Handle video loading
			const video = document.createElement("video");
			video.muted = true;
			video.preload = "metadata";

			video.onloadedmetadata = () => {
				timeoutRef.current = setTimeout(() => {
					setIsLoading(false);
					setIsLoaded(true);
					setHasError(false);
				}, 100);
			};

			video.onerror = () => {
				timeoutRef.current = setTimeout(() => {
					setIsLoading(false);
					setIsLoaded(false);
					setHasError(true);
				}, 100);
			};

			video.src = heroBackground.url;

			return () => {
				video.onloadedmetadata = null;
				video.onerror = null;
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
				}
			};
		}
	}, [heroBackground]);

	return {
		isLoading,
		isLoaded,
		hasError,
	};
};
