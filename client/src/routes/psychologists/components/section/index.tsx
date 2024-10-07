"use client";

import { Typography } from "@/components/ui";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariants } from "@/lib/anim";

interface SectionProps {
	id: string;
	title: string;
	subsections: Array<SubsectionProps>;
	emptyMessage: string;
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
	emptyMessage,
}: SectionProps) {
	const [isOpen, setIsOpen] = useState(true);

	const toggleContent = () => {
		setIsOpen(!isOpen);
	};

	return (
		<section
			id={id}
			className="py-10 px-10 lg:rounded-2xl my-10 bg-white shadow-sm shadow-gray-100 transition-all h-max"
		>
			<SectionHeader
				title={title}
				isOpen={isOpen}
				toggleContent={toggleContent}
			/>
			<AnimatePresence mode="wait">
				{isOpen && (
					<SectionContent>
						{subsections && subsections.length ? (
							subsections.map((subsection) => (
								<Subsection key={subsection.id} {...subsection} />
							))
						) : (
							<Typography as="p" variant="medium" color="darkGray">
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
	return (
		<div className={`flex flex-col`}>
			<div className="flex items-center space-x-2 mb-2">
				<div className="flex-shrink-0 bg-orange-50 border border-gray-100 rounded-full p-2">
					{icon}
				</div>
				<Typography variant="small" className="font-bold" as="h4" color="black">
					{title}
				</Typography>
			</div>

			<ul
				className={`space-y-1 my-2 ${layoutStyle === "row" ? "grid grid-cols-2 gap-4" : "flex flex-col"}`}
			>
				{items.map((item, index) => (
					<li key={index}>
						<Typography as="p" variant="small" color="darkGray">
							{item}
						</Typography>
					</li>
				))}
			</ul>
		</div>
	);
};

interface SectionHeaderProps {
	title: string;
	isOpen: boolean;
	toggleContent: () => void;
}

export const SectionHeader = ({
	title,
	isOpen,
	toggleContent,
}: SectionHeaderProps) => {
	return (
		<div
			className="flex items-center justify-between border-b pb-5 border-gray-200 cursor-pointer"
			onClick={toggleContent}
		>
			<div className="flex items-center">
				<Typography
					variant="medium"
					className="font-bold"
					as="h3"
					color="black"
				>
					{title}
				</Typography>
			</div>

			<ChevronDown
				className={`${isOpen ? "rotate-180" : "rotate-0"} h-6 w-6 text-gray-300 transition-transform`}
			/>
		</div>
	);
};

export const SectionContent = ({ children }: { children: React.ReactNode }) => {
	return (
		<motion.div
			className="pt-5 space-y-5"
			initial="closed"
			animate="open"
			exit="closed"
			variants={opacityVariants}
		>
			{children}
		</motion.div>
	);
};
