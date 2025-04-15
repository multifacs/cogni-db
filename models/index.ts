import { Sequelize } from "sequelize";
import path from "path";

const DB_PATH = process.env.DB_PATH as string;

const filepath = path.resolve(__dirname, DB_PATH);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: filepath,
});

console.log("DB file created or found at", filepath);

import { User } from "./user.model";
import { Session } from "./session.model";

import { StroopAttempt } from "./tests/stroop.model";
import { MathAttempt } from "./tests/math.model";
import { MemoryAttempt } from "./tests/memory.model";
import { SwallowAttempt } from "./tests/swallow.model";

export {
  sequelize,
  User,
  StroopAttempt,
  MathAttempt,
  MemoryAttempt,
  SwallowAttempt,
  Session,
};
