import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "./index";
import { User, CreateUserInput } from "./types/user.type";

// Указываем, какие поля обязательны при создании
interface UserCreationAttributes
  extends Optional<User, "id" | "createdAt" | "updatedAt"> {}

class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id!: string;
  public firstname!: string;
  public lastname!: string;
  public birthdate!: Date;
  public sex!: string;
  public cataract!: boolean | null;
  public colorist!: boolean | null;
  public neuro!: boolean | null;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Генерация UUID по умолчанию
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["male", "female"]], // Валидация значений
      },
    },
    cataract: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
    colorist: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
    neuro: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true, // Автоматические поля createdAt/updatedAt
  }
);

export { UserModel as User };
