import { Typography } from "@/components/ui";
import { MentalHealthCrisisImage } from "@/lib/images";
import Image from "next/image";
import Link from "next/link";

export const MentalHealthCrisis = () => {
	return (
		<section className="page-width py-24 grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
			<picture className="col-span-1">
				<Image
					src={MentalHealthCrisisImage.src}
					alt="Mental Health Crisis"
					className="w-full h-full object-cover col-span-1 rounded-lg"
					width={500}
					height={500}
				/>
			</picture>

			<div className="flex flex-col items-start justify-center col-span-1">
				<Typography
					as="h2"
					className="font-antic mb-5 leading-none"
					color="black"
					variant="title"
				>
					In a Mental Health Crisis?{" "}
					<span className="text-green-500">Start Here</span>
				</Typography>

				<ul className="list-disc list-inside">
					<li>
						<strong>National Suicide Prevention Hotline:</strong> 988
					</li>
					<li>
						<strong>Crisis Text Line :</strong> Text SHARE to 741741
					</li>
					<li>
						<strong>Mobile Crisis Unit:</strong> 800-435-7968
					</li>
				</ul>
				<Typography as="p" className="mb-5" color="darkGray" variant="medium">
					<br />
					<strong>Not urgent?</strong> Filter via mental illness, mental health
					challenge, mental health services and more to find the best place to
					start.
					<br />
					<br />
					<strong>Half-way there?</strong> Maybe you have an advocate but need
					some supplemental education. Check out our{" "}
					<Link className="underline text-green-500" href="/support-links">
						support links
					</Link>{" "}
					here.
				</Typography>
			</div>
		</section>
	);
};
