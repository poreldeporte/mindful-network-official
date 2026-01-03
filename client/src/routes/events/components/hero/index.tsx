import { Typography } from "@/components/ui";

interface EventsHeroProps {
	title?: string;
	subtitle?: string;
}

export const EventsHero = ({ title, subtitle }: EventsHeroProps) => {
	return (
		<section className="mt-20 lg:mt-0 h-[45vh] lg:h-[70vh] flex items-center justify-center">
			<div className="flex flex-col justify-center items-center h-full w-full relative overflow-hidden">
				<video
					autoPlay
					muted
					loop
					playsInline
					className="absolute inset-0 w-full h-full object-cover"
				>
					<source src={"/videos/events-hero.mp4"} type="video/mp4" />
				</video>
				<div className="dark-overlay h-full w-full absolute top-0 left-0" />
				<div className="page-width flex flex-col items-start justify-center relative z-10">
					<Typography
						id="hero-heading"
						className="font-antic mb-5 leading-none text-left"
						as="h1"
						color="white"
						variant="h1"
					>
						{title || "Connect, Learn, and Heal"}
					</Typography>
					{subtitle && (
						<Typography
							as="p"
							className="lg:w-3/4 text-left text-[1.125rem] leading-relaxed"
							color="white"
							variant="body"
						>
							{subtitle}
						</Typography>
					)}
				</div>
			</div>
		</section>
	);
};
