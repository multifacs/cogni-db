import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../index";

import type {
  Background,
  Direction,
  SwallowAttempt,
} from "../types/tests/swallow.type";

// Указываем, какие поля обязательны при создании
interface SwallowAttemptCreationAttributes
  extends Optional<SwallowAttempt, "id" | "sessionId"> {}

class SwallowAttemptModel
  extends Model<SwallowAttempt, SwallowAttemptCreationAttributes>
  implements SwallowAttempt
{
  public id!: string;
  public attempt!: number;
  public time!: number;
  public direction!: Direction;
  public background!: Background;
  public correctAnswer!: Direction;
  public userAnswer!: Direction;
  public isCorrect!: boolean;

  public sessionId!: string;
  // timestamps!
  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;
}

SwallowAttemptModel.init(
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
    direction: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["up", "right", "down", "left"]], // Валидация значений
      },
    },
    background: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["red", "blue"]], // Валидация значений
      },
    },
    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["up", "right", "down", "left"]], // Валидация значений
      },
    },
    userAnswer: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [["up", "right", "down", "left"]], // Валидация значений
      },
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "SwallowAttempt",
    timestamps: false, // Автоматические поля createdAt/updatedAt
  }
);

import { Session } from "../index";

Session.hasMany(SwallowAttemptModel, { foreignKey: "sessionId" });
SwallowAttemptModel.belongsTo(Session, { foreignKey: "sessionId" });

export { SwallowAttemptModel as SwallowAttempt };
