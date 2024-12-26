import React from "react";

import dragSvg from "../../../assets/drag.svg";

import { TFunctionNode, TVariableMap } from "../FunctionChain.types";

import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import { Label } from "../../../components/Label";
import { Connector } from "./Connector";

import { Edge } from "./Edge";

import { populateEquation, validateEquation } from "../FunctionChain.utils";

export type TFunctionCardProps = TFunctionNode & {
  functions: TFunctionNode[];
  onEquationChange?: (id: number, newEquation: string) => void;
  onNextFunctionChange?: (id: number, newNextFunctionId: number | null) => void;
  variableMap?: TVariableMap;
};

export const FunctionCard: React.FC<TFunctionCardProps> = ({
  id,
  equation,
  nextFunctionId,
  onEquationChange,
  onNextFunctionChange,
  functions,
  variableMap,
}) => {
  const isEquationValid = validateEquation(populateEquation(equation, variableMap));

  return (
    <div
      className={`flex w-60 min-w-max cursor-pointer flex-col rounded-2xl border border-solid border-[var(--p43)] bg-white px-5 py-4 text-xs shadow-[0px_0px_6px_rgba(0,0,0,0.05)] transition-all duration-200`}
    >
      <div className="flex items-center gap-2 self-start text-sm font-medium text-[var(--p44)]">
        <img
          loading="lazy"
          src={dragSvg}
          alt={`Function ${id} icon`}
          className="my-auto w-3 shrink-0 object-contain"
        />
        <div>Function: {id}</div>
      </div>

      <Label
        className="mt-5 self-start"
        htmlFor="equation"
      >
        Equation
      </Label>

      <Input
        value={equation}
        id="equation"
        onChange={(e) => {
          onEquationChange?.(id, e.target.value);
        }}
      />

      {!isEquationValid && <p className="py-1 text-red-500">Invalid equation</p>}

      <Label className="mt-5 self-start">Next function</Label>

      <Select
        disabled
        onChange={(e) => {
          const newNextFunctionId = !e.target.value ? null : parseInt(e.target.value, 10);
          onNextFunctionChange?.(id, newNextFunctionId);
        }}
        value={nextFunctionId || ""}
      >
        <option
          label={"-"}
          value={undefined}
        ></option>
        {functions.map((func) => {
          return (
            <option
              key={func.id}
              value={func.id}
            >
              Function: {func.id}
            </option>
          );
        })}
      </Select>

      <div className="mt-11 flex w-full gap-10 text-xs">
        <div className="flex flex-1 gap-1">
          <Connector id={`input-${id}`} />
          <div className="text-[var(--p48)]">input</div>
        </div>

        <div className="flex flex-1 flex-row-reverse gap-1">
          <Connector id={`output-${id}`} />
          <div className="text-[var(--p48)]">output</div>
        </div>
      </div>

      <Edge
        outputElementId={`output-${id}`}
        inputElementId={`input-${nextFunctionId}`}
      />
    </div>
  );
};
