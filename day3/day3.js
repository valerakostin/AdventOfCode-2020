import { input } from './input.js'

const day3 = () => {
    const data = input.split('\n')
    const TREE = '#'

    const task1 = () => {
        return countTrees(3, 1);
    }

    const task2 = () => {
        return [
            { right: 1, down: 1 },
            { right: 3, down: 1 },
            { right: 5, down: 1 },
            { right: 7, down: 1 },
            { right: 1, down: 2 },
        ].map(move => countTrees(move.right, move.down))
            .reduce((acc, c) => acc * c, 1)
    }

    function countTrees(right, down) {
        let column = 0;
        const size = data[0].length;
        let tree = 0;
        for (let row = down; row < data.length; row = row + down) {
            column = (column + right) % size;
            const index = column
            const c = data[row][index];
            if (c === TREE)
                tree++;
        }
        return tree;
    }

    console.log(`Day 3: Toboggan Trajectory
Task 1: ${task1()}
Task 2: ${task2()} `)
}
day3();


