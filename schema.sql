--npx wrangler d1 execute pickleball-score-tracker-database --remote --file=./schema.sql
DROP TABLE IF EXISTS Scores;
DROP TABLE IF EXISTS Weeks;
DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users (userId TEXT PRIMARY KEY, email TEXT, facilitator BOOLEAN);
CREATE TABLE IF NOT EXISTS Scores (scoreId TEXT PRIMARY KEY, userId TEXT, weekNumber INTEGER, amount INTEGER, active BOOLEAN, FOREIGN KEY(userId) REFERENCES Users(userId));
CREATE TABLE IF NOT EXISTS Weeks (weekId TEXT PRIMARY KEY, weekNumber INTEGER, startDate TEXT, active BOOLEAN);
insert into Users (userId, email, facilitator) values
("0f605319-b206-41f2-9a5a-6c9fd2820387", "dan.v.dinh@gmail.com", false), 
("12231dbe-29d3-4295-821e-3b9186fdc136", "test@gmail.com", false),
("a3c45e67-89ab-4def-0123-456789abcdef", "player3@gmail.com", false);
insert into Weeks (weekId, weekNumber, startDate, active) values 
('21972fac-1dcc-47c5-b137-a80b54855df4', 1, '2024-01-01', false), 
('f023f7a2-350f-4154-881a-4d4b3c720b59', 2, '2024-01-08', false),
('d8e9f0a1-2b3c-4d5e-6f7a-8b9c0d1e2f3a', 3, '2024-01-15', false),
('9f8e7d6c-5b4a-3210-fedc-ba9876543210', 4, '2024-01-22', true);
insert into Scores (scoreId, userId, weekNumber, amount, active) values 
('68d756f8-03ad-417a-9f34-5e6096bcaab0', '0f605319-b206-41f2-9a5a-6c9fd2820387', 1, 10, false), 
('b81cc8fc-3ab3-433e-a5c6-f9da61d70509', '0f605319-b206-41f2-9a5a-6c9fd2820387', 2, 15, false),
('c1d2e3f4-5678-9abc-def0-123456789abc', '0f605319-b206-41f2-9a5a-6c9fd2820387', 3, 22, false),
('d2e3f4a5-6789-0bcd-ef01-23456789abcd', '0f605319-b206-41f2-9a5a-6c9fd2820387', 4, 18, true),
('01b26e4e-acda-4e5e-8615-eb768d50856b', '12231dbe-29d3-4295-821e-3b9186fdc136', 1, 20, false), 
('ffd0609f-21e3-4cf8-961c-e5c1058266c9', '12231dbe-29d3-4295-821e-3b9186fdc136', 2, 25, false),
('e3f4a5b6-789a-bcde-f012-3456789abcde', '12231dbe-29d3-4295-821e-3b9186fdc136', 3, 30, false),
('f4a5b6c7-89ab-cdef-0123-456789abcdef', '12231dbe-29d3-4295-821e-3b9186fdc136', 4, 28, true),
('a1b2c3d4-e5f6-7890-abcd-ef0123456789', 'a3c45e67-89ab-4def-0123-456789abcdef', 1, 15, false),
('b2c3d4e5-f678-90ab-cdef-0123456789ab', 'a3c45e67-89ab-4def-0123-456789abcdef', 2, 18, false),
('c3d4e5f6-7890-abcd-ef01-23456789abcd', 'a3c45e67-89ab-4def-0123-456789abcdef', 3, 25, false),
('d4e5f6a7-890a-bcde-f012-3456789abcde', 'a3c45e67-89ab-4def-0123-456789abcdef', 4, 20, true);