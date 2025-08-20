import "./hero.css";

interface FallbackBackgroundProps {
	imageUrl?: string;
}

export const FallbackBackground = ({ imageUrl }: FallbackBackgroundProps) => {
	return (
		<div className="absolute inset-0">
			{imageUrl && (
				<div
					className="absolute inset-0 hero-fallback-blur"
					style={{
						backgroundImage: `url(${imageUrl})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
			)}

			<div className="absolute inset-0 bg-gradient-to-br from-gray-800/70 via-gray-700/60 to-gray-900/80" />

			<div className="absolute inset-0 hero-pulse">
				<div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
			</div>
		</div>
	);
};
