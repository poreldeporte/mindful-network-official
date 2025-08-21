import { Typography } from "@/components/ui";

export const BlogsHero = () => {
	return (
		<section className="mt-20 lg:mt-0 h-[50vh] lg:h-[70vh] flex items-center justify-center p-2">
			<div className="flex flex-col justify-center items-center h-full w-full rounded-xl relative overflow-hidden px-5">
				<video
					autoPlay
					muted
					loop
					playsInline
					className="absolute inset-0 w-full h-full object-cover"
				>
					<source src={"/videos/blog-hero.mp4"} type="video/mp4" />
				</video>
				<div className="dark-overlay h-full w-full absolute top-0 left-0" />
				<Typography
					color="white"
					as="h1"
					variant="h2"
					className="text-center md:text-start z-10"
				>
					Cuarted articles just for you
				</Typography>
			</div>
		</section>
	);
};
