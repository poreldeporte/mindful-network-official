import { Suspense } from "react";

export default async function EventsPage() {
	return (
		<>
			<Suspense fallback={<div>loading...</div>}>
				<section>Events page</section>
			</Suspense>
		</>
	);
}
