"use client";

import React from "react";
import { Typography } from "./Typography";
import { VariantType } from "@/models";

interface Props {
  children: React.ReactNode;
  className?: string;
  variant: VariantType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({ children, className, variant, onClick }: Props) {
  return (
    <button onClick={onClick} className={`${className} bg-blue-500 text-white`}>
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
