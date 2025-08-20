"use client";

import { useState, useEffect, useRef } from "react";

interface UseImageLoaderReturn {
	isLoading: boolean;
	isLoaded: boolean;
	hasError: boolean;
}

export const useImageLoader = (
	imageUrl: string | undefined
): UseImageLoaderReturn => {
	const [isLoading, setIsLoading] = useState(true);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		if (!imageUrl) {
			setIsLoading(false);
			setHasError(true);
			return;
		}

		setIsLoading(true);
		setIsLoaded(false);
		setHasError(false);

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

		img.src = imageUrl;

		return () => {
			img.onload = null;
			img.onerror = null;
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [imageUrl]);

	return {
		isLoading,
		isLoaded,
		hasError,
	};
};
