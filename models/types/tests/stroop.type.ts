export const COLOR_VALUES = [
  "red",
  "blue",
  "green",
  "cyan",
  "magenta",
  "yellow",
] as const;
export type Color = (typeof COLOR_VALUES)[number];
export type Stage = "stage -1" | "stage 1" | "stage 2" | "stage 3";
export type Word = Color | Stage;
export type Task = "both" | "meaning" | "color" | "stage";

export interface StroopInput {
  attempt: number;
  time: number;
  stage: number;
  task: Task;
  word: Word;
  color: Color | "white";
  userAnswer: Color | null;
  isCorrect: boolean;
}

export interface StroopAttempt extends StroopInput {
  id: string;
  sessionId?: string;
  // createdAt?: Date;
  // updatedAt?: Date;
}
