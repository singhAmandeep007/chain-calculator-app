export type TFunctionNode = {
  id: number;
  equation: string;
  nextFunctionId: number | null;
};

export type TVariableMap = Record<string, number>;
