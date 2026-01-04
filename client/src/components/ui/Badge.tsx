import { XMarkIcon } from "@heroicons/react/24/outline";

export type ColorType = "orange" | "green" | "blue";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	className?: string;
	isSelected?: boolean;
	showIcon?: boolean;
	color?: ColorType;
	onClick?: () => void;
}

export const BadgeSkeleton = () => {
	return (
		<button className="text-xs rounded-full px-2.5 py-0.5 border font-medium focus:outline-none" />
	);
};

export const Badge = ({
	children,
	className = "",
	isSelected = true,
	color = "orange",
	showIcon = false,
	onClick,
	...props
}: Props) => {
	const colorClasses: Record<ColorType, string> = {
		orange: `${
			isSelected ? "bg-orange-700 text-white" : "bg-transparent text-black"
		} border-orange-700`,
		green: `${
			isSelected ? "bg-blue-600 text-white" : "bg-transparent text-black"
		} border-blue-600`,
		blue: `${
			isSelected ? "bg-blue-600 text-white" : "bg-transparent text-black"
		} border-blue-600`,
	};

	const colorClass = colorClasses[color] || "";

	return (
		<button
			className={`${colorClass} inline-flex items-center gap-1.5 whitespace-nowrap text-xs rounded-full px-2.5 py-0.5 border font-medium focus:outline-none ${className}`}
			onClick={onClick}
			{...props}
		>
			{children}
			{isSelected && showIcon && (
				<XMarkIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
			)}
		</button>
	);
};
