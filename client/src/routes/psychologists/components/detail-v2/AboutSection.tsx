"use client";

import { Typography } from "@/components/ui";
import { useMemo, useState } from "react";
import { DetailSection } from "./DetailSection";

interface AboutSectionProps {
	id: string;
	name: string;
	description?: string;
	subtitle?: string;
	videoUrl?: string;
}

const CLAMP_LINE_COUNT = 6;

export const AboutSection = ({
	id,
	name,
	description,
	subtitle,
	videoUrl,
}: AboutSectionProps) => {
	const [expanded, setExpanded] = useState(false);
	const aboutText = description || subtitle;
	const showToggle = useMemo(
		() => Boolean(aboutText && aboutText.length > 260),
		[aboutText]
	);

	if (!aboutText && !videoUrl) return null;

	return (
		<DetailSection id={id} title={`About ${name}`}>
			{aboutText && (
				<div className="space-y-2">
					<Typography
						as="p"
						variant="bodyXSmall"
						color="darkGray"
						className="text-[12px] text-gray-600 leading-relaxed"
						style={
							expanded
								? undefined
								: {
										overflow: "hidden",
										display: "-webkit-box",
										WebkitLineClamp: CLAMP_LINE_COUNT,
										WebkitBoxOrient: "vertical",
									}
						}
					>
						{aboutText}
					</Typography>
					{showToggle && (
						<button
							type="button"
							onClick={() => setExpanded((prev) => !prev)}
							className="text-[11px] font-medium text-blue-600 hover:text-blue-700"
							aria-expanded={expanded}
						>
							{expanded ? "Show less" : "Read more"}
						</button>
					)}
				</div>
			)}

			{videoUrl && (
				<div className="overflow-hidden rounded-2xl border border-gray-200">
					<video controls className="w-full">
						<source src={videoUrl} type="video/mp4" />
					</video>
				</div>
			)}
		</DetailSection>
	);
};
