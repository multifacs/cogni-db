import { Sequelize, DataTypes } from "sequelize";
import path from "path";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "../data/database.sqlite"),
});

import { User } from "./user.model";

export { sequelize, User };
