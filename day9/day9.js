import { input } from './input.js'

const day9 = () => {
    const SLICE = 25;

    const numbers = input.split('\n')
        .map(l => +l)

    const isSequenceValid = (element, workset) => {
        // const set = new Set(workset)
        // for (let el of set) {
        //     if (set.has(element - el))
        //         return true
        // }
        // return false;

        for (let i = 0; i < workset.length; i++) {
            for (let j = 0; j < workset.length; j++) {
                if (i != j && workset[i] + workset[j] === element)
                    return true;
            }
        }
        return false;
    }

    const task1 = () => {
        for (let i = 0; i < numbers.length - SLICE - 1; i++) {
            const workset = numbers.slice(i, i + SLICE)
            const element = numbers[i + SLICE]
            if (!isSequenceValid(element, workset)) {
                return element
            }
        }
    }
    const searchForSet = (start, number) => {
        let sum = 0
        let min = Number.MAX_SAFE_INTEGER
        let max = Number.MIN_SAFE_INTEGER
        for (let i = start; i < numbers.length; i++) {
            const n = numbers[i]
            min = Math.min(min, n)
            max = Math.max(max, n)
            sum += n;
            if (sum === number)
                return [min, max]
            else if (sum > number)
                return []
        }
        return [];
    }

    const task2 = () => {
        const number = task1()
        for (let i = 0; i < numbers.length; i++) {
            const minMax = searchForSet(i, number)
            if (minMax.length == 2) {
                return minMax[0] + minMax[1]
            }
        }
    }

    console.time('Time')
    console.log(`Day 9: Encoding Error
Task 1: ${task1()}
Task 2: ${task2()} `)
    console.timeEnd('Time')
}
day9();