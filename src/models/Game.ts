import { GameState, Color } from './GameState'

export interface Game {
    move(column: number, mover: Color, gameState: GameState): GameState
}
