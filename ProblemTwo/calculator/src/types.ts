export type Operator = "+" | "−" | "×" | "÷" | null;

export interface CalcState {
  current: string;
  previous: string | null;
  operator: Operator;
  shouldReset: boolean;
  expression: string;
}
