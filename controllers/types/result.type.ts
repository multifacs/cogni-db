import { MathInput } from "models/types/tests/math.type";
import { MemoryInput } from "models/types/tests/memory.type";
import { StroopInput } from "models/types/tests/stroop.type";
import { SwallowInput } from "models/types/tests/swallow.type";

export type TestResultMap = {
  math: MathInput;
  stroop: StroopInput;
  memory: MemoryInput;
  swallow: SwallowInput;
  // campimetry: CampimetryResult[];
  // можно добавлять дальше
};

export type ResultInfo<T extends keyof TestResultMap> = {
  sessionId: string;
  createdAt: Date;
  attempts: TestResultMap[T];
};

export type RegularResult<T extends keyof TestResultMap> = TestResultMap[T][];
export interface MetaResult<T extends keyof TestResultMap> {
  results: TestResultMap[T][];
  meta: string[];
}
