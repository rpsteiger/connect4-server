import * as fJS from '../functionalJS/functionalJS'
import { Color } from '../models/GameState'

export const printBoard = (board: string[][]) => {
    const t1 = board.map(row => {
        return row.reduce((x, acc) => `${x},${acc}`)
    })
    console.log(t1)
}

export const columns = (board: string[][]) => board[0].map((_, i) => board.map(row => row[i]))

export const shift2D = (board: string[][], fill: Color, toLeft: boolean) => {
    const len = board.length
    return board.map((row, i) => {
        const dir = toLeft ? [len - i - 1, i] : [i, len - i - 1]
        return [...fJS.ntimes(fill, fJS.car(dir)), ...row, ...fJS.ntimes(fill, fJS.cdr(dir)[0])]
    })
}

// const partialSubSeq = (fill) => fJS.partial(fJS.hasSubSeq, 4, fill)

// export const checkIfWinningState = (board, color) => (
// 	board.some(partialSubSeq(color))
// 	|| columns(board).some(partialSubSeq(color))
// 	|| columns(shift2D(board, 0)).some(partialSubSeq(color))
// 	|| columns(shift2D(board, 0, true)).some(partialSubSeq(color))
// )
