import { Topbar, Footer, MobileTopBar } from "@/components/shared";
import { UseFulLinksContent } from "@/routes/useful-links";

export default function UsefulLinks() {
	return (
		<main aria-labelledby="privacy-policy-page">
			<Topbar />
			<MobileTopBar />
			<section className="h-max mx-auto w-11/12 xl:w-3/4">
				<UseFulLinksContent />
			</section>

			<Footer />
		</main>
	);
}
