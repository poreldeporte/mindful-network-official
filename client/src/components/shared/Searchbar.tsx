"use client";

import { useEffect, useState } from "react";
import { Select } from "../ui";
import { Button } from "../ui";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { conditionSpecialty } from "@/models";
import { getValidationError } from "@/utilities";

export function Searchbar() {
  const [selectedCondition, setSelectedCondition] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [conditions, setConditions] = useState<conditionSpecialty[] | null>(
    null
  );
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

    setSearchQuery("");
    router.push(`/search?${params.toString()}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const conditionsRes = await fetch("/api/conditions");

        const conditionsData = await conditionsRes.json();

        setConditions(conditionsData);

        const conditionNames = conditionsData.map(
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
          variant="medium"
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
          variant="medium"
          className="absolute rounded-full px-4 right-1 top-1/2 -translate-y-1/2 h-[calc(100%-8px)]"
          onClick={handleSubmit}
        >
          SEARCH
        </Button>
      </div>
    </div>
  );
}
