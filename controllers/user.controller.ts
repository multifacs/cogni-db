import { Request, Response } from "express";
import { User } from "../models";
import { CreateUserInput } from "../models/types/user.type";

export const getUser = async (req: Request, res: Response) => {
  try {
    const userInput: CreateUserInput = req.body;
    const id = req.query.id;

    console.log(id);

    // Find by id param
    if (id && typeof id == "string") {
      // Ищем существующего пользователя
      const existingUser = await User.findOne({
        where: {
          id,
        },
      });
      if (existingUser) {
        res.json({ user: existingUser });
        return;
      }
      res.json({ user: null });
      return;
    }

    if (userInput == undefined) {
      res.status(400).json({ error: "Req body is required" });
      return;
    }

    // TODO search by id

    if (!checkUserInput(userInput)) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const { firstname, lastname, birthdate, sex } = userInput;

    // Ищем существующего пользователя
    const existingUser = await User.findOne({
      where: {
        firstname,
        lastname,
        birthdate,
        sex,
      },
    });

    // Если пользователь существует - возвращаем его ID
    if (existingUser) {
      res.json({ user: existingUser });
      return;
    }
    res.json({ user: null });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

function checkUserInput(userInput: CreateUserInput) {
  let isCorrect = true;
  if (!("firstname" in userInput)) isCorrect = false;
  if (!("lastname" in userInput)) isCorrect = false;
  if (!("birthdate" in userInput)) isCorrect = false;
  if (!("sex" in userInput)) isCorrect = false;
  return isCorrect;
}

export const createUser = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  try {
    const userInput: CreateUserInput = req.body;
    if (userInput == undefined || !checkUserInput(userInput)) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const { firstname, lastname, birthdate, sex } = userInput;

    // Ищем существующего пользователя
    const existingUser = await User.findOne({
      where: {
        firstname,
        lastname,
        birthdate,
        sex,
      },
    });

    // Если пользователь существует - возвращаем его ID
    if (existingUser) {
      res.json({ user: existingUser });
      return;
    }

    // Если не существует - создаем нового
    const newUser = await User.create({
      firstname,
      lastname,
      birthdate,
      sex,
    });

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};
