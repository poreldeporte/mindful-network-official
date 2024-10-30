import { Badge } from "@/components/ui";
import { ColorType } from "@/components/ui";
import { formatType } from "@/utilities";

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
	const createFilterItems = (items: string[], type: string, color: ColorType) =>
		items.map((item) => ({ type, value: item, color }));

	const allSelectedFilters = [
		...createFilterItems(selectedResources, "resource", "blue"),
		...createFilterItems(selectedInsurance, "insurance", "green"),
		...createFilterItems(selectedCondition, "condition", "orange"),
		...(selectedTherapy
			? [{ type: "therapy", value: selectedTherapy, color: "blue" }]
			: []),
	].filter((item) => Boolean(item.value));

	return (
		<div className="flex flex-wrap gap-2">
			{allSelectedFilters.map((filter, index) => (
				<Badge
					key={`${filter.value}-${index}`}
					color={filter.color as ColorType}
					className="w-max flex bg-none border-gray-700 capitalize"
					showIcon={true}
					onClick={() => handleBadgeClick(filter.type, filter.value)}
					aria-pressed={selectedResources.includes(filter.value)}
					aria-label={`Resource ${filter.value}`}
				>
					{formatType(filter.value)}
				</Badge>
			))}
		</div>
	);
};
