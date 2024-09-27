"use client";

import React from "react";
import { Typography } from "./Typography";
import { VariantType } from "@/models";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant: VariantType;
  isLoading?: boolean;
}

export function Button({
  children,
  className,
  variant,
  isLoading,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`${className} ${
        props.disabled
          ? "bg-blue-300 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-700"
      }  transition-colors  text-white`}
    >
      <Typography
        className="flex items-center gap-2"
        as="span"
        variant={variant}
        color="white"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            Loading...
            <div
              className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"
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
