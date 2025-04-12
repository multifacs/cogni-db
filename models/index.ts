import { Sequelize, DataTypes } from "sequelize";
import path from "path";

const DB_PATH = process.env.DB_PATH as string;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, DB_PATH),
});

import { User } from "./user.model";

export { sequelize, User };
