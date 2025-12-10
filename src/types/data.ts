import type { WeeklyScore } from "./WeeklyScore";
import type { User } from "./User";
import type { GameScore } from "./GameScore";
import type { Week } from "./Week";

export type Data = {
  user: User;
  users: User[];
  weeklyScores: WeeklyScore[];
  gameScores: GameScore[];
  weeks: Week[];
};
