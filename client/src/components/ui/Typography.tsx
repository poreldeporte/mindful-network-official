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
	xxlarge: "text-lg md:text-xl xl:text-2xl leading-tight",
	xlarge: "text-base md:text-lg xl:text-xl leading-tight",
	large: "text-sm md:text-base xl:text-lg leading-tight",
	medium: "text-sm xl:text-sm",
	small: "text-xs xl:text-[18px]",
	xsmall: "text-[12px] xl:text-xs",
	title: "text-lg md:text-xl xl:text-2xl font-antic leading-tight",
	subtitle: "text-base md:text-lg xl:text-xl font-antic",
	item: "text-[16px]",
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
