"use client";

import { Topbar, Footer, MobileTopBar } from "@/components/shared";
import { UseFulLinkSection } from "@/models";
import { UseFulLinksContent } from "@/routes/useful-links";
import { getUsefulLinks } from "@/services";
import { useState, useEffect } from "react";

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

	return (
		<>
			<Topbar />
			<MobileTopBar />
			<main aria-labelledby="useful-links-page">
				<UseFulLinksContent usefulLinksSections={usefulLinksSections} />
			</main>
			<Footer />
		</>
	);
}
