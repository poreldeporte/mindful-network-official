"use client";

import { PsychologistModel } from "@/models";
import { GetInTouch } from "@/routes/psychologists/components/getInTouch";
import { useEffect } from "react";
import { AboutSection } from "./AboutSection";
import { HighlightsRow } from "./HighlightsRow";
import { InsuranceSection } from "./InsuranceSection";
import { ListingHero } from "./ListingHero";
import { mapPsychologistToListingDetail } from "./listingDetailMapper";
import { MobileContactBar } from "./MobileContactBar";
import { OverviewSpec } from "./OverviewSpec";
import { SectionTabs } from "./SectionTabs";
import { ServicesSection } from "./ServicesSection";
import { StickyContactCard } from "./StickyContactCard";

interface ListingDetailPageProps {
	psychologist: PsychologistModel;
}

export const ListingDetailPage = ({ psychologist }: ListingDetailPageProps) => {
	const viewModel = mapPsychologistToListingDetail(psychologist);
	const contactAnchor = "#get-in-touch";
	const tabs = viewModel.sections
		.filter((section) => section.isVisible)
		.map((section) => ({ id: section.id, label: section.label }));

	useEffect(() => {
		const previousBodyBackground = document.body.style.backgroundColor;
		const previousHtmlBackground =
			document.documentElement.style.backgroundColor;

		document.body.style.backgroundColor = "#fef9ef";
		document.documentElement.style.backgroundColor = "#fef9ef";

		return () => {
			document.body.style.backgroundColor = previousBodyBackground;
			document.documentElement.style.backgroundColor = previousHtmlBackground;
		};
	}, []);

	useEffect(() => {
		const tabsElement = document.querySelector<HTMLElement>(
			"[data-detail-tabs]"
		);

		if (!tabsElement) return;

		let rafId = 0;

		const getVisibleHeader = () => {
			const headers = Array.from(
				document.querySelectorAll<HTMLElement>(".site-header")
			);
			return headers.find(
				(header) => getComputedStyle(header).display !== "none"
			);
		};

		const updateHeaderState = () => {
			const header = getVisibleHeader();
			const headerBottom = header
				? header.getBoundingClientRect().bottom
				: 0;
			const tabsTop = tabsElement.getBoundingClientRect().top;
			const tabsHeight = tabsElement.getBoundingClientRect().height;
			const shouldHideHeader = tabsTop <= headerBottom + 8;

			document.body.classList.toggle(
				"detail-subnav-active",
				shouldHideHeader
			);
			document.documentElement.style.setProperty(
				"--subnav-top",
				shouldHideHeader
					? "12px"
					: "calc(var(--site-header-height) + 12px)"
			);
			document.documentElement.style.setProperty(
				"--subnav-height",
				`${Math.round(tabsHeight)}px`
			);
		};

		const handleScroll = () => {
			if (rafId) return;
			rafId = window.requestAnimationFrame(() => {
				rafId = 0;
				updateHeaderState();
			});
		};

		updateHeaderState();
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);

		return () => {
			if (rafId) {
				window.cancelAnimationFrame(rafId);
			}
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
			document.body.classList.remove("detail-subnav-active");
			document.documentElement.style.removeProperty("--subnav-top");
			document.documentElement.style.removeProperty("--subnav-height");
		};
	}, []);

	return (
		<section className="relative min-h-screen w-full bg-[#fef9ef] pt-[var(--site-header-height)]">
			<div className="relative mx-auto w-11/12 xl:w-3/4 pb-24 pt-6 lg:pt-8 lg:pb-10 space-y-6">
				<ListingHero viewModel={viewModel} />

				{tabs.length > 0 && <SectionTabs sections={tabs} />}

				<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
					<div className="space-y-6">
						<AboutSection
							id="about"
							name={viewModel.name}
							description={viewModel.description}
							subtitle={viewModel.subtitle}
							videoUrl={viewModel.videoUrl}
						/>

						<HighlightsRow highlights={viewModel.highlights} />

						<OverviewSpec id="overview" items={viewModel.overviewItems} />

						<InsuranceSection
							id="insurance"
							insurances={viewModel.insuranceList}
							slidingScale={viewModel.slidingScale}
							showInsurances={viewModel.showInsurances}
						/>

						<ServicesSection
							id="services"
							serviceTypes={viewModel.serviceTypes}
							therapyOptions={viewModel.therapyOptions}
						/>
					</div>

					<StickyContactCard
						viewModel={viewModel}
						contactAnchor={contactAnchor}
					/>
				</div>

				<GetInTouch {...psychologist} />
			</div>

			<MobileContactBar
				phone={viewModel.contact.phone}
				contactAnchor={contactAnchor}
			/>
		</section>
	);
};
