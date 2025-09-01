import { Typography } from "@/components/ui";
import { termsOfServiceContent } from "@/lib/constants";

export const TermsOfServiceBody = () => {
	return (
		<section className="flex flex-col mt-48 mb-[100px]">
			<div className="flex flex-col items-center mb-20">
				<Typography variant="h2" as="h1" color="black">
					Terms of service
				</Typography>
				<Typography variant="bodySmall" as="p" color="black">
					Last Updated on October, 2024
				</Typography>
			</div>
			<div>
				{termsOfServiceContent.map((section) => (
					<article key={section.id} className="mb-5">
						<Typography
							color="black"
							as="h2"
							variant="h3"
							className="font-bold mb-2"
						>
							{section.title}
						</Typography>
						{section.content && (
							<Typography
								color="black"
								as="p"
								variant="bodyXSmall"
								className="mb-5"
							>
								{section.content}
							</Typography>
						)}

						{section.subsections && (
							<ul className="ml-4 list-disc space-y-2">
								{section.subsections.map((subsection) => (
									<li key={subsection.id}>
										<Typography
											color="black"
											as="h3"
											variant="bodyXSmall"
											className="font-semibold"
										>
											{subsection.title}
										</Typography>
										<Typography
											as="p"
											variant="bodyXSmall"
											color="black"
											className="mb-5"
										>
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
