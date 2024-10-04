import { Typography } from "./Typography";
import { SearchX } from "lucide-react";

interface Props {
	title: string;
}

export const NoResults = ({ title }: Props) => {
	return (
		<div className="w-full h-full flex items-center justify-center flex-col space-y-2">
			<SearchX className="w-20 h-20 text-gray-700" />
			<Typography variant="large" color="darkGray" as="h3">
				{title}
			</Typography>
		</div>
	);
};
