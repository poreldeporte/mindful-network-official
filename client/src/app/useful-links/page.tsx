import { Topbar, Footer, MobileTopBar } from "@/components/shared";
import { UseFulLinksContent } from "@/routes/useful-links";
import { getUsefulLinks } from "@/services/";

export default async function UsefulLinks() {
	const usefulLinksSections = await getUsefulLinks();

	return (
		<>
			<Topbar />
			<MobileTopBar />
			<main aria-labelledby="privacy-policy-page">
				<section className="h-max mx-auto w-11/12 xl:w-3/4">
					<UseFulLinksContent usefulLinksSections={usefulLinksSections} />
				</section>
			</main>
			<Footer />
		</>
	);
}
