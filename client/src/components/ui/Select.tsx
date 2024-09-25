"use client";

import React from "react";
import { Typography } from "./Typography";
import { VariantType } from "@/models";

interface SelectProps {
  options: string[];
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  className?: string;
  variant: VariantType;
}

export function Select({
  options,
  placeholder,
  value,
  setValue,
  className,
  variant,
}: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <select
      className={`${className} bg-blue-500 h-full pl-4 text-white`}
      value={value}
      onChange={handleChange}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
