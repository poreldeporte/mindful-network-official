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
			className="hidden lg:flex px-10 items-center justify-center sticky top-48 right-0 rounded-xl"
			role="complementary"
			aria-label="Sticky action button"
		>
			<Button
				className="rounded-full py-4 w-full"
				color=""
				variant="small"
				onClick={handleScrollToContact}
				aria-label="Scroll to contact section"
			>
				Get in Touch
			</Button>
		</div>
	);
};
