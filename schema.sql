--npx wrangler d1 execute pickleball-score-tracker-database --remote --file=./schema.sql
DROP TABLE IF EXISTS Scores;
DROP TABLE IF EXISTS Weeks;
DROP TABLE IF EXISTS Seasons;
DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users (userId TEXT PRIMARY KEY, email TEXT, facilitator BOOLEAN);
CREATE TABLE IF NOT EXISTS Scores (scoreId TEXT PRIMARY KEY, userId TEXT, weekNumber INTEGER, amount INTEGER, active BOOLEAN, FOREIGN KEY(userId) REFERENCES Users(userId));
CREATE TABLE IF NOT EXISTS Weeks (weekId TEXT PRIMARY KEY, weekNumber INTEGER, startDate TEXT);
insert into Users (userId, email, facilitator) values
("0f605319-b206-41f2-9a5a-6c9fd2820387", "dan.v.dinh@gmail.com", false), 
("12231dbe-29d3-4295-821e-3b9186fdc136", "test@gmail.com", false);
insert into Weeks (weekId, weekNumber, startDate) values 
('21972fac-1dcc-47c5-b137-a80b54855df4', 1, '2024-01-01'), 
('f023f7a2-350f-4154-881a-4d4b3c720b59', 2, '2024-01-08');
insert into Scores (scoreId, userId, weekNumber, amount, active) values 
('68d756f8-03ad-417a-9f34-5e6096bcaab0', '0f605319-b206-41f2-9a5a-6c9fd2820387', 1, 10, false), 
('b81cc8fc-3ab3-433e-a5c6-f9da61d70509', '0f605319-b206-41f2-9a5a-6c9fd2820387', 2, 15, true), 
('01b26e4e-acda-4e5e-8615-eb768d50856b', '12231dbe-29d3-4295-821e-3b9186fdc136', 1, 20, false), 
('ffd0609f-21e3-4cf8-961c-e5c1058266c9', '12231dbe-29d3-4295-821e-3b9186fdc136', 2, 25, true);