--npx wrangler d1 execute prod-d1-tutorial --local --file=./schema.sql
--insert into Users (userId, email, facilitator) values ("001", "dan.v.dinh@gmail.com", false);
--insert into Seasons (seasonId, startDate, endDate, active, number) values ('001', '', '', true, 1);
--insert into Weeks (weekId, startDate, endDate, active, number, seasonId) values ('001', '', '', false, 1, '001'), ('002', '', '', true, 2, '001');
--insert into Scores (scoreId, userId, weekId, seasonId, score) values ('001', '001', '001', '001', 10), ('002', '001', '002', '001', 15);
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Weeks;
DROP TABLE IF EXISTS Seasons;
DROP TABLE IF EXISTS Scores;
CREATE TABLE IF NOT EXISTS Users (userId TEXT PRIMARY KEY, email TEXT, facilitator BOOLEAN);
CREATE TABLE IF NOT EXISTS Weeks (weekId TEXT PRIMARY KEY, startDate TEXT, endDate TEXT, active BOOLEAN, weekNumber INTEGER, seasonId TEXT, FOREIGN KEY(seasonId) REFERENCES Seasons(seasonId));
CREATE TABLE IF NOT EXISTS Seasons (seasonId TEXT PRIMARY KEY, startDate TEXT, endDate TEXT, active BOOLEAN, seasonNumber INTEGER);
CREATE TABLE IF NOT EXISTS Scores (scoreId TEXT PRIMARY KEY, userId TEXT, weekId TEXT, seasonId TEXT, score INTEGER, FOREIGN KEY(userId) REFERENCES Users(userId), FOREIGN KEY(weekId) REFERENCES Weeks(weekId), FOREIGN KEY(seasonId) REFERENCES Seasons(seasonId));