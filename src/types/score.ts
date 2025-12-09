/**
 * Score type - represents a score submission
 */
export interface Score {
  scoreId: string;
  userId: string;
  weekNumber: number;
  amount: number;
  active: boolean;
}
