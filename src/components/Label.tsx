import React from "react";

import { cn } from "../utils/cn";

export type TLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ className, children, ...props }: TLabelProps) => (
  <label
    className={cn("mb-1 block text-sm text-[var(--p45)]", className)}
    {...props}
  >
    {children}
  </label>
);
