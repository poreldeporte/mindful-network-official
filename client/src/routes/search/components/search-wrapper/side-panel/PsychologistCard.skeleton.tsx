export const PsychologistCardSkeleton = () => {
	return (
		<li className="grid lg:grid-cols-[auto_1fr_auto] w-full py-5 px-2.5 gap-2 lg:gap-10 items-start border-b border-gray-200 animate-pulse">
			<div className="flex items-start justify-center md:justify-start w-full">
				<div className="w-32 h-32 rounded-full bg-gray-200" />
			</div>

			<div className="flex flex-col gap-4">
				<div className="flex flex-col w-full items-center md:items-start">
					<div className="h-6 w-48 bg-gray-200 rounded mb-2" />
					<div className="h-5 w-24 bg-gray-200 rounded" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex gap-1">
						<div className="min-h-5 min-w-5 rounded bg-gray-200" />
						<div className="flex-1">
							<div className="h-5 w-3/4 bg-gray-200 rounded" />
						</div>
					</div>

					<div className="flex gap-1">
						<div className="min-h-5 min-w-5 rounded bg-gray-200" />
						<div className="flex-1">
							<div className="h-5 w-3/4 bg-gray-200 rounded" />
						</div>
					</div>

					<div className="flex gap-1">
						<div className="min-h-5 min-w-5 rounded bg-gray-200" />
						<div className="flex-1">
							<div className="h-5 w-3/4 bg-gray-200 rounded" />
						</div>
					</div>

					<div className="flex gap-1">
						<div className="min-h-5 min-w-5 rounded bg-gray-200" />
						<div className="flex-1">
							<div className="h-5 w-3/4 bg-gray-200 rounded" />
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-end items-end h-full mt-2">
				<div className="px-4 py-2 w-full md:w-24 h-9 bg-gray-200 rounded-full" />
			</div>
		</li>
	);
};
