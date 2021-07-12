PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS game;

CREATE TABLE game (
    gameID    STRING  PRIMARY KEY
                      NOT NULL,
    gameState STRING NOT NULL,
    nextMove STRING NOT NULL
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
