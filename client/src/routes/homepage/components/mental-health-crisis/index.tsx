import { Typography } from "@/components/ui";
import { MentalHealthCrisisImage } from "@/lib/images";
import Image from "next/image";
import Link from "next/link";

export const MentalHealthCrisis = () => {
	return (
		<section className="page-width my-10 lg:my-24 grid grid-cols-1 lg:grid-cols-2 items-center border border-blue-500">
			<div className="flex flex-col items-start justify-center col-span-1 p-10">
				<Typography
					as="h2"
					className="font-antic mb-5 leading-none"
					color="black"
					variant="h2"
				>
					In a Mental Health Crisis?{" "}
					<span className="text-blue-500">Start Here</span>
				</Typography>

				<ul className="list-disc list-inside">
					<li>
						<Typography as="span" variant="bodySmall" color="darkGray">
							<strong>National Suicide Prevention Hotline:</strong>{" "}
							<a
								className="font-medium underline underline-offset-4 text-blue-500"
								href="tel:988"
							>
								988
							</a>
						</Typography>
					</li>
					<li>
						<Typography as="span" variant="bodySmall" color="darkGray">
							<strong>Crisis Text Line:</strong> Text SHARE to{" "}
							<a
								className="font-medium underline underline-offset-4 text-blue-500"
								href="sms:741741"
							>
								741741
							</a>
						</Typography>
					</li>
					<li>
						<Typography as="span" variant="bodySmall" color="darkGray">
							<strong>Mobile Crisis Unit:</strong>{" "}
							<a
								className="font-medium underline underline-offset-4 text-blue-500"
								href="tel:8004357968"
							>
								800-435-7968
							</a>
						</Typography>
					</li>
				</ul>
				<Typography
					as="p"
					className="mb-5"
					color="darkGray"
					variant="bodySmall"
				>
					<br />
					<strong>Not urgent?</strong> Filter via mental health challenge,
					mental health services and more to find the best place to start.
					<br />
					<br />
					<strong>Half-way there?</strong> Maybe you have an advocate but need
					some supplemental education. Check out our{" "}
					<Link className="underline text-blue-500" href="/support-links">
						support links
					</Link>{" "}
					here.
				</Typography>
			</div>

			<picture className="col-span-1 h-[600px] border-t md:border-t-0 md:border-l border-blue-500">
				<Image
					src={MentalHealthCrisisImage.src}
					alt="Mental Health Crisis"
					className="w-full h-full object-cover col-span-1"
					width={500}
					height={500}
				/>
			</picture>
		</section>
	);
};
