import { MyCryptoHelper } from '../models/CryptoHelper'

export const myConsts = {
    BOARD_WIDTH: 7,
    BOARD_HEIGHT: 6,
}

export type Color = 'X' | 'O'

export interface GameState {
    gameId: string
    board: string[][]
    nextMove: Color
    toJSON(): string
    fromJSON(json: string): GameState
}

const createEmptyBoard: () => string[][] = () => {
    const row: string[] = []
    row.fill('0', 0, myConsts.BOARD_WIDTH)
    const matrix: string[][] = []
    matrix.fill([...row], 0, myConsts.BOARD_HEIGHT)
    return matrix
}

const getFirstMover: () => Color = () => 'O'

export class MyGameState implements GameState {
    gameId: string
    board: string[][]
    nextMove: Color

    constructor() {
        this.gameId = new MyCryptoHelper().randomHash()
        this.board = createEmptyBoard()
        this.nextMove = getFirstMover()
    }

    toJSON(): string {
        return JSON.stringify({ ...this })
    }
    fromJSON(json: string): GameState {
        const gs: GameState = JSON.parse(json)
        return gs
    }
}
