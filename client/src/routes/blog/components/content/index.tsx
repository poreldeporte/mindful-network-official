import { Typography } from "@/components/ui";
import { SectionProps } from "../models";
import { Body } from "./body";
import TableOfContents from "@/components/shared/TableOfContents";
import { getTOCPosition } from "@/utilities/toc.utility";

export const Content = ({ post }: SectionProps) => {
	const tocSettings = post.tocSettings || {
		enableTOC: true,
		tocPosition: "before",
		includeLevels: ["h1", "h2", "h3"],
	};

	return (
		<div className="mx-auto w-11/12 xl:w-3/4">
			{tocSettings.enableTOC && tocSettings.tocPosition === "before" && (
				<div className={getTOCPosition(tocSettings.tocPosition)}>
					<TableOfContents content={post.content} settings={tocSettings} />
				</div>
			)}

			<Body {...post} />

			{tocSettings.enableTOC && tocSettings.tocPosition === "after" && (
				<div className={getTOCPosition(tocSettings.tocPosition)}>
					<TableOfContents content={post.content} settings={tocSettings} />
				</div>
			)}

			{tocSettings.enableTOC &&
				(tocSettings.tocPosition === "sidebar" ||
					tocSettings.tocPosition === "floating") && (
					<div className={getTOCPosition(tocSettings.tocPosition)}>
						<TableOfContents content={post.content} settings={tocSettings} />
					</div>
				)}

			<div className="section-y-padding w-10/12">
				<Typography as="span" variant="bodyXSmall" color="darkGray">
					*This blog is for informational purposes only and is not a substitute
					for professional medical advice, diagnosis, or treatment. Always seek
					the advice of your healthcare provider with any questions you may have
					regarding a medical condition.
				</Typography>
			</div>
		</div>
	);
};
