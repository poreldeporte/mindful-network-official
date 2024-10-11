import { Topbar, Footer, MobileTopBar } from "@/components/shared";
import { UseFulLinksContent } from "@/routes/useful-links";

export default function UsefulLinks() {
	return (
		<>
			<Topbar />
			<MobileTopBar />
			<main aria-labelledby="privacy-policy-page">
				<section className="h-max mx-auto w-11/12 xl:w-3/4">
					<UseFulLinksContent />
				</section>
			</main>
			<Footer />
		</>
	);
}
