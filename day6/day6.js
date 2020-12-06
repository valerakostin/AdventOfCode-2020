import { input } from './input.js'
import { collectNewLineSeparatedEntries as collectNewLineSeparatedEntries } from '../utils/utils'

const day6 = () => {
    const entries = collectNewLineSeparatedEntries(input)

    function groupHistogram(answers) {
        const map = new Map()
        for (let answer of answers) {
            const letters = [...answer]
            for (let letter of letters) {
                const value = map.get(letter)
                const newValue = value ? value + 1 : 1
                map.set(letter, newValue)
            }
        }
        return map
    }

    const task1 = () => {
        return entries
            .map(line => new Set(line.split(' ').join('')).size)
            .reduce((acc, c) => acc + c, 0)
    }

    const task2 = () => {
        return entries.map(line => {
            const answers = line.trim().split(' ')
            const histogram = groupHistogram(answers)
            return [...histogram.values()].filter(v => v === answers.length)
                .length
        }
        ).reduce((acc, c) => acc + c, 0)
    }

    console.log(`Day 6: 
Task 1: ${task1()}
Task 2: ${task2()} `)
}
day6();


