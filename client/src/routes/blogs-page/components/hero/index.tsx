import { Typography, Button } from "@/components/ui";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface BlogsHeroProps {
	title?: string;
	subtitle?: string;
}

export const BlogsHero = ({ title, subtitle }: BlogsHeroProps) => {
	return (
		<section className="mt-20 lg:mt-0 h-[52vh] lg:h-[74vh] flex items-center justify-center">
			<div className="flex flex-col justify-center items-center h-full w-full relative overflow-hidden">
				<video
					autoPlay
					muted
					loop
					playsInline
					className="absolute inset-0 w-full h-full object-cover"
				>
					<source src="/videos/blog-hero.mp4" type="video/mp4" />
				</video>
				<div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/60" />

				<div className="page-width flex flex-col items-start justify-center relative z-10">
					<div className="inline-flex w-max items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
						MENTAL HEALTH ARTICLES
					</div>
					<Typography
						id="hero-heading"
						className="font-antic mt-4 mb-5 leading-none text-left"
						as="h1"
						color="white"
						variant="h1"
					>
						{title || "Curated Articles Just for You"}
					</Typography>
					<Typography
						as="p"
						className="max-w-3xl text-left text-[1.05rem] leading-relaxed"
						color="white"
						variant="body"
					>
						{subtitle ||
							"Read practical guidance, expert perspectives, and mental health education designed to support families and caregivers."}
					</Typography>
					<Link href="/search" className="mt-8">
						<Button form="outline-white" variant="bodySmall">
							Find Professionals
							<ArrowLongRightIcon className="h-4 w-4" />
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};
