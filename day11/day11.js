import { input } from './input.js'

const day11 = () => {
    const initialState = parseFied()
    const offsets = [[-1, -1], [0, -1], [1, -1], [-1, 0], [+1, 0], [-1, +1], [0, 1], [1, 1]]

    function parseFied() {
        const data = new Map()
        const rows = input.split('\n')
        const rowCount = rows.length;
        const colCount = rows[0].length;
        let occupied = 0

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i]
            for (let j = 0; j < row.length; j++) {
                const value = row[j]
                if (value === 'L' || value === '#') {
                    data.set(`${i}_${j}`, value)
                    if (value === '#')
                        occupied++;
                }
            }
        }
        return { rowCount, colCount, data, occupied }
    }

    const neigbours = (pos, data) => {
        const x = pos.x;
        const y = pos.y;

        return offsets.map(p => data.get(`${x + p[0]}_${y + p[1]}`))
    }

    const simulate = (state) => {
        const newState = new Map()
        let occupied = 0
        for (let i = 0; i < state.rowCount; i++) {
            for (let j = 0; j < state.colCount; j++) {
                const p = `${i}_${j}`
                const v = state.data.get(p)
                if (v === 'L') {
                    if (neigbours({ x: i, y: j }, state.data).some(v => v === '#'))
                        newState.set(p, v)
                    else {
                        newState.set(p, '#')
                        occupied++
                    }
                } else if (v === '#') {
                    const c = neigbours({ x: i, y: j }, state.data).reduce((acc, c) => acc + (c === '#' ? 1 : 0), 0)
                    if (c >= 4)
                        newState.set(p, 'L')
                    else {
                        newState.set(p, v)
                        occupied++
                    }
                }
            }
        }
        return {
            rowCount: state.rowCount,
            colCount: state.colCount,
            data: newState,
            occupied
        }
    }

    const task1 = () => {
        let currentState = initialState;
        for (let index = 0; ; index++) {
            const newState = simulate(currentState)
            if (newState.occupied === currentState.occupied) {
                return newState.occupied
            }
            currentState = newState
        }
    }

    const task2 = () => {
    }

    console.log(`Day 11:
    Task 1: ${task1()}
    Task 2: ${task2()} `)
}
console.time('Time:')
day11();
console.timeEnd('Time:')