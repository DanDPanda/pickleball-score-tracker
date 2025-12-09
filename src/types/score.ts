/**
 * Score type - represents a score submission
 */
export interface Score {
  scoreId: string;
  userId: string;
  weekId: string;
  seasonId: string;
  score: number;
}
