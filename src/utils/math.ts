type TToken = {
  type: "number" | "operator";
  value: string;
};

export class MathExpressionEvaluator {
  private static operators = {
    "+": (a: number, b: number) => a + b,
    "-": (a: number, b: number) => a - b,
    "*": (a: number, b: number) => a * b,
    "/": (a: number, b: number) => a / b,
    "^": (a: number, b: number) => Math.pow(a, b),
  };

  private static precedence: { [key: string]: number } = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3,
  };

  private static tokenize(expression: string): TToken[] {
    const tokens: TToken[] = [];
    let current = "";

    const processNumber = () => {
      if (current) {
        tokens.push({ type: "number", value: current });
        current = "";
      }
    };

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (char === " ") {
        processNumber();
        continue;
      }

      if (Object.keys(this.operators).includes(char)) {
        processNumber();
        tokens.push({ type: "operator", value: char });
      } else if (/[\d.]/.test(char)) {
        current += char;
      }
    }

    processNumber();

    return tokens;
  }

  private static evaluateRPN(tokens: TToken[]): number {
    const stack: number[] = [];

    for (const token of tokens) {
      if (token.type === "number") {
        stack.push(parseFloat(token.value));
      } else if (token.type === "operator") {
        const b = stack.pop()!;
        const a = stack.pop()!;
        const result = this.operators[token.value as keyof typeof this.operators](a, b);
        stack.push(result);
      }
    }

    return stack[0];
  }

  private static toRPN(tokens: TToken[]): TToken[] {
    const output: TToken[] = [];
    const operatorStack: TToken[] = [];

    for (const token of tokens) {
      if (token.type === "number") {
        output.push(token);
      } else if (token.type === "operator") {
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1].type === "operator" &&
          this.precedence[operatorStack[operatorStack.length - 1].value] >= this.precedence[token.value]
        ) {
          output.push(operatorStack.pop()!);
        }
        operatorStack.push(token);
      }
    }

    while (operatorStack.length > 0) {
      output.push(operatorStack.pop()!);
    }

    return output;
  }

  static evaluate(expression: string): number {
    try {
      const tokens = this.tokenize(expression);
      const rpn = this.toRPN(tokens);
      return this.evaluateRPN(rpn);
    } catch (error) {
      console.error("Error evaluating expression:", error);
      return 0;
    }
  }
}
