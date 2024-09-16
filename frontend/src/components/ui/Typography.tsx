import React from "react";

type VariantType = "h1" | "h2" | "h3" | "large" | "medium" | "small" | "xsmall";
type ColorType = "white" | "black";

const variantClasses: Record<VariantType, string> = {
  h1: "text-6xl",
  h2: "",
  h3: "",
  large: "",
  medium: "",
  small: "",
  xsmall: "",
};

const colorClasses: Record<ColorType, string> = {
  white: "text-white",
  black: "text-black-950",
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
