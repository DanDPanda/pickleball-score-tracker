--npx wrangler d1 execute pickleball-score-tracker-database --remote --file=./schema.sql
DROP TABLE IF EXISTS WeeklyScores;
DROP TABLE IF EXISTS GameScores;
DROP TABLE IF EXISTS Weeks;
DROP TABLE IF EXISTS Players;
DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Players (
    playerId TEXT PRIMARY KEY NOT NULL,
    email TEXT NOT NULL,
    facilitator BOOLEAN NOT NULL
);
CREATE TABLE IF NOT EXISTS Weeks (
    weekId TEXT PRIMARY KEY NOT NULL,
    weekNumber INTEGER NOT NULL,
    startDate TEXT NOT NULL,
    active BOOLEAN NOT NULL
);
CREATE TABLE IF NOT EXISTS WeeklyScores (
    weeklyScoreId TEXT PRIMARY KEY NOT NULL,
    playerId TEXT NOT NULL,
    weekId TEXT NOT NULL,
    weekNumber INTEGER NOT NULL,
    points INTEGER NOT NULL,
    FOREIGN KEY(playerId) REFERENCES Players(playerId),
    FOREIGN KEY(weekId) REFERENCES Weeks(weekId)
);
CREATE TABLE IF NOT EXISTS GameScores (
    gameScoreId TEXT PRIMARY KEY NOT NULL,
    playerId TEXT NOT NULL,
    weekId TEXT NOT NULL,
    gameNumber INTEGER NOT NULL,
    points INTEGER NOT NULL,
    active BOOLEAN NOT NULL,
    previous BOOLEAN NOT NULL,
    FOREIGN KEY(playerId) REFERENCES Players(playerId),
    FOREIGN KEY(weekId) REFERENCES Weeks(weekId)
);
insert into Players (playerId, email, facilitator) values
    ("0f605319-b206-41f2-9a5a-6c9fd2820387", "dan.v.dinh@gmail.com", false), 
    ("0f605319-b206-41f2-9a5a-6c9fd2820388", "hnid.nad@gmail.com", true), 
    ("12231dbe-29d3-4295-821e-3b9186fdc136", "test@gmail.com", false),
    ("a3c45e67-89ab-4def-0123-456789abcdef", "player3@gmail.com", false),
    ("a3c45e67-89ab-4def-0123-456789abcdeg", "player4@gmail.com", false);
insert into Weeks (weekId, weekNumber, startDate, active) values 
    ('21972fac-1dcc-47c5-b137-a80b54855df4', 1, '2024-01-01', false), 
    ('f023f7a2-350f-4154-881a-4d4b3c720b59', 2, '2024-01-08', false),
    ('f023f7a2-350f-4154-881a-4d4b3c720b50', 3, '2024-01-15', true);
insert into WeeklyScores (weeklyScoreId, playerId, weekId, weekNumber, points) values 
    ('68d756f8-03ad-417a-9f34-5e6096bcaab0', '0f605319-b206-41f2-9a5a-6c9fd2820387', '21972fac-1dcc-47c5-b137-a80b54855df4', 1, 10), 
    ('b81cc8fc-3ab3-433e-a5c6-f9da61d70509', '0f605319-b206-41f2-9a5a-6c9fd2820387', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 2, 15),
    ('01b26e4e-acda-4e5e-8615-eb768d50856b', '12231dbe-29d3-4295-821e-3b9186fdc136', '21972fac-1dcc-47c5-b137-a80b54855df4', 1, 20), 
    ('ffd0609f-21e3-4cf8-961c-e5c1058266c9', '12231dbe-29d3-4295-821e-3b9186fdc136', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 2, 25),
    ('a1b2c3d4-e5f6-7890-abcd-ef0123456789', 'a3c45e67-89ab-4def-0123-456789abcdef', '21972fac-1dcc-47c5-b137-a80b54855df4', 1, 15),
    ('b2c3d4e5-f678-90ab-cdef-0123456789ab', 'a3c45e67-89ab-4def-0123-456789abcdef', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 2, 18);
