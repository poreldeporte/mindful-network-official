"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef } from "react";
import "./hero.css";

interface VideoBackgroundProps {
	videoUrl: string;
}

export const VideoBackground = ({ videoUrl }: VideoBackgroundProps) => {
	const { scrollY } = useScroll();
	const elementRef = useRef<HTMLDivElement>(null);

	useMotionValueEvent(scrollY, "change", (latest) => {
		if (elementRef.current) {
			const rate = latest * -0.3;
			elementRef.current.style.transform = `translateY(${rate}px)`;
		}
	});

	return (
		<motion.div
			ref={elementRef}
			className="absolute inset-0 hero-background hero-fade-in dark-overlay"
			style={{
				height: "110vh",
			}}
			initial={{ opacity: 0, scale: 1.05 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration: 0.5,
				ease: "easeOut",
			}}
		>
			<video
				src={videoUrl}
				autoPlay
				muted
				loop
				playsInline
				className="w-full h-full object-cover"
				style={{
					objectPosition: "center",
				}}
			/>
		</motion.div>
	);
};
