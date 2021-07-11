--
-- File generated with SQLiteStudio v3.3.3 on Sun Jul 11 14:30:51 2021
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: game
DROP TABLE IF EXISTS game;

CREATE TABLE game (
    gameID    STRING  PRIMARY KEY
                      NOT NULL,
    gameState VARCHAR NOT NULL
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
