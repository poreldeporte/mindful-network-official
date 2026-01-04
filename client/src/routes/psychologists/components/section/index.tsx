"use client";

import { Typography } from "@/components/ui";
import { opacityVariants } from "@/lib/anim";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { MasonryGrid } from "..";

interface ImageWithAlt {
	url: string;
	alt?: string;
}

interface SectionProps {
	id: string;
	title: string;
	subsections?: Array<SubsectionProps>;
	emptyMessage: string;
	profileVideo?: string;
	profileGallery?: ImageWithAlt[];
}

interface SubsectionProps {
	id: string;
	icon: React.ReactNode;
	title: string;
	items: Array<string>;
	layoutStyle?: string;
}

export function Section({
	id,
	title,
	subsections,
	profileVideo,
	profileGallery,
	emptyMessage,
}: SectionProps) {
	const [isOpen, setIsOpen] = useState(true);

	const toggleContent = () => {
		setIsOpen(!isOpen);
	};

	return (
		<section
			id={id}
			className="my-6 rounded-2xl bg-white border border-gray-200 p-6 shadow-sm transition-all h-max sm:p-8"
			aria-labelledby={`${id}-header`}
		>
			<SectionHeader
				id={`${id}-header`}
				title={title}
				isOpen={isOpen}
				toggleContent={toggleContent}
			/>
			<AnimatePresence mode="wait">
				{isOpen && (
					<SectionContent id={`${id}-content`}>
						{profileVideo && (
							<video controls className="w-full rounded-lg">
								<source src={profileVideo} type="video/mp4" />
							</video>
						)}
						{profileGallery && <MasonryGrid images={profileGallery} />}
						{subsections && subsections.length ? (
							subsections.map((subsection) => (
								<Subsection key={subsection.id} {...subsection} />
							))
						) : (
							<Typography
								as="p"
								variant="bodyXSmall"
								color="darkGray"
								className="text-[12px]"
							>
								{emptyMessage}
							</Typography>
						)}
					</SectionContent>
				)}
			</AnimatePresence>
		</section>
	);
}

export const Subsection = ({
	id,
	icon,
	title,
	items,
	layoutStyle = "column",
}: SubsectionProps) => {
	const isEmail = items.some((item) => item.includes("@"));
	return (
		<div className="flex flex-col" aria-labelledby={`${id}-title`}>
			<div className="flex items-center space-x-2 mb-2">
				<div
					className="flex-shrink-0 bg-orange-50 border border-gray-100 rounded-full p-1.5"
					aria-hidden="true"
				>
					{icon}
				</div>
				<Typography
					id={`${id}-title`}
					variant="bodyXSmall"
					className="text-[12px] font-semibold"
					as="h4"
					color="black"
				>
					{title}
				</Typography>
			</div>

			<ul
				className={`space-y-1 my-2 ml-[44px] ${
					layoutStyle === "row" ? "grid grid-cols-2 gap-4" : "flex flex-col"
				}`}
			>
				{items.map((item, index) => (
					<li key={index}>
						{isEmail ? (
							<Typography
								as="p"
								variant="bodyXSmall"
								color="darkGray"
								className="xs:max-w-full xs:text-wrap text-[12px] break-all whitespace-pre-wrap"
							>
								{item}
							</Typography>
						) : (
							<Typography
								as="p"
								variant="bodyXSmall"
								color="darkGray"
								className="xs:max-w-full xs:text-wrap text-[12px]"
							>
								{item}
							</Typography>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

interface SectionHeaderProps {
	id: string;
	title: string;
	isOpen: boolean;
	toggleContent: () => void;
}

export const SectionHeader = ({
	id,
	title,
	isOpen,
	toggleContent,
}: SectionHeaderProps) => {
	return (
		<div
			className="flex items-center justify-between border-b pb-4 border-gray-200 cursor-pointer"
			role="button"
			aria-expanded={isOpen}
			aria-controls={`${id}-content`}
			id={id}
			onClick={toggleContent}
			tabIndex={0}
		>
			<div className="flex items-center">
				<Typography
					variant="bodySmall"
					className="text-[16px] font-semibold font-antic sm:text-[18px]"
					as="h3"
					color="black"
				>
					{title}
				</Typography>
			</div>

			<ChevronDown
				className={`${isOpen ? "rotate-180" : "rotate-0"} h-4 w-4 text-gray-300 transition-transform`}
				aria-hidden="true"
			/>
		</div>
	);
};

export const SectionContent = ({
	children,
	id,
}: {
	children: React.ReactNode;
	id: string;
}) => {
	return (
		<motion.div
			id={id}
			className="pt-4 space-y-4"
			initial="closed"
			animate="open"
			exit="closed"
			variants={opacityVariants}
		>
			{children}
		</motion.div>
	);
};
