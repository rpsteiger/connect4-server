import { expect } from 'chai'
import { MyGameDB, GameDB, DB_FILE_NAME } from '../models/db/GameDB'
import path from 'path'
import rootDir from '../util/util'
import fs from 'fs/promises'
import exp from 'constants'

const getClassUnderTest: () => GameDB = () => {
    return MyGameDB.getInstance()
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
        it('should create an empty database if no file exists at the target path', done => {
            deleteDBFile()
                .then(v => {})
                .finally(() => {
                    const db = getClassUnderTest()
                    db.init().then(value => {
                        try {
                            expect(value).to.be.true
                            done()
                        } catch (e) {
                            done(e)
                        }
                    })
                })
        })
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
})
