import { Typography } from "@/components/ui";
import Image from "next/image";
import {
	PersonalizedSearchOptionsImage,
	TrustedAndVerifiedResourcesImage,
	UpToDateInformationImage,
} from "@/lib/images";

export const ResourcesContainer = () => {
	return (
		<div
			className="lg:my-5 grid grid-cols-1 w-full gap-10"
			role="list"
			aria-label="List of benefits"
		>
			<article
				className="grid grid-cols-1 xl:grid-cols-2 items-center gap-10"
				aria-labelledby={`benefit-title-Trusted and Verified Resources`}
			>
				<div className="xl:order-1 py-10 lg:p-10">
					<Typography
						className="mb-5 font-semibold"
						color="black"
						as="h4"
						variant="h3"
						id={`benefit-title-Trusted and Verified Resources`}
					>
						Trusted and Verified Resources
					</Typography>

					<Typography
						className="mb-2"
						color="darkGray"
						as="p"
						variant="bodySmall"
					>
						We thoroughly vet and verify every provider in our network, ensuring
						you only have access to reputable and reliable options to tackle
						mental health conditions.
						<br />
						<br />
						Find:
					</Typography>
					<ul className="list-disc list-inside">
						<li>
							<Typography
								className="mb-2"
								color="darkGray"
								as="span"
								variant="bodySmall"
							>
								Licensed Therapists
							</Typography>
						</li>
						<li>
							<Typography
								className="mb-2"
								color="darkGray"
								as="span"
								variant="bodySmall"
							>
								Psychiatrist/Medication Management
							</Typography>
						</li>
						<li>
							<Typography
								className="mb-2"
								color="darkGray"
								as="span"
								variant="bodySmall"
							>
								Crisis Counseling for Youth Mental & Substance Use Disorders
							</Typography>
						</li>
						<li>
							<Typography
								className="mb-2"
								color="darkGray"
								as="span"
								variant="bodySmall"
							>
								Peer-led Support Groups
							</Typography>
						</li>
						<li>
							<Typography
								className="mb-2"
								color="darkGray"
								as="span"
								variant="bodySmall"
							>
								Innovative Therapies
							</Typography>
						</li>
						<li>
							<Typography
								className="mb-2"
								color="darkGray"
								as="span"
								variant="bodySmall"
							>
								And more
							</Typography>
						</li>
					</ul>
				</div>

				<Image
					src={TrustedAndVerifiedResourcesImage}
					alt="Trusted and Verified Resources"
					className="max-h-[550px] object-cover object-center p-5"
				/>
			</article>

			<article
				className="grid grid-cols-1 xl:grid-cols-2 items-center gap-10"
				aria-labelledby={`benefit-title-Up-to-Date Information`}
			>
				<div className="py-10 lg:p-10">
					<Typography
						className="mb-5 font-semibold"
						color="black"
						as="h4"
						variant="h3"
						id={`benefit-title-Up-to-Date Information`}
					>
						Up-to-Date Information
					</Typography>

					<ul className="list-disc list-inside">
						<li>
							<Typography
								className="mb-2"
								color="darkGray"
								as="span"
								variant="bodySmall"
							>
								Listings of South Florida Professionals
							</Typography>
						</li>
						<li>
							<Typography
								className="mb-2"
								color="darkGray"
								as="span"
								variant="bodySmall"
							>
								Online Resources: Support Links and Educational Blogs
							</Typography>
						</li>
					</ul>
					<Typography
						className="mb-2"
						color="darkGray"
						as="p"
						variant="bodySmall"
					>
						<br />
						Our team regularly monitors and updates listings and resources so
						you connect with the best mental health crisis services, mental
						health treatments, and support for a range of mental health
						disorders and mood disorders.
					</Typography>
				</div>

				<Image
					className="max-h-[550px] object-cover object-center p-5"
					src={UpToDateInformationImage}
					alt="Up-to-Date Information"
				/>
			</article>

			<article
				className="grid grid-cols-1 xl:grid-cols-2 items-center gap-10"
				aria-labelledby={`benefit-title-Personalized Search Options`}
			>
				<div className="xl:order-1 py-10 lg:p-10">
					<Typography
						className="mb-5 font-semibold"
						color="black"
						as="h4"
						variant="h3"
						id={`benefit-title-Personalized Search Options`}
					>
						Personalized Search Options
					</Typography>

					<Typography
						className="mb-2"
						color="darkGray"
						as="p"
						variant="bodySmall"
					>
						Use our advanced filters to find services tailored to your specific
						mental health concern. Whether you're navigating traumatic events,
						caring for a loved one in a suicidal crisis, or simply raising your
						mental health awareness.
						<br />
						<br />
						Search By:
					</Typography>
					<ul className="list-disc list-inside">
						<li>
							<Typography
								className="mb-2"
								color="darkGray"
								as="span"
								variant="bodySmall"
							>
								Condition
							</Typography>
						</li>
						<li>
							<Typography
								className="mb-2"
								color="darkGray"
								as="span"
								variant="bodySmall"
							>
								Type of therapy
							</Typography>
						</li>
						<li>
							<Typography
								className="mb-2"
								color="darkGray"
								as="span"
								variant="bodySmall"
							>
								Health care provider
							</Typography>
						</li>
						<li>
							<Typography
								className="mb-2"
								color="darkGray"
								as="span"
								variant="bodySmall"
							>
								Insurance
							</Typography>
						</li>
					</ul>
				</div>

				<Image
					className="max-h-[550px] object-cover object-center p-5"
					src={PersonalizedSearchOptionsImage}
					alt="Personalized Search Options"
				/>
			</article>
		</div>
	);
};
