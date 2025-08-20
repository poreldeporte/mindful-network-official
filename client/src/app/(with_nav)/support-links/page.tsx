"use client";

import { UseFulLinkSection } from "@/models";
import { UseFulLinksContent } from "@/routes/useful-links";
import { getUsefulLinks } from "@/services";
import { useEffect, useState } from "react";

export default function UsefulLinks() {
	const [usefulLinksSections, setUsefulLinksSections] = useState<
		UseFulLinkSection[] | []
	>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getUsefulLinks();
				if (data) setUsefulLinksSections(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	return <UseFulLinksContent usefulLinksSections={usefulLinksSections} />;
}
