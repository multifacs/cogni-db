export type Word = {
	value: string;
	isCorrect: boolean;
};

export type MemoryInput = {
	attempt: number;
	time: number;
	word: string;
	correctAnswer: boolean;
	userAnswer: boolean | null;
	isCorrect: boolean;
};

export interface MemoryAttempt extends MemoryInput {
  id: string;
  sessionId?: string;
  // createdAt?: Date;
  // updatedAt?: Date;
}
