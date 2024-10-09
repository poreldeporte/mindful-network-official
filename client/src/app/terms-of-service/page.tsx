"use client";
import { TermsOfServiceBody } from "@/routes/terms-of-service";
import { Topbar, Footer, MobileTopBar } from "@/components/shared";

export default function TermsOfService() {
	return (
		<main aria-labelledby="terms-of-service-page">
			<Topbar />
			<MobileTopBar />
			<section className="h-max mx-auto w-11/12 xl:w-3/4">
				<TermsOfServiceBody />
			</section>

			<Footer />
		</main>
	);
}
