export type Sign = ">" | "<" | ">=" | "<=" | "=" | "!=";

export type MathInput = {
  stage: number;
  attempt: number;
  time: number;
  left: number;
  sign: Sign;
  right: number;
  correctAnswer: boolean;
  userAnswer: boolean | null;
  isCorrect: boolean;
};

export interface MathAttempt extends MathInput {
  id: string;

  sessionId?: string;
  // createdAt?: Date;
  // updatedAt?: Date;
}
