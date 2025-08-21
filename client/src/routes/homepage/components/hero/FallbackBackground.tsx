import "./hero.css";
import { HeroBackground } from "@/models";

interface FallbackBackgroundProps {
	heroBackground?: HeroBackground;
}

export const FallbackBackground = ({
	heroBackground,
}: FallbackBackgroundProps) => {
	return (
		<div className="absolute inset-0">
			{heroBackground?.url && (
				<div
					className="absolute inset-0 hero-fallback-blur"
					style={{
						backgroundImage:
							heroBackground.mediaType === "image"
								? `url(${heroBackground.url})`
								: "none",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
			)}

			{heroBackground?.mediaType === "video" && heroBackground.url && (
				<video
					src={heroBackground.url}
					muted
					loop
					playsInline
					className="absolute inset-0 w-full h-full object-cover hero-fallback-blur"
					style={{
						objectPosition: "center",
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
