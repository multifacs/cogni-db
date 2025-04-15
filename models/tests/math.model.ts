import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../index";
import { MathAttempt, Sign } from "../types/tests/math.type";

// Указываем, какие поля обязательны при создании
interface MathAttemptCreationAttributes
  extends Optional<MathAttempt, "id" | "sessionId"> {}

class MathAttemptModel
  extends Model<MathAttempt, MathAttemptCreationAttributes>
  implements MathAttempt
{
  public id!: string;
  public stage!: number;
  public attempt!: number;
  public time!: number;
  public left!: number;
  public sign!: Sign;
  public right!: number;
  public correctAnswer!: boolean;
  public userAnswer!: boolean | null;
  public isCorrect!: boolean;

  public sessionId!: string;
  // timestamps!
  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;
}

MathAttemptModel.init(
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
    left: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    sign: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [[">", "<", ">=", "<=", "=", "!="]], // Валидация значений
      },
    },
    right: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    correctAnswer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    modelName: "MathAttempt",
    timestamps: false, // Автоматические поля createdAt/updatedAt
  }
);

import { Session } from "../index";

Session.hasMany(MathAttemptModel, { foreignKey: "sessionId" });
MathAttemptModel.belongsTo(Session, { foreignKey: "sessionId" });

export { MathAttemptModel as MathAttempt };
