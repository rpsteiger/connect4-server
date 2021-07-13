import { MyCryptoHelper } from '../models/CryptoHelper'
import { columns } from './connect4'

export const myConsts = {
    BOARD_WIDTH: 7,
    BOARD_HEIGHT: 6,
}

export const MyGameStateErrors = {
    INVALID_COLUMN: 'column y has to satisfy: 0 >= y < board width',
    IMPERMISSIBLE_MOVE: 'wait for your turn',
    COLUMN_IS_FULL: 'cannot put piece here, column is full!',
}

export type Color = 'X' | 'O'

export interface GameState {
    gameId: string
    board: string[][]
    nextMove: Color
    toJSON(): string
    fromJSON(json: string): GameState
    move(column: number, mover: Color): GameState
}

const createEmptyBoard: () => string[][] = () => {
    return Array<string>(myConsts.BOARD_HEIGHT)
        .fill('')
        .map(() => Array<string>(myConsts.BOARD_WIDTH).fill(''))
}

const getFirstMover: () => Color = () => 'O'

export class MyGameState implements GameState {
    gameId: string
    board: string[][]
    nextMove: Color

    constructor(obj?: GameState) {
        this.gameId = (obj && obj.gameId) || new MyCryptoHelper().randomHash()
        this.board = (obj && obj.board) || createEmptyBoard()
        this.nextMove = (obj && obj.nextMove) || getFirstMover()
    }

    move(column: number, mover: Color): GameState {
        if (column < 0 || column > myConsts.BOARD_WIDTH - 1) {
            throw new Error(MyGameStateErrors.INVALID_COLUMN)
        }
        if (this.nextMove !== mover) {
            throw new Error(MyGameStateErrors.IMPERMISSIBLE_MOVE)
        }
        const clickedColumn = columns(this.board)[column]
        const lastPieceInColumn = clickedColumn.findIndex(x => x !== '')
        const colPosition = lastPieceInColumn === -1 ? 5 : lastPieceInColumn - 1

        if (colPosition < 0) {
            throw new Error(MyGameStateErrors.COLUMN_IS_FULL)
        }

        const newState = this.clone()
        newState.board[colPosition][column] = this.nextMove
        newState.toggleMover()
        return newState
    }
    clone() {
        return new MyGameState({
            gameId: this.gameId,
            board: [...this.board],
            nextMove: this.nextMove,
        } as GameState)
    }
    toggleMover() {
        this.nextMove = this.nextMove === 'O' ? 'X' : 'O'
    }
    toJSON(): string {
        return JSON.stringify({ ...this })
    }
    fromJSON(json: string): GameState {
        const gs: GameState = JSON.parse(json)
        return new MyGameState(gs)
    }
}
