import type { PageContent } from "@/lib/seo-landing-pages";

function ProseBlock({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
	return (
		<div>
			<h2 className="font-antic text-2xl leading-none text-slate-900 lg:text-3xl">{heading}</h2>
			<div className="mt-3 space-y-3">
				{paragraphs.map((p, i) => (
					<p key={i} className="text-sm leading-relaxed text-slate-600">
						{p}
					</p>
				))}
			</div>
		</div>
	);
}

/**
 * Server-rendered prose body for /find/ landing pages: facet block + city block
 * + the live "About these providers" sentence. Rendered in static SSR HTML
 * (outside the SearchWrapper Suspense boundary) so Googlebot indexes it as the
 * page's unique content. Renders nothing if no content is available yet.
 */
export function LandingPageBody({ content }: { content: PageContent }) {
	const { facet, city, statsSentence } = content;
	if (!facet && !city && !statsSentence) return null;

	return (
		<section className="page-width pb-10" aria-label="About care and the providers on this page">
			<div className="space-y-8 rounded-[2rem] border border-slate-100 bg-white p-7 shadow-sm lg:p-10">
				{facet && <ProseBlock heading={facet.heading} paragraphs={facet.paragraphs} />}
				{city && <ProseBlock heading={city.heading} paragraphs={city.paragraphs} />}
				{statsSentence && (
					<div>
						<h2 className="font-antic text-2xl leading-none text-slate-900 lg:text-3xl">
							About these providers
						</h2>
						<p className="mt-3 text-sm leading-relaxed text-slate-600">{statsSentence}</p>
					</div>
				)}
			</div>
		</section>
	);
}

/**
 * Server-rendered FAQ block. Rendered after the provider list. Pairs with the
 * FAQPage JSON-LD emitted on the page. Renders nothing if there are no FAQs.
 */
export function LandingPageFaq({ faqs }: { faqs: PageContent["faqs"] }) {
	if (!faqs.length) return null;

	return (
		<section className="page-width pb-10" aria-labelledby="landing-faq-heading">
			<div className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-sm lg:p-10">
				<h2
					id="landing-faq-heading"
					className="font-antic text-2xl leading-none text-slate-900 lg:text-3xl"
				>
					Frequently asked questions
				</h2>
				<dl className="mt-6 space-y-6">
					{faqs.map((f, i) => (
						<div key={i}>
							<dt className="text-sm font-semibold text-slate-900">{f.q}</dt>
							<dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
