import ProfessionalTOC from "@/components/shared/ProfessionalTOC";
import { PsychologistModel } from "@/models";
import {
	GetInTouch,
	ProfileCard,
	PsychologistAbout,
	StickyButton,
} from "@/routes/psychologists/components";

interface LegacyProfessionalLayoutProps {
	psychologist: PsychologistModel;
}

export const LegacyProfessionalLayout = ({
	psychologist,
}: LegacyProfessionalLayoutProps) => {
	return (
		<>
			<div
				className="fixed inset-0 bg-[#fef9ef] pointer-events-none"
				aria-hidden="true"
			/>
			<section className="relative min-h-screen w-full">
				<div className="mx-auto w-11/12 xl:w-3/4 mt-24 lg:grid lg:grid-cols-6 lg:items-start lg:mt-28 lg:gap-x-5">
					<div className="lg:col-span-4">
						<ProfileCard {...psychologist} />
						<PsychologistAbout {...psychologist} />
					</div>
					<div className="lg:col-span-2 lg:relative h-full">
						<div className="sticky top-28 space-y-5">
							<ProfessionalTOC psychologist={psychologist} />
							<StickyButton />
						</div>
					</div>
					<GetInTouch {...psychologist} />
				</div>
			</section>
		</>
	);
};
