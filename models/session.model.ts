import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "./index";
import { Session } from "./types/session.type";

// Указываем, какие поля обязательны при создании
interface SessionCreationAttributes
  extends Optional<Session, "id" | "userId" | "createdAt" | "updatedAt"> {}

class SessionModel
  extends Model<Session, SessionCreationAttributes>
  implements Session
{
  public id!: string;
  public testType!: string;
  public meta?: string | undefined;

  public userId!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SessionModel.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Генерация UUID по умолчанию
    },
    testType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meta: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "TestSession",
    timestamps: true, // Автоматические поля createdAt/updatedAt
  }
);

import { User } from "./index";

User.hasMany(SessionModel, { foreignKey: "userId" });
SessionModel.belongsTo(User, { foreignKey: "userId" });

export { SessionModel as Session };
