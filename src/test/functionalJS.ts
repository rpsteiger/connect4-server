import { range, rangez, car, cdr, take, myErrors } from '../functionalJS/functionalJS'
import { expect } from 'chai'

describe('functionalJS functions', () => {
    describe('range()', () => {
        it('should return empty arry on 0,0', () => {
            expect(range(0, 0)).to.eql([])
        })
        it('should return an empty array on n,n', () => {
            expect(range(42, 42)).to.eql([])
        })
        it('should return an empty array when start>stop', () => {
            expect(range(0, -5)).to.eql([])
        })
        it('should work on 0..5', () => {
            expect(range(0, 5)).to.eql([0, 1, 2, 3, 4])
        })
        it('should work on negative values when start<0&&stop<0', () => {
            expect(range(-6, -2)).to.eql([-6, -5, -4, -3])
        })
    })

    describe('rangez()', () => {
        it('should work on 5', () => {
            expect(rangez(5)).to.eql([0, 1, 2, 3, 4])
        })
    })

    describe('car()', () => {
        it('should return X from car([X,O])', () => {
            expect(car(['X', '0'])).to.eql('X')
        })
        it('should return X from car([X])', () => {
            expect(car(['X'])).to.equal('X')
        })
        it('should throw wen challed on an empty list', () => {
            expect(() => {
                car([])
            }).to.throw(myErrors.CAR_EMPTY_LIST)
        })
    })

    describe('cdr()', () => {
        it('it return [X,X] from [O,X,X]', () => {
            expect(cdr(['O', 'X', 'X'])).to.eql(['X', 'X'])
        })
        it('should throw wen challed on an empty list', () => {
            expect(() => {
                cdr([])
            }).to.throw(myErrors.CDR_EMPTY_LIST)
        })
    })

    describe('take()', () => {
        it('should return [X,X,X] from take(3,[X,X,X,O,O])', () => {
            expect(take(3, ['X', 'X', 'X', 'O', 'O'])).to.eql(['X', 'X', 'X'])
        })
        it('should throw on take(-1, ...)', () => {
            expect(() => {
                take(-1, [1, 2, 3, 4])
            }).to.throw(myErrors.TAKE_INVALID_N)
        })
        it('should return an empty array on take(0,...)', () => {
            expect(take(0, [1.2, 3])).to.eql([])
        })
        it('should return all elements on take(n,...) when n>= [].length', () => {
            const lst = [1, 2, 3, 4, 5]
            expect(take(7, lst)).to.eql(lst)
        })
    })
})
