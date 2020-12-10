import { input } from './input.js'

const day10 = () => {

    const adapters = parseAdapters()

    function parseAdapters() {
        const numbers = input.split('\n')
            .map(item => +item)
        numbers.push(0)
        const sorted = numbers.sort((a, b) => a - b)
        sorted.push(sorted[sorted.length - 1] + 3)
        return sorted
    }

    const task1 = () => {
        const diffs = [0, 0, 0];
        let current = 0

        for (let i = 0; i < adapters.length; i++) {
            const index = adapters[i] - current
            diffs[index - 1]++
            current = adapters[i]
        }
        return diffs[0] * diffs[2]
    }

    const computeNumOfPathsInCluster = (adapterSize) => {
        let pathsInCluster = 1
        if (adapterSize === 3)
            pathsInCluster = 2;
        else if (adapterSize === 4)
            pathsInCluster = 4
        else if (adapterSize === 5)
            pathsInCluster = 7
        return pathsInCluster
    }

    const computeClusters = () => {
        const array = []
        let prevIndex = 0
        for (let i = 1; i < adapters.length; i++) {
            if (adapters[i] - adapters[i - 1] === 3) {
                const subArray = adapters.slice(prevIndex, i)
                prevIndex = i
                const pathCount = computeNumOfPathsInCluster(subArray.length)
                array.push(pathCount)
            }
        }
        const subArray = adapters.slice(prevIndex, adapters.length)
        const pathCount = computeNumOfPathsInCluster(subArray.length)
        array.push(pathCount)
        return array
    }

    const task2 = () => {
        return computeClusters().reduce((a, b) => a * b, 1)
    }
    
console.time('Time:')
    console.log(`Day 10: Adapter Array
Task 1: ${task1()}
Task 2: ${task2()} `)
console.timeEnd('Time:')
}
day10();


