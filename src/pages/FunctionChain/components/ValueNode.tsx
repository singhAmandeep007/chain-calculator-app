import React from "react";

import { Chip } from "../../../components/Chip";

import { cn } from "../../../utils/cn";
import { Connector, TConnectorProps } from "./Connector";

type TEditableValueNodeProps = {
  isEditable?: true;
  label: string;
  value: number | string;
  className?: string;

  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

type TReadOnlyValueNodeProps = {
  isEditable?: false;
  label: string;
  value: number | string;
  className?: string;

  onValueChange?: never;
  inputProps?: never;
};

type TValueNodeProps = {
  isEditable?: boolean;
  connectorProps?: TConnectorProps;
} & (TEditableValueNodeProps | TReadOnlyValueNodeProps) &
  React.HTMLAttributes<HTMLDivElement>;

export const ValueNode: React.FC<TValueNodeProps> = ({
  label,
  value,
  isEditable = false,
  className,
  onValueChange,
  inputProps,
  connectorProps,
  ...props
}) => {
  return (
    <div
      className={cn("flex flex-col items-start gap-2", className)}
      {...props}
    >
      <Chip className={`${isEditable ? "bg-[var(--p10)]" : "bg-[var(--p20)]"}`}>{label}</Chip>
      <div
        className={cn(
          "relative flex w-full items-center justify-start rounded-xl border-2 bg-white p-2",
          isEditable ? "flex-row-reverse border-[var(--p11)]" : "border-[var(--p21)]"
        )}
      >
        <Connector
          className={isEditable ? "ml-4" : "mr-4"}
          {...connectorProps}
        />
        <div
          className={`absolute h-full w-px ${isEditable ? "right-8 bg-[var(--p12)]" : "left-8 bg-[var(--p22)]"}`}
        ></div>

        {isEditable ? (
          <input
            value={value}
            onChange={onValueChange}
            className="w-full flex-1 bg-transparent text-center font-semibold text-black focus:outline-none"
            {...inputProps}
          />
        ) : (
          <span className="max-w-16 flex-1 overflow-scroll text-center font-semibold text-black">{value}</span>
        )}
      </div>
    </div>
  );
};
