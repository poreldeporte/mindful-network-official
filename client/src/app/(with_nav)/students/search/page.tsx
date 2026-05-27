import { Typography } from "@/components/ui";
import { StudentsLaughingImage } from "@/lib/images";
import { SearchWrapper } from "@/routes/search";
import {
	AcademicCapIcon,
	BuildingLibraryIcon,
	HeartIcon,
	SparklesIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Script from "next/script";
import { Suspense } from "react";

const STUDENT_AGE_SPECIALTIES = ["Adolescent", "Child"];

const audienceTags = [
	"Parents & Caregivers",
	"Educators",
	"School Communities",
];

const benefitCards = [
	{
		title: "Mental Health Care",
		description:
			"Explore counseling and therapy providers who support students across academic, social, and emotional challenges.",
		Icon: HeartIcon,
	},
	{
		title: "Testing & Assessment",
		description:
			"Find professionals offering psychoeducational, behavioral, and diagnostic evaluations for school-age needs.",
		Icon: AcademicCapIcon,
	},
	{
		title: "School-Focused Support",
		description:
			"Connect with providers who understand school systems, family collaboration, and student success planning.",
		Icon: BuildingLibraryIcon,
	},
];

export default function StudentSearchPage() {
	const schemaData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "CollectionPage",
				"@id": "https://themindfulnetwork.com/students/search#collectionpage",
				url: "https://themindfulnetwork.com/students/search",
				name: "Student Mental Health Directory (Child & Adolescent)",
				description:
					"Student-focused professional directory in South Florida for children and adolescents.",
				isPartOf: {
					"@id": "https://themindfulnetwork.com/#website",
				},
			},
			{
				"@type": "BreadcrumbList",
				itemListElement: [
					{
						"@type": "ListItem",
						position: 1,
						name: "Home",
						item: "https://themindfulnetwork.com/",
					},
					{
						"@type": "ListItem",
						position: 2,
						name: "Students",
						item: "https://themindfulnetwork.com/students",
					},
					{
						"@type": "ListItem",
						position: 3,
						name: "Student Directory",
						item: "https://themindfulnetwork.com/students/search",
					},
				],
			},
		],
	};

	return (
		<main
			className="min-h-screen w-full bg-slate-50"
			aria-labelledby="students-search-page-heading"
		>
			<Script
				id="students-search-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
			/>

			<section className="relative overflow-hidden pt-24 pb-8 lg:pt-32 lg:pb-10">
				<div
					className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-slate-50"
					aria-hidden
				/>
				<div
					className="absolute -top-24 -left-12 h-60 w-60 rounded-full bg-blue-200/50 blur-3xl"
					aria-hidden
				/>
				<div
					className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl"
					aria-hidden
				/>

				<div className="page-width relative">
					<div className="grid overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-[0_24px_80px_-40px_rgba(37,99,235,0.5)] lg:grid-cols-12">
						<div className="flex flex-col gap-5 p-7 lg:col-span-7 lg:p-10">
							<div className="inline-flex w-max items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5">
								<SparklesIcon className="h-4 w-4 text-blue-500" aria-hidden />
								<Typography
									as="span"
									variant="bodyXSmall"
									color="blue"
									className="font-semibold tracking-wide"
								>
									STUDENT DIRECTORY
								</Typography>
							</div>

							<Typography
								id="students-search-page-heading"
								as="h1"
								variant="h2"
								color="black"
								className="font-antic leading-none"
							>
								Find the Right Support Team for Students
							</Typography>

							<Typography as="p" variant="bodyXSmall" color="darkGray">
								Designed for families, educators, and school communities, this
								directory helps you quickly find listed professionals for
								testing, mental health care, and learning support.
							</Typography>

							<div className="flex flex-wrap gap-2 pt-1">
								{audienceTags.map((tag) => (
									<span
										key={tag}
										className="inline-flex items-center rounded-full border border-blue-100 bg-white px-3 py-1 text-[11px] font-medium text-blue-700 sm:text-xs"
									>
										{tag}
									</span>
								))}
							</div>
						</div>

						<div className="relative min-h-[260px] border-t border-blue-100 bg-slate-100 lg:col-span-5 lg:min-h-full lg:border-l lg:border-t-0">
							<Image
								src={StudentsLaughingImage}
								alt="Students collaborating in a school community"
								fill
								sizes="(min-width: 1024px) 28vw, 92vw"
								className="object-cover object-right-bottom"
								priority
							/>
						</div>
					</div>
				</div>
			</section>

			<section className="page-width pb-8 lg:pb-10">
				<div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm">
					<Suspense fallback={<div className="p-8">loading...</div>}>
						<SearchWrapper
							lockedAgeSpecialties={STUDENT_AGE_SPECIALTIES}
							showLockedAgeSpecialties={false}
							titlePrefix="Find Student-Support Professionals in"
							titleHighlight="South Florida"
							headingAs="h2"
						/>
					</Suspense>
				</div>
			</section>

			<section className="page-width pb-16 lg:pb-24">
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
					{benefitCards.map((item) => {
						const Icon = item.Icon;

						return (
							<article
								key={item.title}
								className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
							>
								<div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
									<Icon className="h-5 w-5 text-blue-500" aria-hidden />
								</div>
								<Typography
									as="h2"
									variant="h3"
									color="black"
									className="font-antic"
								>
									{item.title}
								</Typography>
								<Typography
									as="p"
									variant="bodyXSmall"
									color="darkGray"
									className="mt-2"
								>
									{item.description}
								</Typography>
							</article>
						);
					})}
				</div>
			</section>
		</main>
	);
}
