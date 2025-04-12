import { Sequelize, DataTypes } from "sequelize";
import path from "path";

const DB_PATH = process.env.DB_PATH as string;

const filepath = path.resolve(__dirname, DB_PATH);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: filepath,
});

console.log("DB file created at", filepath);

import { User } from "./user.model";

export { sequelize, User };
