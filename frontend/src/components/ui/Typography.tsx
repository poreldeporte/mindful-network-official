import React from "react";

type VariantType =
  | "xxlarge"
  | "xlarge"
  | "large"
  | "medium"
  | "small"
  | "xsmall";
type ColorType = "white" | "black";

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
