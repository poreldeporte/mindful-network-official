import { AllBlogsHero } from "@/routes/events/components/hero";
import { EventsFooter } from "@/routes/events/components/footer";
import { EventsContainer } from "@/routes/events/components/events-container";
import { Suspense } from "react";

export default async function EventsPage() {
	return (
		<>
			<AllBlogsHero />
			<Suspense fallback={<div>loading...</div>}>
				<EventsContainer />
			</Suspense>
			<EventsFooter />
		</>
	);
}
