/**
 * Week type - represents a week period in the season
 */
export interface Week {
  weekId: string;
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  active: boolean;
  weekNumber: number;
}
