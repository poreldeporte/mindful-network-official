"use client";
import { TermsOfServiceBody } from "@/routes/terms-of-service";
import { Topbar, Footer, MobileTopBar } from "@/components/shared";

export default function TermsOfService() {
	return (
		<>
			<Topbar />
			<MobileTopBar />
			<main aria-labelledby="terms-of-service-page">
				<section className="h-max mx-auto w-11/12 xl:w-3/4">
					<TermsOfServiceBody />
				</section>
			</main>
			<Footer />
		</>
	);
}
