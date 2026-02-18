import Link from "next/link";
import { Typography } from "@/components/ui";
import { ExternalLinkIcon, Link2Icon } from "lucide-react";
import { UseFulLinkSection } from "@/models";

const CategoryCard = (useFulLinkSection: UseFulLinkSection) => {
	return (
		<article className="group rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:p-7">
			<div className="mb-4 flex items-center gap-2">
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
					<Link2Icon className="h-4 w-4 text-blue-600" aria-hidden />
				</div>
				<Typography color="black" variant="h3" as="h2" className="font-antic">
					{useFulLinkSection.sectionTitle}
				</Typography>
			</div>

			<ul className="space-y-2">
				{useFulLinkSection.links.map(({ label, type, url }) => (
					<li key={`${label}-${url}`}>
						{type === "internal" ? (
							<Link
								href={url}
								className="group/link flex items-center justify-between gap-3 rounded-xl border border-transparent bg-slate-50 px-3 py-3 transition hover:border-blue-100 hover:bg-blue-50"
							>
								<Typography variant="bodyXSmall" color="darkGray" as="p">
									{label}
								</Typography>
								<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 transition group-hover/link:bg-blue-600 group-hover/link:text-white">
									<Link2Icon className="h-3.5 w-3.5" aria-hidden />
								</span>
							</Link>
						) : (
							<a
								rel="noopener noreferrer"
								target="_blank"
								href={url}
								className="group/link flex items-center justify-between gap-3 rounded-xl border border-transparent bg-slate-50 px-3 py-3 transition hover:border-blue-100 hover:bg-blue-50"
							>
								<Typography variant="bodyXSmall" color="darkGray" as="p">
									{label}
								</Typography>
								<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 transition group-hover/link:bg-blue-600 group-hover/link:text-white">
									<ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden />
								</span>
							</a>
						)}
					</li>
				))}
			</ul>
		</article>
	);
};

const CategoryCardSkeleton = ({ numberOfLinks = 4 }) => {
	return (
		<article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm lg:p-7">
			<div className="mb-4 h-7 w-48 animate-pulse rounded bg-gray-200" />
			<div className="space-y-2">
				{Array.from({ length: numberOfLinks }).map((_, index) => (
					<div
						key={index}
						className="h-11 animate-pulse rounded-xl bg-slate-100"
					/>
				))}
			</div>
		</article>
	);
};

export const UseFulLinksContent = ({
	usefulLinksSections = [],
}: {
	usefulLinksSections: UseFulLinkSection[];
}) => {
	return (
		<section className="h-max mx-auto w-11/12 xl:w-3/4 max-w-[1440px] flex flex-col mt-24 lg:mt-36 pb-16 lg:pb-24">
			<div className="mb-6 rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-6 lg:mb-8 lg:p-8">
				<div className="inline-flex w-max items-center rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-600">
					SUPPORT LINKS DIRECTORY
				</div>
				<Typography
					variant="h1"
					as="h1"
					color="black"
					className="mt-4 font-antic leading-none"
				>
					Support Links
				</Typography>
				<Typography
					as="p"
					variant="bodyXSmall"
					color="darkGray"
					className="mt-3 max-w-4xl"
				>
					Explore curated resources for families, caregivers, and advocates.
					Each section groups trusted links to help you move faster from
					research to action.
				</Typography>
			</div>

			<div className="grid lg:grid-cols-2 gap-4 lg:gap-5">
				{usefulLinksSections.length
					? usefulLinksSections.map((usefulLinkSection) => (
							<CategoryCard
								key={usefulLinkSection.sectionTitle}
								{...usefulLinkSection}
							/>
						))
					: [1, 2, 3, 4].map((item) => <CategoryCardSkeleton key={item} />)}
			</div>
		</section>
	);
};
