import type { WeeklyScore } from "./WeeklyScore";
import type { Player } from "./Player";
import type { GameScore } from "./GameScore";
import type { Week } from "./Week";

export type Data = {
  player: Player;
  players: Player[];
  weeklyScores: WeeklyScore[];
  gameScores: GameScore[];
  weeks: Week[];
};
