export const PsychologistCardSkeleton = () => {
	return (
		<li className="w-full h-full animate-pulse">
			<div className="h-full rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
				<div className="rounded-3xl bg-orange-50 p-2">
					<div className="grid grid-cols-1 gap-2 sm:grid-cols-[45%_40%_15%]">
						<div className="h-48 rounded-2xl bg-gray-200 sm:h-44" />
						<div className="hidden h-44 rounded-2xl bg-gray-200 sm:block" />
						<div className="hidden h-44 rounded-2xl bg-gray-200 sm:block" />
					</div>
				</div>

				<div className="space-y-3 pt-4">
					<div className="h-3 w-32 rounded bg-gray-200" />
					<div className="h-6 w-1/2 rounded bg-gray-200" />
					<div className="flex flex-wrap gap-2">
						<div className="h-5 w-24 rounded-full bg-gray-200" />
						<div className="h-5 w-20 rounded-full bg-gray-200" />
					</div>
					<div className="flex flex-wrap gap-2">
						<div className="h-5 w-24 rounded-full bg-gray-200" />
						<div className="h-5 w-20 rounded-full bg-gray-200" />
						<div className="h-5 w-16 rounded-full bg-gray-200" />
					</div>
					<div className="space-y-2">
						<div className="h-3 w-full rounded bg-gray-200" />
						<div className="h-3 w-2/3 rounded bg-gray-200" />
					</div>
					<div className="flex flex-wrap gap-3">
						<div className="h-3 w-20 rounded bg-gray-200" />
						<div className="h-3 w-16 rounded bg-gray-200" />
						<div className="h-3 w-12 rounded bg-gray-200" />
					</div>
					<div className="flex gap-2 pt-1">
						<div className="h-7 w-20 rounded-full bg-gray-200" />
						<div className="h-7 w-24 rounded-full bg-gray-200" />
					</div>
				</div>
			</div>
		</li>
	);
};
