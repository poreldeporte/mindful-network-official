"use client";

import { Typography } from "@/components/ui";
import type { ReactNode } from "react";

interface DetailSectionProps {
	id: string;
	title: string;
	children: ReactNode;
	action?: ReactNode;
}

export const DetailSection = ({
	id,
	title,
	children,
	action,
}: DetailSectionProps) => {
	return (
		<section
			id={id}
			className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
			aria-labelledby={`${id}-title`}
		>
			<div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3">
				<Typography
					as="h2"
					variant="bodySmall"
					color="black"
					className="text-[2rem] leading-tight font-antic font-normal sm:text-[2rem] md:text-[2rem] lg:text-[2rem] xl:text-[2rem]"
					id={`${id}-title`}
				>
					{title}
				</Typography>
				{action}
			</div>
			<div className="pt-4 space-y-4">{children}</div>
		</section>
	);
};
