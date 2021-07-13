import { expect } from 'chai'
import { GameState, MyGameState, MyGameStateErrors, myConsts } from '../models/GameState'

const getClassUnderTest: () => GameState = () => {
    return new MyGameState()
}

describe('MyGameState class', () => {
    describe('constructor', () => {
        it('should not throw', () => {
            expect(() => {
                getClassUnderTest()
            }).to.not.throw()
        })
    })
    describe('toJSON()', () => {
        it('should work with correct params', () => {
            const gs = getClassUnderTest()
            const json = gs.toJSON()
            expect(json).to.be.string
            expect(json.length).to.be.greaterThan(0)
        })
    })
    describe('fromJSON()', () => {
        it('should work with correct params', () => {
            const json: string =
                '{"gameId":"5d3002867b75176da9c0a9e0c918847bd9389f9e0b21c82dac6db80d7b619d79","board":[],"nextMove":"O"}'
            expect(() => {
                getClassUnderTest().fromJSON(json)
            }).to.not.throw()
        })
    })
    describe('move()', () => {
        it("should throw an error on move(-1, 'X', ...)", () => {
            expect(() => {
                const gs = getClassUnderTest()
                const gs2 = gs.move(-1, 'O')
            }).to.throw(MyGameStateErrors.INVALID_COLUMN)
        })
        it('should not allow the wrong player to move', () => {
            const gs = getClassUnderTest()
            const impermissibleMover = gs.nextMove === 'O' ? 'X' : 'O'
            expect(() => {
                gs.move(2, impermissibleMover)
            }).to.throw(MyGameStateErrors.IMPERMISSIBLE_MOVE)
        })
        it('should work with correct params', () => {
            const gs = getClassUnderTest()
            const mover = gs.nextMove
            const gs2 = gs.move(2, mover)
            expect(gs2.nextMove).not.to.eql(mover)
            const moveCell = gs2.board[myConsts.BOARD_HEIGHT - 1][2]
            expect(moveCell).to.not.eql('')
            expect(moveCell).to.eql(mover)
        })
        it('should throw  an error if collumn is full', () => {
            // prettier-ignore
            const board = 
               [['', '', 'X', '','', '', ''],
                ['', '', 'O', '', '', '', ''],
                ['', '', 'X', '', '', '', ''],
                ['', '', 'O', '','', '', ''],
                ['', '', 'X', '','', '', ''],
                ['', '', 'O', '','', '', '']
              ]
            const gs = getClassUnderTest()
            gs.board = board
            gs.nextMove = 'O'
            expect(() => {
                gs.move(2, 'O')
            }).to.throw(MyGameStateErrors.COLUMN_IS_FULL)
        })
    })
})
