import { expect } from 'chai'
import { MyGameDB, GameDB, DB_FILE_NAME } from '../models/db/GameDB'
import { rangez } from '../functionalJS/functionalJS'
import { myConsts } from '../models/GameState'
import { MyCryptoHelper } from '../models/CryptoHelper'
import path from 'path'
import rootDir from '../util/util'
import fs from 'fs/promises'
import exp from 'constants'
import { fail } from 'assert/strict'

const getClassUnderTest: () => GameDB = () => {
    return MyGameDB.getInstance()
}

const getEmptyGameState: () => string[][] = () => {
    const row: string[] = []
    row.fill('0', 0, myConsts.BOARD_WIDTH)
    const matrix: string[][] = []
    matrix.fill([...row], 0, myConsts.BOARD_HEIGHT)
    return matrix
}

const getRandomGameId = () => {
    return new MyCryptoHelper().randomHash()
}

const deleteDBFile = () => {
    const dbFilePath = path.join(rootDir, 'data', DB_FILE_NAME)
    return fs.unlink(dbFilePath)
}

it('true should equal to true', () => {
    expect(true).to.be.true
})

describe('GameDB', () => {
    describe('init()', () => {
        // it('should create an empty database if no file exists at the target path', done => {
        //     deleteDBFile()
        //         .then(v => {})
        //         .finally(() => {
        //             const db = getClassUnderTest()
        //             db.init().then(value => {
        //                 try {
        //                     expect(value).to.be.true
        //                     done()
        //                 } catch (e) {
        //                     done(e)
        //                 }
        //             })
        //         })
        // })
        it('should return true if a valid file already exists', done => {
            const db = getClassUnderTest()
            Promise.all([db.init(), db.init()]).then(([value1, value2]) => {
                try {
                    expect(value1).to.be.true
                    expect(value2).to.be.true
                    done()
                } catch (e) {
                    done(e)
                }
            })
        })
    })
    describe('save()', () => {
        it('should not throw with correct params', done => {
            const db = getClassUnderTest()
            db.init().then(() => {
                const newState = { gameId: getRandomGameId(), gameState: getEmptyGameState() }
                db.save(newState).then(value => {
                    expect(value).to.be.true
                    done()
                })
            })
        })
    })
    describe('load()', () => {
        it('should not throw with correct params', done => {
            const db = getClassUnderTest()
            db.init().then(() => {
                const newState = { gameId: getRandomGameId(), gameState: getEmptyGameState() }
                db.save(newState).then(() => {
                    db.load(newState.gameId).then(state => {
                        expect(state!.gameId).to.eql(newState.gameId)
                        expect(state!.gameState).to.eql(newState.gameState)
                        done()
                    })
                })
            })
        })
        it('should return undefined for a gameId that does not exist', done => {
            const db = getClassUnderTest()
            db.init().then(() => {
                db.load('In Flames | I Am Above').then(state => {
                    expect(state).to.be.undefined
                    done()
                })
            })
        })
    })
})
