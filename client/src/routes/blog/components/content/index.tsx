import { Typography } from "@/components/ui";
import { SectionProps } from "../models";
import { Body } from "./body";

export const Content = ({ post }: SectionProps) => {
	return (
		<div className="mx-auto w-11/12 xl:w-3/4">
			<Body {...post} />

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
