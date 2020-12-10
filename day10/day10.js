import { input } from './input.js'

const day10 = () => {

    const adapters = input.split('\n')
        .map(item => +item)
    const task1 = () => {
        const numbers = adapters.sort((a, b) => a - b)
        numbers.push(numbers[numbers.length - 1] + 3)

        const diffs = [0, 0, 0];
        let current = 0

        for (let i = 0; i < numbers.length; i++) {
            const index = numbers[i] - current
            diffs[index - 1]++
            current = numbers[i]
        }
        return diffs[0] * diffs[2]
    }

    const task2 = () => {
    }

    console.log(`Day 10: Adapter Array
Task 1: ${task1()}
Task 2: ${task2()} `)
}
day10();