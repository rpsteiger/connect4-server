PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS game;

CREATE TABLE game (
    gameID    STRING  PRIMARY KEY
                      NOT NULL,
    gameState VARCHAR NOT NULL
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
