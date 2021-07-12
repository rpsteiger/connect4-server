import { GameState } from '../GameState'

export interface GameDB {
    init(): Promise<boolean>
    save(gameId: string, newState: GameState): Promise<boolean>
    load(gameId: string): Promise<GameState>
}

export const DB_FILE_NAME = 'games.sdb'

export class MyGameDB implements GameDB {
    static instance: GameDB

    private constructor() {}

    init(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(false)
        })
    }
    save(gameId: string, newState: GameState): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    load(gameId: string): Promise<GameState> {
        throw new Error('Method not implemented.')
    }

    static getInstance() {
        if (!MyGameDB.instance) {
            MyGameDB.instance = new MyGameDB()
        }
        return MyGameDB.instance
    }
}
