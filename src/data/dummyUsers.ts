import type { User } from "../types/user";

/**
 * Dummy users for testing
 */
export const dummyUsers: User[] = [
  {
    userId: "001",
    email: "alice@example.com",
    facilitator: false,
  },
  {
    userId: "002",
    email: "bob@example.com",
    facilitator: false,
  },
  {
    userId: "003",
    email: "charlie@example.com",
    facilitator: true,
  },
  {
    userId: "004",
    email: "diana@example.com",
    facilitator: false,
  },
  {
    userId: "005",
    email: "eve@example.com",
    facilitator: false,
  },
];
