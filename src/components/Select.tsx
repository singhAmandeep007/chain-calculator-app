import React from "react";

import { cn } from "../utils/cn";

import ChevronDown from "./../assets/chevron-down.svg?react";

export type TSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select: React.FC<TSelectProps> = ({ className, children, ...props }) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "block w-full appearance-none rounded-md border border-[var(--p46)] px-3 py-2 text-sm disabled:bg-[var(--p47)]",
          className,
          {
            "text-[var(--p44)]": props.disabled,
          }
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--p46)]" />
    </div>
  );
};
