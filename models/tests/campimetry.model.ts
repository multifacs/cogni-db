import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../index";
import {
  CampimetryAttempt,
  Color,
  COLOR_VALUES,
} from "../types/tests/campimetry.type";

// Указываем, какие поля обязательны при создании
interface CampimetryAttemptCreationAttributes
  extends Optional<CampimetryAttempt, "id" | "sessionId"> {}

class CampimetryAttemptModel
  extends Model<CampimetryAttempt, CampimetryAttemptCreationAttributes>
  implements CampimetryAttempt
{
  public id!: string;
  public attempt!: number;
  public stage!: number;
  public silhouette!: string;
  public channel!: "a" | "b";
  public op!: "+" | "-";
  public color!: Color;
  public delta!: number;
  public time!: number;

  public sessionId!: string;
  // timestamps!
  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;
}

CampimetryAttemptModel.init(
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
    silhouette: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channel: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["a", "b"]], // Валидация значений
      },
    },
    op: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["+", "-"]], // Валидация значений
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [[...COLOR_VALUES]], // Валидация значений
      },
    },
    delta: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "CampimetryAttempt",
    timestamps: false, // Автоматические поля createdAt/updatedAt
  }
);

import { Session } from "../index";

Session.hasMany(CampimetryAttemptModel, { foreignKey: "sessionId" });
CampimetryAttemptModel.belongsTo(Session, { foreignKey: "sessionId" });

export { CampimetryAttemptModel as CampimetryAttempt };
