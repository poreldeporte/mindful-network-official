"use client";
import { PrivacyPolicyBody } from "@/routes/privacy-policy";
import { Topbar, Footer, MobileTopBar } from "@/components/shared";

export default function PrivacyPolicy() {
	return (
		<>
			<Topbar />
			<MobileTopBar />
			<main aria-labelledby="privacy-policy-page">
				<section className="min-h-screen mx-auto w-11/12 xl:w-3/4">
					<PrivacyPolicyBody />
				</section>
			</main>
			<Footer />
		</>
	);
}
