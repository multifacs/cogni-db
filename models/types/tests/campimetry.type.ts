export const COLOR_VALUES = [
  "black",
  "white",
  "dark-magenta",
  "light-magenta",
  "dark-blue",
  "light-blue",
  "dark-green",
  "light-green",
  "dark-red",
  "light-red",
] as const;

export type Color = (typeof COLOR_VALUES)[number];

export type CampimetryInput = {
  attempt: number;
  stage: number;
  silhouette: string;
  channel: "a" | "b";
  op: "+" | "-";
  color: Color;
  delta: number;
  time: number;
};

export interface CampimetryAttempt extends CampimetryInput {
  id: string;
  sessionId?: string;
  // createdAt?: Date;
  // updatedAt?: Date;
}
