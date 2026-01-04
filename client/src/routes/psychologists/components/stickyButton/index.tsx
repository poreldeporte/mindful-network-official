"use client";

import { Button } from "@/components/ui";

export const StickyButton = () => {
	const handleScrollToContact = () => {
		const element = document.getElementById("get-in-touch");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div
			className="hidden lg:flex items-center justify-center right-0 rounded-xl"
			role="complementary"
			aria-label="Sticky action button"
		>
			<Button
				className="h-11 w-full !py-0 rounded-full [&>span]:!text-[12px] [&>span]:sm:!text-[13px]"
				color=""
				variant="bodyXSmall"
				onClick={handleScrollToContact}
				aria-label="Scroll to contact section"
			>
				Get in Touch
			</Button>
		</div>
	);
};
