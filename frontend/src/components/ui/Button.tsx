import React from "react"
import { Typography } from "./Typography"
import { VariantType } from "@/models"

interface Props {
    children: React.ReactNode
    className?: string
    variant: VariantType
}

export function Button({ children, className, variant }: Props) {
    return (
        <button className={`${className} bg-blue-500 text-white `}>
            <Typography as = "span" variant={variant} color="white">
                {children}
            </Typography>
        </button>
    )
}
