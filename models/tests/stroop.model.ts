import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../index";
import type {
  Color,
  StroopAttempt,
  Task,
  Word,
} from "../types/tests/stroop.type";
import { COLOR_VALUES } from "../types/tests/stroop.type";

// Указываем, какие поля обязательны при создании
interface StroopAttemptCreationAttributes
  extends Optional<StroopAttempt, "id" | "sessionId"> {}

class StroopAttemptModel
  extends Model<StroopAttempt, StroopAttemptCreationAttributes>
  implements StroopAttempt
{
  public id!: string;
  public stage!: number;
  public attempt!: number;
  public time!: number;
  public word!: Word;
  public color!: Color | "white";
  public task!: Task;
  public userAnswer!: Color | null;
  public isCorrect!: boolean;

  public sessionId!: string;
  // timestamps!
  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;
}

StroopAttemptModel.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Генерация UUID по умолчанию
    },
    stage: {
      type: DataTypes.NUMBER,
      allowNull: false,
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
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [[...COLOR_VALUES]], // Валидация значений
      },
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["both", "meaning", "color"]], // Валидация значений
      },
    },
    userAnswer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "StroopAttempt",
    timestamps: false, // Автоматические поля createdAt/updatedAt
  }
);

import { Session } from "../index";

Session.hasMany(StroopAttemptModel, { foreignKey: "sessionId" });
StroopAttemptModel.belongsTo(Session, { foreignKey: "sessionId" });

export { StroopAttemptModel as StroopAttempt };
