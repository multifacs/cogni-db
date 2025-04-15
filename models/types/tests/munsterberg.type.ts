export type MunsterbergInput = {
  word: string;
  row: number;
  col: number;
  guessed: boolean;
  attempt: number;
  time: number;
};

export interface MunsterbergAttempt extends MunsterbergInput {
  id: string;
  sessionId?: string;
  // createdAt?: Date;
  // updatedAt?: Date;
}
