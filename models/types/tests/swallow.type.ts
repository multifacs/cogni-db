export type Direction = "up" | "right" | "down" | "left";
export type Background = "red" | "blue";

export type SwallowTask = {
  direction: Direction;
  background: Background;
  correctAnswer: Direction;
};

export interface SwallowInput extends SwallowTask {
  // stage: number;
  attempt: number;
  time: number;
  userAnswer: Direction;
  isCorrect: boolean;
}

export interface SwallowAttempt extends SwallowInput {
  id: string;
  sessionId?: string;
  // createdAt?: Date;
  // updatedAt?: Date;
}
