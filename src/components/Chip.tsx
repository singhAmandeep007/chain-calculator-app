import React from "react";

import { cn } from "../utils/cn";

export type TChipProps = React.HTMLAttributes<HTMLDivElement>;

export const Chip: React.FC<TChipProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("whitespace-nowrap rounded-full px-4 py-1 text-xs text-white", className)}
      {...props}
    >
      {children}
    </div>
  );
};
