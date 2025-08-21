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
	h1: "text-[2.5rem] leading-tight sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem]",
	h2: "text-[1.75rem] leading-tight sm:text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] xl:text-[3rem]",
	h3: "text-[1.25rem] leading-tight sm:text-[1.5rem] md:text-[1.75rem] lg:text-[1.875rem] xl:text-[2rem]",
	body: "text-[1rem] leading-relaxed sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1.375rem] xl:text-[1.5rem]",
	bodySmall:
		"text-[0.875rem] leading-relaxed sm:text-[1rem] md:text-[1.0625rem] lg:text-[1.125rem]",
	bodyXSmall:
		"text-[0.75rem] leading-relaxed sm:text-[0.875rem] md:text-[0.9375rem] lg:text-[1rem]",
};

const colorClasses: Record<ColorType, string> = {
	white: "text-white",
	black: "text-[#3C3D42]",
	blue: "text-blue-500",
	green: "text-blue-500",
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
