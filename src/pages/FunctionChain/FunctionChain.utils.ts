import { MathExpressionEvaluator } from "../../utils/math";
import { TVariableMap } from "./FunctionChain.types";

export function validateEquation(equation: string): boolean {
  const validPattern = /^(\d+(?:\.\d+)?([+\-*/^]\d+(?:\.\d+)?)*)$/;
  return validPattern.test(equation);
}

export const populateEquation = (equation: string, variableMap: TVariableMap = {}): string => {
  let finalEquation = equation;
  for (const key in variableMap) {
    finalEquation = finalEquation.replace(new RegExp(key, "g"), variableMap[key].toString());
  }
  return finalEquation;
};

export function evaluateEquation({ equation, variableMap }: { equation: string; variableMap: TVariableMap }): number {
  const finalEquation = populateEquation(equation, variableMap);

  if (!validateEquation(finalEquation)) {
    console.error("Invalid equation");
    throw new Error(`Invalid equation: ${equation}`);
  }

  try {
    return MathExpressionEvaluator.evaluate(finalEquation);
  } catch (error) {
    console.error(`Error evaluating equation: ${finalEquation}`, error);
    return 0;
  }
}
