import type { Week } from "../types/week";

/**
 * Dummy weeks for testing
 */
export const dummyWeeks: Week[] = [
  {
    weekId: "001",
    startDate: "2024-12-01",
    endDate: "2024-12-07",
    active: true,
    weekNumber: 1,
    seasonId: "001",
  },
  {
    weekId: "002",
    startDate: "2024-12-08",
    endDate: "2024-12-14",
    active: false,
    weekNumber: 2,
    seasonId: "001",
  },
  {
    weekId: "003",
    startDate: "2024-12-15",
    endDate: "2024-12-21",
    active: false,
    weekNumber: 3,
    seasonId: "001",
  },
  {
    weekId: "004",
    startDate: "2024-12-22",
    endDate: "2024-12-28",
    active: false,
    weekNumber: 4,
    seasonId: "001",
  },
  {
    weekId: "005",
    startDate: "2024-12-29",
    endDate: "2025-01-04",
    active: false,
    weekNumber: 5,
    seasonId: "001",
  },
];
