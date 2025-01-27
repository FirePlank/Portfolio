import * as React from "react"

import {cn} from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, ...props}, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-[48px] rounded-lg border border-white/10 focus:border-accent font-light bg-primary px-4 py-5 text-base placeholder:text-white/60 outline-none transition-all",
                    className
                )}
                style={{transitionDuration: "250ms"}}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export {Input}
