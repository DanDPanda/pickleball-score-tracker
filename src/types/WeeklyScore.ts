/**
 * Score type - represents a score submission
 */
export interface WeeklyScore {
  weeklyScoreId: string;
  playerId: string;
  weekId: string;
  weekNumber: number;
  points: number;
}
