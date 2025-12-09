/**
 * Season type - represents a season/tournament season
 */
export interface Season {
  seasonId: string;
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  active: boolean;
  seasonNumber: number;
}
