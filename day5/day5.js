import { input } from './input.js'

const day5 = () => {
    const lines = input.split('\n')

    const computePosition = (line, zeroSymbol) => {
        const len = line.length - 1
        return [...line]
            .map((x, index) => x === zeroSymbol ? 0 : Math.pow(2, len - index))
            .reduce((acc, c) => acc = acc + c, 0);
    }
    const computeSeat = (line) => {
        const row = computePosition(line.substring(0, 7), 'F')
        const column = computePosition(line.substring(7), 'L')
        return row * 8 + column
    }
    const computeSeats = () => {
        return lines.map(line => computeSeat(line))
    }
    const task1 = () => {
        const seats = computeSeats()
        return Math.max(...seats)
    }

    const task2 = () => {
        const seats = new Set(computeSeats())
        const max = task1();
        for (let seat = 0; seat < max; seat++) {
            if (!seats.has(seat) && seats.has(seat - 1) && seats.has(seat + 1))
                return seat
        }
    }

    console.log(`Day 5: Binary Boarding
Task 1: ${task1()}
Task 2: ${task2()} `)
}
day5();






