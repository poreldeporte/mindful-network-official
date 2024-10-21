import { Typography } from "@/components/ui";
import { Badge } from "@/components/ui";

export const SelectedFilters: React.FC<{
	selectedResources: string[];
	selectedInsurance: string[];
	selectedCondition: string[];
	selectedTherapy: string;
	handleBadgeClick: (key: string, arg: string) => void;
}> = ({
	selectedResources,
	selectedInsurance,
	selectedCondition,
	selectedTherapy,
	handleBadgeClick,
}) => {
	const createFilterItems = (items: string[], type: string) =>
		items.map((item) => ({ type, value: item }));

	const allSelectedFilters = [
		...createFilterItems(selectedResources, "resource"),
		...createFilterItems(selectedInsurance, "insurance"),
		...createFilterItems(selectedCondition, "condition"),
		...(selectedTherapy ? [{ type: "therapy", value: selectedTherapy }] : []),
	].filter((item) => Boolean(item.value));

	if (allSelectedFilters.length === 0) {
		return (
			<Typography as="p" color="darkGray" variant="small">
				No filters apply
			</Typography>
		);
	}

	return (
		<div className="flex flex-wrap gap-2">
			{allSelectedFilters.map((filter, index) => (
				<Badge
					key={`${filter.value}-${index}`}
					color=""
					className="w-max flex bg-none border-gray-700"
					showIcon={true}
					onClick={() => handleBadgeClick(filter.type, filter.value)}
				>
					{filter.value}
				</Badge>
			))}
		</div>
	);
};
