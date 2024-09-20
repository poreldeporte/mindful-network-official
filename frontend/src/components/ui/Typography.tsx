import React from "react";
import { VariantType } from "@/models";

type ColorType = "white" | "black" | "darkGray" | "lightGray";

const variantClasses: Record<VariantType, string> = {
  xxlarge: "text-3xl md:text-4xl xl:text-5xl",
  xlarge: "text-2xl md:text-3xl xl:text-4xl",
  large: "text-xl xl:text-2xl",
  medium: "text-md xl:text-lg",
  small: "text-sm xl:text-md",
  xsmall: "text-xs xl:text-sm",
  title: "text-3xl md:text-4xl xl:text-5xl font-antic",
  subtitle: "text-2xl md:text-3xl xl:text-4xl font-antic"
};

const colorClasses: Record<ColorType, string> = {
  white: "text-white",
  black: "text-gray-950",
  darkGray: "text-gray-700",
  lightGray: "text-gray-400"
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
