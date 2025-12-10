/**
 * Score type - represents a score submission
 */
export interface WeeklyScore {
  weeklyScoreId: string;
  userId: string;
  weekId: string;
  weekNumber: number;
  points: number;
}
