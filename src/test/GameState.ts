import { expect } from 'chai'
import { GameState, MyGameState } from '../models/GameState'

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
        const gs = getClassUnderTest()
        const json = gs.toJSON()
        console.log(json)
        expect(json).to.be.string
        expect(json.length).to.be.greaterThan(0)
    })
})
