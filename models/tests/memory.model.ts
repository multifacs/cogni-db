import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../index";

import type {
  MemoryAttempt,
} from "../types/tests/memory.type";

// Указываем, какие поля обязательны при создании
interface MemoryAttemptCreationAttributes
  extends Optional<MemoryAttempt, "id" | "sessionId"> {}

class MemoryAttemptModel
  extends Model<MemoryAttempt, MemoryAttemptCreationAttributes>
  implements MemoryAttempt
{
  public id!: string;
	public attempt!: number;
	public time!: number;
	public word!: string;
	public correctAnswer!: boolean;
	public userAnswer!: boolean | null;
	public isCorrect!: boolean;

  public sessionId!: string;
  // timestamps!
  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;
}

MemoryAttemptModel.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Генерация UUID по умолчанию
    },
    attempt: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    time: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correctAnswer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userAnswer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "MemoryAttempt",
    timestamps: false, // Автоматические поля createdAt/updatedAt
  }
);

import { Session } from "../index";

Session.hasMany(MemoryAttemptModel, { foreignKey: "sessionId" });
MemoryAttemptModel.belongsTo(Session, { foreignKey: "sessionId" });

export { MemoryAttemptModel as MemoryAttempt };
