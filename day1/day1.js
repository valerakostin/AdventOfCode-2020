import { input } from './input'

const SUM = 2020;

const day1 = () => {
    const numbers = input.split('\n').map(el => +el);

    const searchFor = (number) => {
        for (let current of numbers) {
            const lookup = number - current
            if (lookup !== current && numbers.includes(lookup)) {
                return [lookup, current]
            }
        }
    }
    const task1 = () => {
        const result = searchFor(SUM)
        return result.reduce((acc, c) => acc * c, 1)
    }

    const task2 = () => {
        for (let current of numbers) {
            const lookup = SUM - current
            const tuple = searchFor(lookup)
            if (tuple) {
                const candidates = [current, ...tuple]

                const currentSum = candidates.reduce((acc, c) => acc + c, 0)
                if (currentSum === SUM)
                    return candidates.reduce((acc, c) => acc * c, 1)
            }
        }
    }

    // const task1a = () => {
    //     for (let i = 0; i < numbers.length; i++) {
    //         for (let j = 0; j < numbers.length; j++) {
    //             if (i !== j && numbers[i] + numbers[j] === SUM)
    //                 return numbers[i] * numbers[j]
    //         }
    //     }
    // }

    // const task2 = () => {
    //     for (let i = 0; i < numbers.length; i++) {
    //         for (let j = 0; j < numbers.length; j++) {
    //             if (i !== j && numbers[i] + numbers[j] < SUM) {
    //                 for (let k = 0; k < numbers.length; k++) {
    //                     if (i !== k && j != k && numbers[i] + numbers[j] + numbers[k] === SUM) {
    //                         return numbers[i] * numbers[j] * numbers[k]
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    console.log(`Day1: Report Repair
Task 1: ${task1()}
Task 2: ${task2()} 
`)
}

day1();







