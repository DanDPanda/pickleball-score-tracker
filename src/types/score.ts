/**
 * Score type - represents a score submission
 */
export interface Score {
  scoreId: string;
  userId: string;
  weekId: string;
  amount: number;
  active: boolean;
}
