import type { WeeklyScore } from "./WeeklyScore";
import type { User } from "./User";
import type { GameScore } from "./GameScore";

export type Data = {
  user: User;
  users: User[];
  weeklyScores: WeeklyScore[];
  gameScores: GameScore[];
  activeWeekNumber: number;
};
