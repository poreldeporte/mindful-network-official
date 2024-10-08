"use client";
import { TermsOfServiceBody } from "@/routes/terms-of-service";
import { Topbar, Footer } from "@/components/shared";

export default function TermsOfService() {
	return (
		<main aria-labelledby="privacy-policy-page">
			<Topbar />
			<section className="min-h-screen mx-auto w-11/12 xl:w-3/4">
				<TermsOfServiceBody />
			</section>

			<Footer />
		</main>
	);
}
