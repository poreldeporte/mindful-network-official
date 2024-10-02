import React from "react";
import { VariantType } from "@/models";

type ColorType = "white" | "black" | "darkGray" | "lightGray";

const variantClasses: Record<VariantType, string> = {
  xxlarge: "text-xl md:text-2xl xl:text-3xl leading-tight",
  xlarge: "text-base md:text-lg xl:text-xl leading-tight",
  large: "text-sm md:text-base xl:text-lg leading-tight",
  medium: "text-xs xl:text-sm",
  small: "text-[20px]",
  xsmall: "text-xs",
  title: "text-xl md:text-2xl xl:text-3xl font-antic leading-tight",
  subtitle: "text-base md:text-lg xl:text-xl font-antic",
};

const colorClasses: Record<ColorType, string> = {
  white: "text-white",
  black: "text-gray-950",
  darkGray: "text-gray-700",
  lightGray: "text-gray-400",
};

interface TypographyProps {
  as?: keyof JSX.IntrinsicElements;
  variant: VariantType;
  color: ColorType;
  className?: string;
  children?: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  as: Tag = "span",
  variant,
  color,
  className = "",
  ...props
}) => {
  const variantClass = variantClasses[variant] || "";
  const colorClass = colorClasses[color] || "";
  const classes = `${variantClass} ${colorClass} ${className}`.trim();

  return React.createElement(
    Tag,
    { className: classes, ...props },
    props.children
  );
};
