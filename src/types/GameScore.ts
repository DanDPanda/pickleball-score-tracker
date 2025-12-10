export interface GameScore {
  gameScoreId: string;
  playerId: string;
  weekId: string;
  gameNumber: number;
  points: number;
  active: boolean;
  previous: boolean;
}
