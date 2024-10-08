import { Typography } from "@/components/ui";
import { privacyPolicyContent } from "@/lib/constants";

export const PrivacyPolicyBody = () => {
	return (
		<section className="page-widthflex flex-col items-center justify-center mt-48">
			<div className="flex flex-col items-center mb-20">
				<Typography variant="title" as="h1" color="black">
					Privacy & Policy
				</Typography>
				<Typography variant="small" as="p" color="black">
					Last Updated on October, 2024
				</Typography>
			</div>
			<div className="">
				{privacyPolicyContent.map((section) => (
					<article key={section.id} className="mb-8">
						<Typography
							color="black"
							as="h2"
							variant="medium"
							className="font-bold mb-2"
						>
							{section.title}
						</Typography>
						{section.content && (
							<Typography color="black" as="p" variant="small" className="mb-5">
								{section.content}
							</Typography>
						)}

						{section.subsections && (
							<ul className="ml-4 list-disc space-y-3">
								{section.subsections.map((subsection) => (
									<li key={subsection.id}>
										<Typography
											color="black"
											as="h3"
											variant="small"
											className="font-semibold"
										>
											{subsection.title}
										</Typography>
										<Typography as="p" variant="small" color="black">
											{subsection.content}
										</Typography>
									</li>
								))}
							</ul>
						)}
					</article>
				))}
			</div>
		</section>
	);
};
