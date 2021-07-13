import { GameState, MyGameState, MyGameStateErrors } from '../GameState'
import { Database, sqlite3 } from 'sqlite3'
import rootDir from '../../util/util'
import path from 'path'

export interface GameDB {
    init(): Promise<boolean>
    save(newState: GameState): Promise<boolean>
    load(gameId: string): Promise<GameState | undefined>
}

export const DB_FILE_NAME = 'games.sdb'

export const myErrors = {
    INVALID_GAME_ID: 'gameId has to be 64 characters long and consist only of hex chars',
}

type GameDBRow = { gameID: string; gameState: string }

export class MyGameDB implements GameDB {
    static instance: MyGameDB
    private database: Database | undefined

    private constructor() {}

    init(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const dbFilePath = path.join(rootDir, 'data', DB_FILE_NAME)
            this.database = new Database(dbFilePath, err => {
                if (err) {
                    throw new Error(`Error while creating database: ${err.message}`)
                    reject(err?.message)
                }
                this.gameTableExists().then(tableExists => {
                    if (!tableExists) {
                        this.createGameTable().then(tableCreated => {
                            resolve(tableCreated)
                        })
                    } else {
                        resolve(true)
                    }
                })
            })
        })
    }
    gameTableExists() {
        return new Promise<boolean>((resolve, reject) => {
            const sql =
                "SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'game' ORDER BY name;"
            this.database?.get(sql, (err, row) => {
                if (err) reject(err)
                if (row) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }
    createGameTable() {
        return new Promise<boolean>((resolve, reject) => {
            this.database?.serialize(() => {
                this.database?.run('PRAGMA foreign_keys = off;')
                this.database?.run('BEGIN TRANSACTION;')
                this.database?.run(
                    'CREATE TABLE game (gameID  STRING  PRIMARY KEY NOT NULL, gameState VARCHAR NOT NULL);'
                )
                this.database?.run('COMMIT TRANSACTION;')
                this.database?.run('PRAGMA foreign_keys = on;')
                resolve(true)
            })
        })
    }
    stateExists(gameId: string) {
        const db = this.database!
        return new Promise<boolean>((resolve, reject) => {
            const sql = 'SELECT * FROM game WHERE gameID LIKE ?'
            db.get(sql, [gameId], (err, row) => {
                if (err) reject(err)
                if (row) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }
    insertState(state: GameState) {
        const db = this.database!
        return new Promise<boolean>((resolve, reject) => {
            const sql = 'INSERT INTO game(gameID, gameState) VALUES(?,?)'
            db.run(sql, [state.gameId, state.toJSON()], err => {
                if (err) reject(err)
                resolve(true)
            })
        })
    }
    save(newState: GameState): Promise<boolean> {
        const db = this.database!
        return new Promise<boolean>((resolve, reject) => {
            this.stateExists(newState.gameId).then(stateExists => {
                if (!stateExists) {
                    this.insertState(newState).then(success => {
                        resolve(success)
                    })
                } else {
                    const sql = 'UPDATE game SET gameState = ? WHERE gameID = ?'
                    db.run(sql, [newState.toJSON(), newState.gameId], err => {
                        if (err) reject(err)
                        resolve(true)
                    })
                }
            })
        })
    }
    load(gameId: string): Promise<GameState | undefined> {
        return new Promise<GameState | undefined>((resolve, reject) => {
            const db = this.database!
            const sql = 'SELECT * FROM game WHERE gameID LIKE ?'
            db.get(sql, [gameId], (err, row) => {
                if (err) reject(err)
                if (row) {
                    const typedRow = row as GameDBRow
                    const gameState = new MyGameState().fromJSON(typedRow.gameState)
                    resolve(gameState)
                } else {
                    resolve(undefined)
                }
            })
        })
    }
    static getInstance() {
        return new Promise<GameDB>((resolve, reject) => {
            if (!MyGameDB.instance) {
                MyGameDB.instance = new MyGameDB()
                MyGameDB.instance.init().then(success => {
                    if (!success) {
                        throw new Error('error while initializing database')
                    }
                    resolve(MyGameDB.instance)
                })
            } else {
                resolve(MyGameDB.instance)
            }
        })
    }
}
