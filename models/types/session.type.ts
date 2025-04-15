export type Session = {
  id: string;
  testType: string;
  meta?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// Тип для создания (без id, так как он генерируется автоматически)
export type CreateSessionInput = Omit<
  Session,
  "id" | "createdAt" | "updatedAt"
>;
