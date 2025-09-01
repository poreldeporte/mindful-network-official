"use client";

import { conditionSpecialty } from "@/models";
import { getValidationError } from "@/utilities";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Select } from "../ui";
import { getAllConditions } from "@/services";

interface Props {
	onClick?: () => void;
}

export function Searchbar({ onClick }: Props) {
	const [selectedCondition, setSelectedCondition] = useState<string | null>(
		null
	);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [conditionOptions, setConditionOptions] = useState<string[]>([]);

	const router = useRouter();

	const handleSubmit = () => {
		const params = new URLSearchParams();

		if (selectedCondition) {
			params.set("condition", selectedCondition);
		}

		if (searchQuery) {
			params.set("search", searchQuery);
		}

		if (onClick) onClick();
		setSearchQuery("");
		router.push(`/search?${params.toString()}`);
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const conditionsRes = await getAllConditions();

				const conditionNames = conditionsRes.map(
					(condition: conditionSpecialty) => condition.name
				);
				setConditionOptions(conditionNames);
			} catch (error) {
				console.log(error);
				getValidationError(error);
			}
		}
		fetchData();
	}, []);

	return (
		<div>
			<div className="relative h-12 w-full flex items-center rounded-full overflow-hidden">
				<Select
					options={conditionOptions}
					placeholder={selectedCondition ? selectedCondition : "All"}
					value={selectedCondition || ""}
					setValue={setSelectedCondition}
					variant="body"
					className="h-full rounded-l-full w-20"
				/>

				<input
					className="h-full w-full border border-gray-300 rounded-r-full pl-5"
					type="text"
					placeholder="Search by Insurance or Therapy Modality"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				<Button
					variant="body"
					className="absolute rounded-full px-4 right-1 top-1/2 -translate-y-1/2 h-[calc(100%-8px)]"
					onClick={handleSubmit}
				>
					SEARCH
				</Button>
			</div>
		</div>
	);
}
