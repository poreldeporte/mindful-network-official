import { Button, Typography } from "@/components/ui";
import {
	PersonalizedSearchOptionsImage,
	StudentsHeroImage,
	TrustedAndVerifiedResourcesImage,
	UpToDateInformationImage,
} from "@/lib/images";
import {
	AcademicCapIcon,
	ArrowLongRightIcon,
	CheckCircleIcon,
	ShieldCheckIcon,
	SparklesIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const valueProps = [
	{
		title: "Curated for Students",
		description:
			"Browse professionals matched for children and adolescents, so families can start with relevant options faster.",
		image: PersonalizedSearchOptionsImage,
		Icon: SparklesIcon,
	},
	{
		title: "Curated Listings",
		description:
			"Every listing is maintained to help students and caregivers explore care options in one place.",
		image: TrustedAndVerifiedResourcesImage,
		Icon: ShieldCheckIcon,
	},
	{
		title: "Continuously Updated",
		description:
			"Our directory is maintained to keep student-focused support options accurate and current.",
		image: UpToDateInformationImage,
		Icon: AcademicCapIcon,
	},
];

const heroHighlights = [
	"Prefiltered results for Child and Adolescent care",
	"Listed provider profiles and credentials",
	"Built for parents, educators, and school teams",
];

const audience = [
	"Parents and caregivers navigating mental health care for children and teens",
	"Educators and school teams looking for referral starting points",
	"Families looking for testing, counseling, learning, and support pathways",
	"Communities looking for a starting point for student-centered care options",
];

const processSteps = [
	"Open the student directory with Child and Adolescent age specialties already applied.",
	"Use additional filters to narrow by services, location, or care approach.",
	"Compare profiles and connect with professionals that match your student's needs.",
];

export default function StudentsPage() {
	const schemaData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				"@id": "https://themindfulnetwork.com/students#webpage",
				url: "https://themindfulnetwork.com/students",
				name: "Student Mental Health Resources in South Florida",
				description:
					"Student-focused mental health support for children and adolescents, including testing, learning support, and family resources.",
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
				],
			},
			{
				"@type": "FAQPage",
				mainEntity: [
					{
						"@type": "Question",
						name: "Who is this student section for?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "This section is designed for parents, educators, and school communities supporting children and adolescents.",
						},
					},
					{
						"@type": "Question",
						name: "What services can I find here?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "You can explore listed professionals for testing, mental health care, learning support, and family-centered resources.",
						},
					},
					{
						"@type": "Question",
						name: "How are providers filtered on student search?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "The student directory is prefiltered to Child and Adolescent age specialties to keep results relevant.",
						},
					},
				],
			},
		],
	};

	return (
		<main
			className="min-h-screen w-full bg-slate-50"
			aria-labelledby="students-page"
		>
			<Script
				id="students-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
			/>

			<section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
				<div
					className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-slate-50"
					aria-hidden
				/>
				<div
					className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-200/50 blur-3xl"
					aria-hidden
				/>
				<div
					className="absolute -bottom-16 -left-20 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl"
					aria-hidden
				/>

				<div className="page-width relative">
					<div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
						<div className="flex flex-col gap-6 lg:col-span-7">
							<div className="inline-flex w-max items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 shadow-sm">
								<AcademicCapIcon
									className="h-4 w-4 text-blue-500"
									aria-hidden
								/>
								<Typography
									as="span"
									variant="bodyXSmall"
									color="blue"
									className="font-semibold tracking-wide"
								>
									STUDENT SUPPORT HUB
								</Typography>
							</div>

							<Typography
								id="students-page"
								className="font-antic leading-[0.95] text-[2.2rem] sm:text-[2.6rem] md:text-[3.1rem] lg:text-[3.6rem] xl:text-[3.9rem]"
								as="h1"
								color="black"
								variant="h1"
							>
								Student Mental Health Support{" "}
								<span className="text-blue-500">Without the Guesswork</span>
							</Typography>

							<Typography as="p" color="darkGray" variant="bodySmall">
								Designed for parents, educators, and school communities, this
								section connects you to listed professionals offering testing,
								mental health care, learning support, and family resources -
								helping students feel supported both in and out of the
								classroom.
							</Typography>

							<div className="flex flex-wrap gap-3 pt-1">
								<Link href="/students/search">
									<Button variant="bodySmall" form="primary" textColor="white">
										Find Student Professionals
									</Button>
								</Link>
								<Link href="/support-links">
									<Button variant="bodySmall" form="outline">
										Explore Support Links
									</Button>
								</Link>
							</div>

							<div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
								{heroHighlights.map((highlight) => (
									<div
										key={highlight}
										className="rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-sm"
									>
										<Typography as="p" color="darkGray" variant="bodyXSmall">
											{highlight}
										</Typography>
									</div>
								))}
							</div>
						</div>

						<div className="relative pb-10 lg:col-span-5 lg:pl-6">
							<div
								className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-blue-200/40 to-cyan-200/40 blur-xl"
								aria-hidden
							/>
							<div className="relative overflow-hidden rounded-[1.75rem] border border-blue-200 bg-white shadow-[0_24px_80px_-32px_rgba(37,99,235,0.5)]">
								<Image
									src={StudentsHeroImage}
									alt="Student and caregiver support"
									className="h-[420px] w-full object-cover object-right lg:h-[560px]"
									priority
								/>
							</div>
							<aside className="absolute bottom-0 left-4 right-4 rounded-2xl border border-blue-100 bg-white p-4 shadow-xl sm:w-[290px] sm:right-auto">
								<Typography as="p" color="darkGray" variant="bodyXSmall">
									Student search is prefiltered for{" "}
									<span className="font-semibold text-blue-500">Child</span> and{" "}
									<span className="font-semibold text-blue-500">
										Adolescent
									</span>{" "}
									age specialties.
								</Typography>
							</aside>
						</div>
					</div>
				</div>
			</section>

			<section className="page-width pb-16 lg:pb-20">
				<div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
					{valueProps.map((item) => {
						const Icon = item.Icon;

						return (
							<article
								key={item.title}
								className="group overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
							>
								<Image
									src={item.image}
									alt={item.title}
									className="h-52 w-full bg-slate-50 p-4 object-contain"
								/>
								<div className="flex flex-col gap-3 p-6">
									<div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
										<Icon className="h-5 w-5 text-blue-500" aria-hidden />
									</div>
									<Typography
										as="h2"
										color="black"
										variant="h3"
										className="font-antic"
									>
										{item.title}
									</Typography>
									<Typography as="p" color="darkGray" variant="bodyXSmall">
										{item.description}
									</Typography>
								</div>
							</article>
						);
					})}
				</div>
			</section>

			<section className="page-width grid grid-cols-1 gap-6 pb-16 lg:grid-cols-2 lg:pb-24">
				<article className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm lg:p-8">
					<Typography as="h2" color="black" variant="h3" className="font-antic">
						Built for the people who support students every day
					</Typography>
					<ul className="mt-5 space-y-3">
						{audience.map((item) => (
							<li key={item} className="flex items-start gap-3">
								<CheckCircleIcon
									className="mt-0.5 h-5 w-5 shrink-0 text-blue-500"
									aria-hidden
								/>
								<Typography as="p" color="darkGray" variant="bodyXSmall">
									{item}
								</Typography>
							</li>
						))}
					</ul>
				</article>

				<article className="rounded-3xl border border-blue-100 bg-blue-50/60 p-7 shadow-sm lg:p-8">
					<Typography as="h2" color="black" variant="h3" className="font-antic">
						How student search works
					</Typography>
					<ol className="mt-5 space-y-4">
						{processSteps.map((step, index) => (
							<li key={step} className="flex items-start gap-3">
								<span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-300 bg-white text-sm font-semibold text-blue-500">
									{index + 1}
								</span>
								<Typography as="p" color="darkGray" variant="bodyXSmall">
									{step}
								</Typography>
							</li>
						))}
					</ol>
					<Typography
						as="p"
						color="darkGray"
						variant="bodyXSmall"
						className="mt-6 rounded-2xl border border-blue-100 bg-white p-4"
					>
						Need broader options? You can still explore the full directory after
						you start in the student-focused view.
					</Typography>
				</article>
			</section>

			<section className="page-width pb-20 lg:pb-28">
				<div className="relative overflow-hidden rounded-[2rem] border border-blue-500 bg-blue-500 p-8 lg:p-12">
					<div
						className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-cyan-300/30 blur-2xl"
						aria-hidden
					/>
					<div
						className="absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-white/20 blur-2xl"
						aria-hidden
					/>

					<div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
						<div className="lg:col-span-8">
							<Typography
								as="h2"
								variant="h2"
								color="white"
								className="font-antic leading-none"
							>
								Start with student-focused results.
							</Typography>
							<Typography
								as="p"
								variant="bodySmall"
								color="white"
								className="mt-4"
							>
								Go straight to a directory prefiltered for Child and Adolescent
								care, then narrow further based on your student's needs.
							</Typography>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
							<Link href="/students/search">
								<Button variant="bodySmall" form="outline-white">
									Browse Student Directory
									<ArrowLongRightIcon className="h-4 w-4" />
								</Button>
							</Link>
							<Link href="/search">
								<Button variant="bodySmall" form="outline-white">
									View Full Directory
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
