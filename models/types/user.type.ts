export type User = {
  id: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  sex: string;
  cataract?: boolean;
  colorist?: boolean;
  neuro?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

// Тип для создания пользователя (без id, так как он генерируется автоматически)
export type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;
