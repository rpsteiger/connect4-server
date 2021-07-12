import { type } from 'os'

const partial = function (fn: Function, ...partialArgs: any[]) {
    let args = partialArgs
    const f2: (...args: any[]) => any = (...fullArguments: any[]) => fn(...[...partialArgs, ...fullArguments])
    return f2
}

const car: (lst: any[]) => any = ([car, _]) => {
    if (typeof car === 'undefined') {
        throw new Error(myErrors.CAR_EMPTY_LIST)
    }
    return car
}

const cdr: (lst: any[]) => any[] = ([car, ...cdr]) => {
    if (typeof car === 'undefined') {
        throw new Error(myErrors.CDR_EMPTY_LIST)
    }
    return cdr
}

const take: (n: number, lst: any[]) => any[] = (n, [car, ...cdr]) => {
    if (n < 0) throw new Error(myErrors.TAKE_INVALID_N)
    return n === 0 || typeof car === 'undefined' ? [] : [car, ...take(n - 1, cdr)]
}

const range = (start: number, stop: number): number[] =>
    start >= stop ? [] : start === stop - 1 ? [stop - 1] : [start, ...range(start + 1, stop)]

const rangez = partial(range, 0) as (stop: number) => number[]

const myErrors = {
    CAR_EMPTY_LIST: 'car is not defined on an empty array',
    CDR_EMPTY_LIST: 'cdr is not defined on an empty array',
    TAKE_INVALID_N: 'n has to be a positive number',
}

export { range, rangez, car, cdr, take, myErrors }
