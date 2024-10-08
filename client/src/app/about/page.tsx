import { AboutImage } from "@/lib/images";
import { Footer, Topbar, MobileTopBar } from "@/components/shared";
import Image from "next/image";
import { Typography } from "@/components/ui";

export default function About() {
	return (
		<>
			<Topbar />
			<MobileTopBar />
			<section
				className="grid lg:grid-cols-12 items-center page-width gap-5"
				role="region"
				aria-labelledby="about-hero-heading"
			>
				<div className="h-2/3 w-full lg:col-span-4">
					<Image
						src={AboutImage}
						alt="Group of professionals working together at Mindful Network"
						className="h-full w-full object-cover object-top rounded-xl"
					/>
				</div>

				<div className="col-span-8">
					<Typography
						id="about-hero-heading"
						className="font-antic"
						as="h1"
						color="black"
						variant="title"
					>
						Why We <span className="text-green-300">Rise</span>
					</Typography>
					<Typography
						id="about-hero-text"
						as="p"
						color="darkGray"
						variant="medium"
					>
						As a Family Mentor, Certified Recovery Peer Specialist, and Mental
						Health Advocate, I've partnered with a dedicated team of
						professionals to make mental health resources easy and accessible.
						Through The Mindful Network, we're not just building a
						community—we're smashing the stigma around mental health and
						providing people with the tools to thrive. Together, we're ending
						the silence and lifting each other up on the journey to wellness.
					</Typography>
				</div>
			</section>
			<Footer />
		</>
	);
}
