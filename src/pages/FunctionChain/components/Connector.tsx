import { FC, PropsWithChildren } from "react";

import { cn } from "../../../utils/cn";

export type TConnectorProps = React.HTMLAttributes<HTMLDivElement>;

export const Connector: FC<PropsWithChildren<TConnectorProps>> = ({ className, ...props }) => {
  return (
    <div
      className={cn(`rounded-full border-2 border-[var(--p42)] p-0.5`, className)}
      {...props}
    >
      <div className="h-2 w-2 rounded-full bg-[var(--p31)]"></div>
    </div>
  );
};
