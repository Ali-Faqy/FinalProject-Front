import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

const Switch = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <SwitchPrimitives.Root
      ref={ref}
      className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors bg-[#d3d3d3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-teal-DEFAULT data-[state=unchecked]:bg-input ${className}`}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={`pointer-events-none block h-5 w-5 rounded-full bg-[#ffffff] shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0`}
      />
    </SwitchPrimitives.Root>
  )
)

Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
