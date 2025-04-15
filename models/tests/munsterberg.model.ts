import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../index";
import { MunsterbergAttempt } from "../types/tests/munsterberg.type";

// Указываем, какие поля обязательны при создании
interface MunsterbergAttemptCreationAttributes
  extends Optional<MunsterbergAttempt, "id" | "sessionId"> {}

class MunsterbergAttemptModel
  extends Model<MunsterbergAttempt, MunsterbergAttemptCreationAttributes>
  implements MunsterbergAttempt
{
  public id!: string;
  public word!: string;
  public row!: number;
  public col!: number;
  public guessed!: boolean;
  public attempt!: number;
  public time!: number;

  public sessionId!: string;
  // timestamps!
  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;
}

MunsterbergAttemptModel.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Генерация UUID по умолчанию
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    row: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    col: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    guessed: {
      type: DataTypes.BOOLEAN,
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
  },
  {
    sequelize,
    modelName: "MunsterbergAttempt",
    timestamps: false, // Автоматические поля createdAt/updatedAt
  }
);

import { Session } from "../index";

Session.hasMany(MunsterbergAttemptModel, { foreignKey: "sessionId" });
MunsterbergAttemptModel.belongsTo(Session, { foreignKey: "sessionId" });

export { MunsterbergAttemptModel as MunsterbergAttempt };
