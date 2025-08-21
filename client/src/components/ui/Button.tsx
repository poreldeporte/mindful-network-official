"use client";

import React from "react";
import { Typography } from "./Typography";
import { VariantType } from "@/models";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	className?: string;
	form?: "primary" | "secondary" | "outline" | "outline-blue" | "outline-white";
	variant: VariantType;
	isLoading?: boolean;
	isSelected?: boolean;
	textColor?: "white" | "black" | "green" | "blue";
}

export function Button({
	children,
	className,
	variant,
	form = "outline",
	isLoading,
	isSelected = false,
	textColor = "green",
	...props
}: Props) {
	const getButtonStyles = () => {
		if (isSelected) {
			return "bg-green-500 hover:bg-green-700 text-white";
		}

		switch (form) {
			case "primary":
				return "bg-green-500 hover:bg-green-700 text-white";
			case "secondary":
				return "bg-blue-500 hover:bg-blue-700 text-white";
			case "outline":
				return "bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-white group";
			case "outline-blue":
				return "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white group";
			case "outline-white":
				return "bg-transparent border border-white text-white hover:bg-white hover:text-black group";
			default:
				return "bg-green-500 hover:bg-green-700 text-white";
		}
	};

	const getTypographyColor = () => {
		if (isSelected) return "white";

		switch (form) {
			case "outline":
				return "green";
			case "outline-blue":
				return "blue";
			case "outline-white":
				return "white";
			default:
				return textColor;
		}
	};

	const buttonStyles = getButtonStyles();

	return (
		<button
			{...props}
			className={`${className} ${buttonStyles} ${
				props.disabled ? "opacity-50 cursor-not-allowed" : ""
			} transition-colors px-4 py-2 rounded-full font-medium`}
		>
			<Typography
				className={`flex items-center gap-2 justify-center ${
					form === "outline" ? "group-hover:text-white" : ""
				} ${form === "outline-blue" ? "group-hover:text-white" : ""} ${
					form === "outline-white" ? "group-hover:text-black" : ""
				}`}
				as="span"
				variant={variant}
				color={getTypographyColor()}
			>
				{isLoading ? (
					<div className="flex items-center gap-2">
						Loading...
						<div
							className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
							role="status"
						>
							<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
								Loading...
							</span>
						</div>
					</div>
				) : (
					children
				)}
			</Typography>
		</button>
	);
}
