"use client";

import React from "react";
import { Typography } from "./Typography";
import { VariantType } from "@/models";

interface Props {
  children: React.ReactNode;
  className?: string;
  variant: VariantType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  className,
  variant,
  onClick,
  type = "button",
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} bg-blue-500 transition-colors hover:bg-blue-700 text-white`}
    >
      <Typography
        className="flex items-center gap-2"
        as="span"
        variant={variant}
        color="white"
      >
        {children}
      </Typography>
    </button>
  );
}
