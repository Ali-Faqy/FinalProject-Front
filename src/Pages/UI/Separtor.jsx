"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

const Separtor = React.forwardRef(
  ({ className = "", orientation = "horizontal", decorative = false, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={`bg-gray-200 ${orientation === "horizontal" ? "h-px w-full" : "h-full w-px"} ${className}`}
      {...props}
    />
  )
)

Separtor.displayName = SeparatorPrimitive.Root.displayName

export { Separtor }
