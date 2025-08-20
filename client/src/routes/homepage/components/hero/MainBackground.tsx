import "./hero.css";

interface MainBackgroundProps {
	imageUrl: string;
}

export const MainBackground = ({ imageUrl }: MainBackgroundProps) => {
	return (
		<div
			className="absolute inset-0 hero-background hero-fade-in"
			style={{
				backgroundImage: `url(${imageUrl})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundAttachment: "fixed",
			}}
		/>
	);
};
