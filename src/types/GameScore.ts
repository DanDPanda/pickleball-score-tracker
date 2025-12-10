export interface GameScore {
  gameScoreId: string;
  userId: string;
  weekId: string;
  gameNumber: number;
  points: number;
  active: boolean;
  previous: boolean;
}
