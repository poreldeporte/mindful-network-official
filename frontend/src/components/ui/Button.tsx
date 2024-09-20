import React from "react"
import { Typography } from "./Typography"
import { VariantType } from "@/models"

interface Props {
    children: React.ReactNode
    className?: string
    variant: VariantType
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function Button({ children, className, variant, onClick }: Props) {
    return (
        <button onClick={onClick} className={`${className} bg-blue-500 text-white p-2`}>
            <Typography as = "span" variant={variant} color="white">
                {children}
            </Typography>
        </button>
    )
}
