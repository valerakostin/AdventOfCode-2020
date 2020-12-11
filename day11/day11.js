
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

    const neigbours = (pos, state) => {
        const x = pos.x;
        const y = pos.y;
        const data = state.data

        return offsets.map(p => data.get(`${x + p[0]}_${y + p[1]}`))
    }


    const neigbours2 = (pos, state) => {
        const data = state.data;
        const rowCount = state.rowCount;
        const colCount = state.colCount;
        const x = pos.x;
        const y = pos.y;

        //[[-1, -1], [0, -1], [-1, 0],  [+1, 0],[0, 1], [1, 1] //[1, -1], [-1, +1] ]

        let v1;
        for (let i = 1; ; i++) {
            let xx = -i + x
            let yy = -i + y
            if ((xx < 0) || (yy < 0))
                break;
            v1 = data.get(`${xx}_${yy}`)
            if (v1 === 'L' || v1 === '#')
                break;
        }

        let v6;
        for (let i = 1; ; i++) {
            let xx = i + x
            let yy = i + y

            if ((xx >= colCount) || (yy >= colCount))
                break;
            v6 = data.get(`${xx}_${yy}`)
            if (v6 === 'L' || v6 === '#')
                break;
        }

        let v7;
        for (let i = 1; ; i++) {
            let xx = -i + x
            let yy = i + y
            if (xx < 0 || (yy >= colCount))
                break;
            v7 = data.get(`${xx}_${yy}`)
            if (v7 === 'L' || v7 === '#')
                break;
        }

        let v8;
        for (let i = 1; ; i++) {
            let xx = i + x
            let yy = -i + y
            if (yy < 0 || (xx >= rowCount))
                break;
            v8 = data.get(`${xx}_${yy}`)
            if (v8 === 'L' || v8 === '#')
                break;
        }

        let v2;
        for (let i = 1; ; i++) {
            let xx = x
            let yy = -i + y
            if ((yy < 0))
                break;
            v2 = data.get(`${xx}_${yy}`)
            if (v2 === 'L' || v2 === '#')
                break;
        }

        let v4;

        for (let i = 1; ; i++) {
            let xx = i + x
            let yy = y

            if (xx >= rowCount)
                break;
            v4 = data.get(`${xx}_${yy}`)

            if (v4 === 'L' || v4 === '#')
                break;
        }

        let v5;
        for (let i = 1; ; i++) {
            let xx = x
            let yy = i + y

            if (yy >= colCount)
                break;
            v5 = data.get(`${xx}_${yy}`)
            if (v5 === 'L' || v5 === '#')
                break;
        }

        let v3;
        for (let i = 1; ; i++) {
            let xx = -i + x
            let yy = y
            if ((xx < 0) || (yy < 0))
                break;
            v3 = data.get(`${xx}_${yy}`)
            if (v3 === 'L' || v3 === '#')
                break;
        }

        return [v1, v2, v3, v4, v5, v6, v7, v8]
    }
    const simultateHelper = (neigbourFunc, state, limit) => {
        const newState = new Map()
        let occupied = 0
        for (let i = 0; i < state.rowCount; i++) {
            for (let j = 0; j < state.colCount; j++) {
                const p = `${i}_${j}`
                const v = state.data.get(p)
                if (v === 'L') {
                    if (neigbourFunc({ x: i, y: j }, state).some(v => v === '#')) {
                        newState.set(p, v)
                    }
                    else {
                        newState.set(p, '#')
                        occupied++
                    }
                } else if (v === '#') {
                    const c = neigbourFunc({ x: i, y: j }, state).reduce((acc, c) => acc + (c === '#' ? 1 : 0), 0)
                    if (c >= limit)
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

    const simulate = (state) => {
        return simultateHelper(neigbours, state, 4)
    }


    const simulate2 = (state) => {
        return simultateHelper(neigbours2, state, 5)
    }

    const computeSeatEquilibrium = (simultateFunction) => {
        let currentState = initialState;
        for (let index = 0; ; index++) {
            const newState = simultateFunction(currentState)
            if (newState.occupied === currentState.occupied) {
                return newState.occupied
            }
            currentState = newState
        }
    }

    const task1 = () => {
        return computeSeatEquilibrium(simulate)
    }

    const task2 = () => {
        return computeSeatEquilibrium(simulate2)
    }

    console.log(`Day 11: Seating System
    Task 1: ${task1()}
    Task 2: ${task2()} `)
}
console.time('Time:')
day11();
console.timeEnd('Time:')