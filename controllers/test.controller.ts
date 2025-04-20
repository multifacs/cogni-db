import { Request, Response } from "express";
import {
  CampimetryAttempt,
  MathAttempt,
  MemoryAttempt,
  MunsterbergAttempt,
  Session,
  StroopAttempt,
  SwallowAttempt,
} from "../models";
import type {
  MetaResult,
  RegularResult,
  TestResultMap,
} from "./types/result.type";

export const getResults = async (req: Request, res: Response) => {
  const testType = req.params.test as keyof TestResultMap;
  const userId = req.query.userId as string;

  try {
    const sessions = await Session.findAll({
      where: {
        testType,
        userId,
      },
    });

    // Создаем массив промисов для загрузки всех данных
    const sessionPromises = sessions.map(async (session) => {
      let attempts: TestResultMap[typeof testType][] = [];
      let meta = null;

      if (testType === "math") {
        const results = await MathAttempt.findAll({
          where: { sessionId: session.id },
          order: [["attempt", "ASC"]], // Сортируем попытки по времени
        });

        attempts = results.map((x) => ({
          stage: x.stage,
          attempt: x.attempt,
          time: x.time,
          left: x.left,
          sign: x.sign,
          right: x.right,
          correctAnswer: x.correctAnswer,
          userAnswer: x.userAnswer,
          isCorrect: x.isCorrect,
          // createdAt попытки, если нужно (x.createdAt)
        }));
      }

      if (testType === "stroop") {
        const results = await StroopAttempt.findAll({
          where: { sessionId: session.id },
          order: [["attempt", "ASC"]], // Сортируем попытки по времени
        });

        attempts = results.map((x) => ({
          stage: x.stage,
          attempt: x.attempt,
          time: x.time,
          word: x.word,
          color: x.color,
          task: x.task,
          userAnswer: x.userAnswer,
          isCorrect: x.isCorrect,
          // createdAt попытки, если нужно (x.createdAt)
        }));
      }

      if (testType === "memory") {
        meta = session.meta;
        const results = await MemoryAttempt.findAll({
          where: { sessionId: session.id },
          order: [["attempt", "ASC"]], // Сортируем попытки по времени
        });

        attempts = results.map((x) => ({
          attempt: x.attempt,
          time: x.time,
          word: x.word,
          correctAnswer: x.correctAnswer,
          userAnswer: x.userAnswer,
          isCorrect: x.isCorrect,
          // createdAt попытки, если нужно (x.createdAt)
        }));
      }

      if (testType === "swallow") {
        const results = await SwallowAttempt.findAll({
          where: { sessionId: session.id },
          order: [["attempt", "ASC"]], // Сортируем попытки по времени
        });

        attempts = results.map((x) => ({
          attempt: x.attempt,
          time: x.time,
          direction: x.direction,
          background: x.background,
          correctAnswer: x.correctAnswer,
          userAnswer: x.userAnswer,
          isCorrect: x.isCorrect,
        }));
      }

      if (testType === "munsterberg") {
        meta = session.meta;
        const results = await MunsterbergAttempt.findAll({
          where: { sessionId: session.id },
          order: [["attempt", "ASC"]], // Сортируем попытки по времени
        });

        attempts = results.map((x) => ({
          word: x.word,
          row: x.row,
          col: x.col,
          guessed: x.guessed,
          attempt: x.attempt,
          time: x.time,
        }));
      }

      if (testType === "campimetry") {
        const results = await CampimetryAttempt.findAll({
          where: { sessionId: session.id },
          order: [["attempt", "ASC"]], // Сортируем попытки по времени
        });

        attempts = results.map((x) => ({
          attempt: x.attempt,
          stage: x.stage,
          silhouette: x.silhouette,
          channel: x.channel,
          op: x.op,
          color: x.color,
          delta: x.delta,
          time: x.time,
        }));
      }

      return {
        sessionId: session.id,
        createdAt: session.createdAt, // Дата создания сессии
        attempts,
        meta
      };
    });

    // Дожидаемся загрузки всех сессий
    const allResults = await Promise.all(sessionPromises);
    console.log("all results", allResults);

    // Сортируем сессии по дате создания (от старых к новым)
    allResults.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    res.status(200).json(allResults);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const createSession = async (
  testType: string,
  userId: string,
  meta: string | undefined
): Promise<string> => {
  try {
    const newSession = await Session.create({
      userId,
      testType,
      meta: meta ? meta : undefined,
    });

    return newSession.id;
  } catch (error) {
    console.log(error);
    return "none";
  }
};

const createAttempt = async (
  testType: keyof TestResultMap,
  resultData: TestResultMap[typeof testType],
  sessionId: string
): Promise<string> => {
  try {
    if (testType === "math" && "left" in resultData) {
      const newAttempt = await MathAttempt.create({
        stage: resultData.stage,
        attempt: resultData.attempt,
        time: resultData.time,
        left: resultData.left,
        sign: resultData.sign,
        right: resultData.right,
        correctAnswer: resultData.correctAnswer,
        userAnswer: resultData.userAnswer,
        isCorrect: resultData.isCorrect,
        sessionId: sessionId,
      });
      return newAttempt.id;
    }

    if (testType === "stroop" && "task" in resultData) {
      const newAttempt = await StroopAttempt.create({
        stage: resultData.stage,
        attempt: resultData.attempt,
        time: resultData.time,
        word: resultData.word,
        color: resultData.color,
        task: resultData.task,
        userAnswer: resultData.userAnswer,
        isCorrect: resultData.isCorrect,
        sessionId: sessionId,
      });
      return newAttempt.id;
    }

    if (
      testType === "memory" &&
      "word" in resultData &&
      !("color" in resultData) &&
      !("row" in resultData)
    ) {
      const newAttempt = await MemoryAttempt.create({
        attempt: resultData.attempt,
        time: resultData.time,
        word: resultData.word,
        correctAnswer: resultData.correctAnswer,
        userAnswer: resultData.userAnswer,
        isCorrect: resultData.isCorrect,
        sessionId: sessionId,
      });
      return newAttempt.id;
    }

    if (testType === "swallow" && "direction" in resultData) {
      const newAttempt = await SwallowAttempt.create({
        attempt: resultData.attempt,
        time: resultData.time,
        direction: resultData.direction,
        background: resultData.background,
        correctAnswer: resultData.correctAnswer,
        userAnswer: resultData.userAnswer,
        isCorrect: resultData.isCorrect,
        sessionId: sessionId,
      });
      return newAttempt.id;
    }

    if (testType === "munsterberg" && "row" in resultData) {
      const newAttempt = await MunsterbergAttempt.create({
        word: resultData.word,
        row: resultData.row,
        col: resultData.col,
        guessed: resultData.guessed,
        attempt: resultData.attempt,
        time: resultData.time,
        sessionId: sessionId,
      });
      return newAttempt.id;
    }

    if (testType === "campimetry" && "silhouette" in resultData) {
      const newAttempt = await CampimetryAttempt.create({
        attempt: resultData.attempt,
        stage: resultData.stage,
        silhouette: resultData.silhouette,
        channel: resultData.channel,
        op: resultData.op,
        color: resultData.color,
        delta: resultData.delta,
        time: resultData.time,
        sessionId: sessionId,
      });
      return newAttempt.id;
    }
  } catch (error) {
    console.log(error);
    return "none";
  }
  return "none";
};

export const createResult = async (req: Request, res: Response) => {
  try {
    const testType = req.params.test as keyof TestResultMap;
    const userId = req.query.userId as string;
    const results:
      | RegularResult<typeof testType>
      | MetaResult<typeof testType> = req.body;

    let sessionId: string = "";
    if ("meta" in results) {
      sessionId = await createSession(
        testType,
        userId,
        JSON.stringify(results.meta)
      );

      results.results.forEach((x) => {
        createAttempt(testType, x, sessionId);
      });
    } else {
      sessionId = await createSession(testType, userId, undefined);

      results.forEach((x) => {
        createAttempt(testType, x, sessionId);
      });
    }

    res.status(200).json("success, sessionId =" + sessionId);
  } catch (error) {
    console.log("error from controller");
    console.log(error);
    res.status(500).json({ error });
  }
};
