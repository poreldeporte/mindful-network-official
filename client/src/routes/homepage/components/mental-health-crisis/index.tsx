import { Typography, Button } from "@/components/ui";
import { MentalHealthCrisisImage } from "@/lib/images";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export const MentalHealthCrisis = () => {
	return (
		<section className="page-width my-10 lg:my-24 grid grid-cols-1 lg:grid-cols-12 items-center gap-0 overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm">
			<div className="flex flex-col items-start justify-center p-6 lg:col-span-7 lg:p-10">
				<div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-red-700">
					<ExclamationTriangleIcon className="h-4 w-4" aria-hidden />
					CRISIS SUPPORT
				</div>

				<Typography
					as="h2"
					className="font-antic mt-4 mb-4 leading-none"
					color="black"
					variant="h2"
				>
					In a Mental Health Crisis?{" "}
					<span className="text-blue-500">Start Here</span>
				</Typography>

				<div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
					<a
						className="rounded-2xl border border-blue-100 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
						href="tel:988"
					>
						<Typography
							as="p"
							color="black"
							variant="bodyXSmall"
							className="font-semibold"
						>
							Suicide & Crisis Lifeline
						</Typography>
						<Typography
							as="p"
							color="blue"
							variant="bodyXSmall"
							className="mt-1 font-medium"
						>
							Call 988
						</Typography>
					</a>
					<a
						className="rounded-2xl border border-blue-100 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
						href="sms:741741"
					>
						<Typography
							as="p"
							color="black"
							variant="bodyXSmall"
							className="font-semibold"
						>
							Crisis Text Line
						</Typography>
						<Typography
							as="p"
							color="blue"
							variant="bodyXSmall"
							className="mt-1 font-medium"
						>
							Text SHARE to 741741
						</Typography>
					</a>
					<a
						className="rounded-2xl border border-blue-100 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
						href="tel:8004357968"
					>
						<Typography
							as="p"
							color="black"
							variant="bodyXSmall"
							className="font-semibold"
						>
							Mobile Crisis Unit
						</Typography>
						<Typography
							as="p"
							color="blue"
							variant="bodyXSmall"
							className="mt-1 font-medium"
						>
							Call 800-435-7968
						</Typography>
					</a>
				</div>

				<Typography
					as="p"
					className="mt-5"
					color="darkGray"
					variant="bodyXSmall"
				>
					Not urgent? Use search filters to find the right care starting point.
					Need educational or practical resources? Explore our support links.
				</Typography>

				<div className="mt-5 flex flex-wrap gap-3">
					<Link href="/search">
						<Button variant="bodySmall" form="outline">
							Start Search
						</Button>
					</Link>
					<Link href="/support-links">
						<Button variant="bodySmall" form="outline-blue">
							Support Links
						</Button>
					</Link>
				</div>
			</div>

			<div className="lg:col-span-5 h-full border-t border-blue-100 lg:border-l lg:border-t-0">
				<Image
					src={MentalHealthCrisisImage.src}
					alt="Mental health crisis support"
					className="h-[360px] w-full object-cover lg:h-full"
					width={700}
					height={700}
				/>
			</div>
		</section>
	);
};
