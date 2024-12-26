import { useCallback, useMemo, useState } from "react";

import { evaluateEquation } from "./FunctionChain.utils";

import { ValueNode } from "./components/ValueNode";

import { FunctionCard } from "./components/FunctionCard";

import { TFunctionNode } from "./FunctionChain.types";
import { Edge } from "./components/Edge";

const initialFunctions: TFunctionNode[] = [
  {
    id: 1,
    equation: "x^2",
    nextFunctionId: 2,
  },
  {
    id: 4,
    equation: "x-2",
    nextFunctionId: 5,
  },

  {
    id: 2,
    equation: "2*x+4",
    nextFunctionId: 4,
  },
  {
    id: 5,
    equation: "x/2",
    nextFunctionId: 3,
  },
  {
    id: 3,
    equation: "x*2+20",
    nextFunctionId: null,
  },
];
export const FunctionChain = () => {
  const [functions, setFunctions] = useState<TFunctionNode[]>(initialFunctions);

  const [initialValue, setInitialValue] = useState<number>(4);

  const handleEquationChange = useCallback((id: number, equation: string) => {
    setFunctions((prevFunctions) => prevFunctions.map((func) => (func.id === id ? { ...func, equation } : func)));
  }, []);

  const handleNextFunctionChange = useCallback((id: number, nextFunctionId: number | null) => {
    setFunctions((prevFunctions) => prevFunctions.map((func) => (func.id === id ? { ...func, nextFunctionId } : func)));
  }, []);

  const functionOrder = useMemo(() => {
    const order = [];
    // start from the first function
    let currentFunction = functions.find((func) => func.id === 1);

    while (currentFunction) {
      order.push(currentFunction.id);
      const nextId = currentFunction.nextFunctionId;
      currentFunction = functions.find((func) => func.id === nextId);
    }

    return order;
  }, [functions]);

  const finalValue = useMemo(() => {
    let currentValue = initialValue;
    let currentFunction = functions.find((func) => func.id === functionOrder[0]);

    while (currentFunction) {
      try {
        currentValue = evaluateEquation({
          equation: currentFunction.equation,
          variableMap: { x: currentValue },
        });
      } catch (error) {
        console.error("Error evaluating equation", error);
        break;
      }
      const nextId = currentFunction.nextFunctionId;
      currentFunction = functions.find((func) => func.id === nextId);
    }

    return currentValue;
  }, [initialValue, functions, functionOrder]);

  return (
    <div className="h-full w-full bg-[#f5f5f5] bg-[radial-gradient(#ececec_2px,transparent_2px)] [background-size:16px_16px]">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8">
        <div
          className={`grid gap-24`}
          style={{
            gridTemplateColumns: `repeat(${functions.length + 1}, 100px)`,
          }}
        >
          {functions.map((func, index) => {
            const isEven = index % 2 === 0;

            const isInitialFunction = index === 0;
            const isFinalFunction = index === functions.length - 1;

            return (
              <div
                key={func.id}
                style={{
                  gridRow: isEven ? "1/2" : "2/end",
                  gridColumn: `${index + 1}/span 2`,
                }}
                className="flex justify-center gap-4"
              >
                {isInitialFunction &&
                  (() => {
                    const initalOutputConnectorId = `output-initial`;
                    return (
                      <>
                        <ValueNode
                          label="Intial value of x"
                          value={initialValue}
                          onValueChange={(e) => {
                            setInitialValue(parseInt(e.target.value));
                          }}
                          inputProps={{
                            type: "number",
                          }}
                          isEditable={true}
                          className="w-min self-end"
                          connectorProps={{ id: initalOutputConnectorId }}
                        />
                        <Edge
                          inputElementId={`input-${func.id}`}
                          outputElementId={initalOutputConnectorId}
                        />
                      </>
                    );
                  })()}

                <FunctionCard
                  {...func}
                  functions={functions}
                  onEquationChange={handleEquationChange}
                  onNextFunctionChange={handleNextFunctionChange}
                  variableMap={{ x: initialValue }}
                />
                {isFinalFunction &&
                  (() => {
                    const finalInputConnectorId = `input-final`;
                    return (
                      <>
                        <ValueNode
                          label="Final Output y"
                          value={finalValue}
                          className="w-min self-end"
                          connectorProps={{ id: finalInputConnectorId }}
                        />
                        <Edge
                          inputElementId={`output-${func.id}`}
                          outputElementId={finalInputConnectorId}
                        />
                      </>
                    );
                  })()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
