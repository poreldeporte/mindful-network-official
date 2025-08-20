import React from "react";
import { VariantType } from "@/models";

type ColorType =
	| "white"
	| "black"
	| "darkGray"
	| "lightGray"
	| "blue"
	| "green";

const variantClasses: Record<VariantType, string> = {
	h1: "text-[5rem] leading-tight",
	h2: "text-[3rem] leading-tight",
	h3: "text-[2rem] leading-tight",
	body: "text-[1.5rem] leading-relaxed",
	bodySmall: "text-[1.125rem] leading-relaxed",
	bodyXSmall: "text-[1rem] leading-relaxed",
};

const colorClasses: Record<ColorType, string> = {
	white: "text-white",
	black: "text-[#3C3D42]",
	blue: "text-blue-500",
	green: "text-green-500",
	darkGray: "text-[#3C3D42]",
	lightGray: "text-gray-400",
};

interface TypographyProps {
	as?: keyof JSX.IntrinsicElements;
	variant: VariantType;
	color: ColorType;
	className?: string;
	children?: React.ReactNode;
	id?: string;
}

export const Typography: React.FC<TypographyProps> = ({
	as: Tag = "span",
	variant,
	color,
	className = "",
	id,
	...props
}) => {
	const variantClass = variantClasses[variant] || "";
	const colorClass = colorClasses[color] || "";
	const classes = `${variantClass} ${colorClass} ${className}`.trim();

	return React.createElement(
		Tag,
		{ className: classes, id, ...props },
		props.children
	);
};