insert into GameScores (gameScoreId, playerId, weekId, gameNumber, points, active, previous) values
    ('gs-w1-u1-g1', '0f605319-b206-41f2-9a5a-6c9fd2820387', '21972fac-1dcc-47c5-b137-a80b54855df4', 1, 2, false, false),
    ('gs-w1-u1-g2', '0f605319-b206-41f2-9a5a-6c9fd2820387', '21972fac-1dcc-47c5-b137-a80b54855df4', 2, 3, false, false),
    ('gs-w1-u1-g3', '0f605319-b206-41f2-9a5a-6c9fd2820387', '21972fac-1dcc-47c5-b137-a80b54855df4', 3, 5, false, false),
    ('gs-w1-u1-g4', '0f605319-b206-41f2-9a5a-6c9fd2820387', '21972fac-1dcc-47c5-b137-a80b54855df4', 4, 0, false, false),
    ('gs-w1-u2-g1', '12231dbe-29d3-4295-821e-3b9186fdc136', '21972fac-1dcc-47c5-b137-a80b54855df4', 1, 5, false, false),
    ('gs-w1-u2-g2', '12231dbe-29d3-4295-821e-3b9186fdc136', '21972fac-1dcc-47c5-b137-a80b54855df4', 2, 6, false, false),
    ('gs-w1-u2-g3', '12231dbe-29d3-4295-821e-3b9186fdc136', '21972fac-1dcc-47c5-b137-a80b54855df4', 3, 4, false, false),
    ('gs-w1-u2-g4', '12231dbe-29d3-4295-821e-3b9186fdc136', '21972fac-1dcc-47c5-b137-a80b54855df4', 4, 5, false, false),
    ('gs-w1-u3-g1', 'a3c45e67-89ab-4def-0123-456789abcdef', '21972fac-1dcc-47c5-b137-a80b54855df4', 1, 4, false, false),
    ('gs-w1-u3-g2', 'a3c45e67-89ab-4def-0123-456789abcdef', '21972fac-1dcc-47c5-b137-a80b54855df4', 2, 3, false, false),
    ('gs-w1-u3-g3', 'a3c45e67-89ab-4def-0123-456789abcdef', '21972fac-1dcc-47c5-b137-a80b54855df4', 3, 5, false, false),
    ('gs-w1-u3-g4', 'a3c45e67-89ab-4def-0123-456789abcdef', '21972fac-1dcc-47c5-b137-a80b54855df4', 4, 3, false, false),
    ('gs-w2-u1-g1', '0f605319-b206-41f2-9a5a-6c9fd2820387', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 1, 4, false, true),
    ('gs-w2-u1-g2', '0f605319-b206-41f2-9a5a-6c9fd2820387', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 2, 5, false, true),
    ('gs-w2-u1-g3', '0f605319-b206-41f2-9a5a-6c9fd2820387', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 3, 3, false, true),
    ('gs-w2-u1-g4', '0f605319-b206-41f2-9a5a-6c9fd2820387', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 4, 3, false, true),
    ('gs-w2-u2-g1', '12231dbe-29d3-4295-821e-3b9186fdc136', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 1, 7, false, true),
    ('gs-w2-u2-g2', '12231dbe-29d3-4295-821e-3b9186fdc136', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 2, 6, false, true),
    ('gs-w2-u2-g3', '12231dbe-29d3-4295-821e-3b9186fdc136', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 3, 6, false, true),
    ('gs-w2-u2-g4', '12231dbe-29d3-4295-821e-3b9186fdc136', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 4, 6, false, true),
    ('gs-w2-u3-g1', 'a3c45e67-89ab-4def-0123-456789abcdef', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 1, 5, false, true),
    ('gs-w2-u3-g2', 'a3c45e67-89ab-4def-0123-456789abcdef', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 2, 4, false, true),
    ('gs-w2-u3-g3', 'a3c45e67-89ab-4def-0123-456789abcdef', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 3, 5, false, true),
    ('gs-w2-u3-g4', 'a3c45e67-89ab-4def-0123-456789abcdef', 'f023f7a2-350f-4154-881a-4d4b3c720b59', 4, 4, false, true),
    ('gs-w3-u1-g1', '0f605319-b206-41f2-9a5a-6c9fd2820387', 'f023f7a2-350f-4154-881a-4d4b3c720b50', 1, 4, true, false),
    ('gs-w3-u1-g2', '0f605319-b206-41f2-9a5a-6c9fd2820387', 'f023f7a2-350f-4154-881a-4d4b3c720b50', 2, 5, true, false),
    ('gs-w3-u1-g3', '0f605319-b206-41f2-9a5a-6c9fd2820387', 'f023f7a2-350f-4154-881a-4d4b3c720b50', 3, 3, true, false),
    ('gs-w3-u1-g4', '0f605319-b206-41f2-9a5a-6c9fd2820387', 'f023f7a2-350f-4154-881a-4d4b3c720b50', 4, 3, true, false),
    ('gs-w3-u2-g1', '12231dbe-29d3-4295-821e-3b9186fdc136', 'f023f7a2-350f-4154-881a-4d4b3c720b50', 1, 7, true, false),
    ('gs-w3-u2-g2', '12231dbe-29d3-4295-821e-3b9186fdc136', 'f023f7a2-350f-4154-881a-4d4b3c720b50', 2, 6, true, false),
    ('gs-w3-u2-g3', '12231dbe-29d3-4295-821e-3b9186fdc136', 'f023f7a2-350f-4154-881a-4d4b3c720b50', 3, 6, true, false),
    ('gs-w3-u2-g4', '12231dbe-29d3-4295-821e-3b9186fdc136', 'f023f7a2-350f-4154-881a-4d4b3c720b50', 4, 6, true, false),
    ('gs-w3-u3-g1', 'a3c45e67-89ab-4def-0123-456789abcdef', 'f023f7a2-350f-4154-881a-4d4b3c720b50', 1, 5, true, false),
    ('gs-w3-u3-g2', 'a3c45e67-89ab-4def-0123-456789abcdef', 'f023f7a2-350f-4154-881a-4d4b3c720b50', 2, 4, true, false),
    ('gs-w3-u3-g3', 'a3c45e67-89ab-4def-0123-456789abcdef', 'f023f7a2-350f-4154-881a-4d4b3c720b50', 3, 5, true, false),
    ('gs-w3-u3-g4', 'a3c45e67-89ab-4def-0123-456789abcdef', 'f023f7a2-350f-4154-881a-4d4b3c720b50', 4, 4, true, false);