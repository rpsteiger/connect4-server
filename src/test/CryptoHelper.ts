import { expect } from 'chai'
import { MyCryptoHelper, CryptoHelper } from '../models/CryptoHelper'

const getInstance: () => CryptoHelper = () => {
    return new MyCryptoHelper()
}

describe('CryptoHelper', () => {
    describe('randomhash()', () => {
        it('should not return the same when called twice', () => {
            const ch = getInstance()
            const result1 = ch.randomHash()
            const result2 = ch.randomHash()
            expect(result1).not.to.equal(result2)
        })
    })
})
