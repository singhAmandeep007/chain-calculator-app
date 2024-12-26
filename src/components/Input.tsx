import React from "react";

import { cn } from "../utils/cn";

export type TInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, TInputProps>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex w-full rounded-lg border border-[var(--p46)] px-3 py-2 text-sm disabled:cursor-not-allowed",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
