import React from "react";
import { VariantType } from "@/models";

type ColorType = "white" | "black" | "darkGray";

const variantClasses: Record<VariantType, string> = {
  xxlarge: "text-5xl",
  xlarge: "text-4xl",
  large: "text-2xl",
  medium: "text-lg",
  small: "text-md",
  xsmall: "text-sm",
};

const colorClasses: Record<ColorType, string> = {
  white: "text-white",
  black: "text-gray-950",
  darkGray: "text-gray-700",
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
