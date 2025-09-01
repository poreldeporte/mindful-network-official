import { TermsOfServiceBody } from "@/routes/terms-of-service";

export default function TermsOfService() {
	return (
		<main aria-labelledby="terms-of-service-page">
			<section className="h-max mx-auto w-11/12 xl:w-3/4">
				<TermsOfServiceBody />
			</section>
		</main>
	);
}
