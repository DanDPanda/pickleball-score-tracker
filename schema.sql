--npx wrangler d1 execute pickleball-score-tracker-database --remote --file=./schema.sql
DROP TABLE IF EXISTS Scores;
DROP TABLE IF EXISTS Weeks;
DROP TABLE IF EXISTS Seasons;
DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users (userId TEXT PRIMARY KEY, email TEXT, facilitator BOOLEAN);
CREATE TABLE IF NOT EXISTS Weeks (weekId TEXT PRIMARY KEY, startDate TEXT, endDate TEXT, active BOOLEAN, weekNumber INTEGER);
CREATE TABLE IF NOT EXISTS Scores (scoreId TEXT PRIMARY KEY, userId TEXT, weekId TEXT, amount INTEGER, active BOOLEAN, FOREIGN KEY(userId) REFERENCES Users(userId), FOREIGN KEY(weekId) REFERENCES Weeks(weekId));
insert into Users (userId, email, facilitator) values
("0f605319-b206-41f2-9a5a-6c9fd2820387", "dan.v.dinh@gmail.com", false), 
("12231dbe-29d3-4295-821e-3b9186fdc136", "test@gmail.com", false);
insert into Weeks (weekId, startDate, endDate, active, weekNumber) values 
('06c2f1d2-f58c-48fd-910f-3273224f5ba0', '', '', false, 1), 
('9d446d93-5b30-4453-8fbc-1e269240d537', '', '', true, 2);
insert into Scores (scoreId, userId, weekId, amount, active) values 
('68d756f8-03ad-417a-9f34-5e6096bcaab0', '0f605319-b206-41f2-9a5a-6c9fd2820387', '06c2f1d2-f58c-48fd-910f-3273224f5ba0', 10, false), 
('b81cc8fc-3ab3-433e-a5c6-f9da61d70509', '0f605319-b206-41f2-9a5a-6c9fd2820387', '9d446d93-5b30-4453-8fbc-1e269240d537', 15, true), 
('01b26e4e-acda-4e5e-8615-eb768d50856b', '12231dbe-29d3-4295-821e-3b9186fdc136', '06c2f1d2-f58c-48fd-910f-3273224f5ba0', 20, false), 
('ffd0609f-21e3-4cf8-961c-e5c1058266c9', '12231dbe-29d3-4295-821e-3b9186fdc136', '9d446d93-5b30-4453-8fbc-1e269240d537', 25, true);