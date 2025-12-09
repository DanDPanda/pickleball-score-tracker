--npx wrangler d1 execute prod-d1-tutorial --local --file=./schema.sql
--DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Weeks;
DROP TABLE IF EXISTS Seasons;
DROP TABLE IF EXISTS Scores;
CREATE TABLE IF NOT EXISTS Users (userId TEXT PRIMARY KEY, email TEXT, facilitator BOOLEAN);
CREATE TABLE IF NOT EXISTS Weeks (weekId TEXT PRIMARY KEY, startDate TEXT, endDate TEXT, active BOOLEAN, weekNumber INTEGER, seasonId TEXT, FOREIGN KEY(seasonId) REFERENCES Seasons(seasonId));
CREATE TABLE IF NOT EXISTS Seasons (seasonId TEXT PRIMARY KEY, startDate TEXT, endDate TEXT, active BOOLEAN, seasonNumber INTEGER);
CREATE TABLE IF NOT EXISTS Scores (scoreId TEXT PRIMARY KEY, userId TEXT, weekId TEXT, seasonId TEXT, score INTEGER, FOREIGN KEY(userId) REFERENCES Users(userId), FOREIGN KEY(weekId) REFERENCES Weeks(weekId), FOREIGN KEY(seasonId) REFERENCES Seasons(seasonId));