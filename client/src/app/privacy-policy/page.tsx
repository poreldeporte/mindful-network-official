"use client";
import { PrivacyPolicyBody } from "@/routes/privacy-policy";
import { Topbar, Footer } from "@/components/shared";

export default function PrivacyPolicy() {
	return (
		<main aria-labelledby="privacy-policy-page">
			<Topbar />
			<section className="min-h-screen mx-auto w-11/12 xl:w-3/4">
				<PrivacyPolicyBody />
			</section>

			<Footer />
		</main>
	);
}
