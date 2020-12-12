import { input } from './input.js'

const day12 = () => {
    const actions = input.split('\n').map(line => {
        return { action: line.substring(0, 1), steps: +line.substring(1) }
    })

    const NORTH = 'N'
    const SOUTH = 'S'
    const WEST = 'W'
    const EAST = 'E'
    const FORWARD = 'F'
    const LEFT = 'L'
    const RIGHT = 'R'

    const task1 = () => {
        let shipX = 0;
        let shipY = 0;
        let direction = EAST

        let rightRotation = [NORTH, EAST, SOUTH, WEST]
        let leftRotation = [NORTH, WEST, SOUTH, EAST]

        for (let a of actions) {
            let { action, steps } = a
            if (FORWARD === action)
                action = direction
            if (NORTH === action || SOUTH === action) {
                shipY = shipY + (NORTH === action ? steps : -steps)
            } else if (EAST === action || WEST === action) {
                shipX = shipX + (EAST === action ? steps : -steps)
            }
            else if (LEFT === action || RIGHT === action) {
                const offset = steps / 90
                const rotations = (RIGHT === action) ? rightRotation : leftRotation
                let index = rotations.indexOf(direction)
                index = (index + offset) % 4
                direction = rotations[index]
            }
        }
        return Math.abs(shipX) + Math.abs(shipY)
    }


    const task2 = () => {
        let waypointX = 10
        let waypointY = 1

        let shipX = 0
        let shipY = 0

        for (let a of actions) {
            let { action, steps } = a

            if (FORWARD === action) {
                shipX += waypointX * steps
                shipY += waypointY * steps
            }
            if (NORTH === action || SOUTH === action) {
                waypointY = waypointY + (NORTH === action ? steps : -steps)
            }
            else if (EAST === action || WEST === action) {
                waypointX = waypointX + (EAST === action ? steps : -steps)
            }
            else if (LEFT === action || RIGHT === action) {
               
                // rotate coordinate system counter-clockwise
                const angle = RIGHT === action ? -steps : steps
               
                const rad = angle * Math.PI / 180
                const nWaypointX = (waypointX * Math.cos(rad) - waypointY * Math.sin(rad));
                const nWaypointY = (waypointX * Math.sin(rad) + waypointY * Math.cos(rad));
                waypointX = nWaypointX;
                waypointY = nWaypointY;
            }
        }
        return Math.abs(shipX) + Math.abs(shipY)
    }

    console.log(`Day 12: Rain Risk
Task 1: ${task1()}
Task 2: ${task2()} `)
}
console.time("Time:")
day12();
console.timeEnd("Time:")