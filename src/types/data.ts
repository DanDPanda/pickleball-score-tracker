import type { Score } from "./score";
import type { User } from "./user";

export type Data = {
  user: User;
  users: User[];
  userScores: Score[];
  scores: Score[];
  activeWeekNumber: number;
};
